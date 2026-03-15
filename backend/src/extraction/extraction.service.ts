import { Injectable, BadRequestException, Logger } from '@nestjs/common';
import * as crypto from 'crypto';

export interface ExtractedProduct {
  title: string;
  description: string;
  price: number | null;
  originalPrice: number | null;
  currency: string;
  rating: number | null;
  reviewCount: number | null;
  images: string[];
  affiliateLink: string;
  platform: string;
  specifications: Record<string, string>;
}

@Injectable()
export class ExtractionService {
  private readonly logger = new Logger(ExtractionService.name);

  detectPlatform(url: string): string {
    const hostname = new URL(url).hostname.toLowerCase();
    if (hostname.includes('amazon')) return 'amazon';
    if (hostname.includes('ebay')) return 'ebay';
    throw new BadRequestException(`Unsupported platform: ${hostname}`);
  }

  extractAmazonAsin(url: string): string | null {
    const patterns = [
      /\/dp\/([A-Z0-9]{10})/,
      /\/gp\/product\/([A-Z0-9]{10})/,
      /\/ASIN\/([A-Z0-9]{10})/,
      /\/product\/([A-Z0-9]{10})/,
    ];
    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match) return match[1];
    }
    return null;
  }

  extractEbayItemId(url: string): string | null {
    const match = url.match(/\/itm\/(?:.*\/)?(\d+)/);
    return match ? match[1] : null;
  }

  async extractFromUrl(url: string): Promise<ExtractedProduct> {
    const platform = this.detectPlatform(url);
    switch (platform) {
      case 'amazon':
        return this.extractFromAmazon(url);
      case 'ebay':
        return this.extractFromEbay(url);
      default:
        throw new BadRequestException(`Extraction not yet supported for: ${platform}`);
    }
  }

  // ── Amazon PA-API v5 ──────────────────────────────────────────────────────

  private signAmazonRequest(
    method: string,
    host: string,
    path: string,
    payload: string,
    accessKey: string,
    secretKey: string,
    region = 'us-east-1',
    service = 'ProductAdvertisingAPI',
  ): Record<string, string> {
    const now = new Date();
    const amzDate = now.toISOString().replace(/[:-]|\.\d{3}/g, '').slice(0, 15) + 'Z';
    const dateStamp = amzDate.slice(0, 8);

    const payloadHash = crypto.createHash('sha256').update(payload).digest('hex');
    const canonicalHeaders =
      `content-encoding:amz-1.0\n` +
      `content-type:application/json; charset=utf-8\n` +
      `host:${host}\n` +
      `x-amz-date:${amzDate}\n` +
      `x-amz-target:com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems\n`;
    const signedHeaders = 'content-encoding;content-type;host;x-amz-date;x-amz-target';
    const canonicalRequest = [method, path, '', canonicalHeaders, signedHeaders, payloadHash].join('\n');

    const credentialScope = `${dateStamp}/${region}/${service}/aws4_request`;
    const stringToSign = [
      'AWS4-HMAC-SHA256',
      amzDate,
      credentialScope,
      crypto.createHash('sha256').update(canonicalRequest).digest('hex'),
    ].join('\n');

    const hmac = (key: Buffer | string, data: string) =>
      crypto.createHmac('sha256', key).update(data).digest();
    const signingKey = hmac(
      hmac(hmac(hmac(`AWS4${secretKey}`, dateStamp), region), service),
      'aws4_request',
    );
    const signature = crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

    return {
      'Content-Encoding': 'amz-1.0',
      'Content-Type': 'application/json; charset=UTF-8',
      Host: host,
      'X-Amz-Date': amzDate,
      'X-Amz-Target': 'com.amazon.paapi5.v1.ProductAdvertisingAPIv1.GetItems',
      Authorization: `AWS4-HMAC-SHA256 Credential=${accessKey}/${credentialScope}, SignedHeaders=${signedHeaders}, Signature=${signature}`,
    };
  }

  async extractFromAmazon(url: string): Promise<ExtractedProduct> {
    const asin = this.extractAmazonAsin(url);
    if (!asin) throw new BadRequestException('Could not extract ASIN from Amazon URL');

    const { AMAZON_ACCESS_KEY, AMAZON_SECRET_KEY, AMAZON_PARTNER_TAG } = process.env;

    if (!AMAZON_ACCESS_KEY || !AMAZON_SECRET_KEY || !AMAZON_PARTNER_TAG) {
      this.logger.warn('Amazon PA-API credentials not configured — returning placeholder');
      return {
        title: `Amazon Product (ASIN: ${asin})`,
        description: 'Configure Amazon PA-API credentials in .env to fetch real product data.',
        price: null,
        originalPrice: null,
        currency: 'USD',
        rating: null,
        reviewCount: null,
        images: [],
        affiliateLink: `https://www.amazon.com/dp/${asin}?tag=${AMAZON_PARTNER_TAG || 'your-tag'}`,
        platform: 'amazon',
        specifications: {},
      };
    }

    try {
      const host = 'webservices.amazon.com';
      const path = '/paapi5/getitems';
      const payload = JSON.stringify({
        ItemIds: [asin],
        PartnerTag: AMAZON_PARTNER_TAG,
        PartnerType: 'Associates',
        Marketplace: 'www.amazon.com',
        Resources: [
          'Images.Primary.Large',
          'Images.Variants.Large',
          'ItemInfo.Title',
          'ItemInfo.Features',
          'ItemInfo.TechnicalInfo',
          'Offers.Listings.Price',
          'Offers.Listings.SavingBasis',
          'CustomerReviews.StarRating',
          'CustomerReviews.Count',
        ],
      });

      const headers = this.signAmazonRequest(
        'POST',
        host,
        path,
        payload,
        AMAZON_ACCESS_KEY,
        AMAZON_SECRET_KEY,
      );

      const response = await fetch(`https://${host}${path}`, {
        method: 'POST',
        headers,
        body: payload,
      });

      if (!response.ok) {
        const errText = await response.text();
        this.logger.error(`Amazon PA-API error ${response.status}: ${errText}`);
        throw new Error(`Amazon API returned ${response.status}`);
      }

      const data = await response.json() as Record<string, unknown>;
      const itemsResult = data.ItemsResult as Record<string, unknown> | undefined;
      const items = itemsResult?.Items as unknown[] | undefined;
      if (!items || items.length === 0) {
        throw new BadRequestException('Product not found on Amazon');
      }

      const item = items[0] as Record<string, unknown>;
      const itemInfo = item.ItemInfo as Record<string, unknown> | undefined;
      const titleInfo = itemInfo?.Title as Record<string, string> | undefined;
      const title = titleInfo?.DisplayValue || `Amazon Product (ASIN: ${asin})`;

      const featuresInfo = itemInfo?.Features as Record<string, unknown> | undefined;
      const features = featuresInfo?.DisplayValues as string[] | undefined;
      const description = features?.slice(0, 3).join(' ') || '';

      const images: string[] = [];
      const primaryImage = (item.Images as Record<string, unknown> | undefined)?.Primary as Record<string, unknown> | undefined;
      const largePrimary = primaryImage?.Large as Record<string, string> | undefined;
      if (largePrimary?.URL) images.push(largePrimary.URL);
      const variantImages = (item.Images as Record<string, unknown> | undefined)?.Variants as unknown[] | undefined;
      if (variantImages) {
        for (const v of variantImages) {
          const largeV = (v as Record<string, unknown>).Large as Record<string, string> | undefined;
          if (largeV?.URL) images.push(largeV.URL);
        }
      }

      const offersListings = ((item.Offers as Record<string, unknown> | undefined)?.Listings as unknown[]) || [];
      const firstListing = offersListings[0] as Record<string, unknown> | undefined;
      const priceObj = firstListing?.Price as Record<string, unknown> | undefined;
      const price = priceObj?.Amount ? parseFloat(priceObj.Amount as string) : null;
      const currency = (priceObj?.Currency as string) || 'USD';
      const savingBasisObj = firstListing?.SavingBasis as Record<string, unknown> | undefined;
      const originalPrice = savingBasisObj?.Amount ? parseFloat(savingBasisObj.Amount as string) : null;

      const reviewsResult = item.CustomerReviews as Record<string, unknown> | undefined;
      const rating = reviewsResult?.StarRating ? parseFloat(reviewsResult.StarRating as string) : null;
      const reviewCount = reviewsResult?.Count ? parseInt(reviewsResult.Count as string, 10) : null;

      const techInfo = itemInfo?.TechnicalInfo as Record<string, unknown> | undefined;
      const techFeatures = techInfo?.Formats as unknown[] | undefined;
      const specifications: Record<string, string> = {};
      if (techFeatures) {
        for (const f of techFeatures) {
          const feat = f as Record<string, string>;
          if (feat.Name && feat.Value) specifications[feat.Name] = feat.Value;
        }
      }

      return {
        title,
        description,
        price,
        originalPrice,
        currency,
        rating,
        reviewCount,
        images,
        affiliateLink: `https://www.amazon.com/dp/${asin}?tag=${AMAZON_PARTNER_TAG}`,
        platform: 'amazon',
        specifications,
      };
    } catch (error) {
      this.logger.error('Amazon API error:', error);
      throw new BadRequestException('Failed to fetch product from Amazon API');
    }
  }

  // ── eBay Browse API ──────────────────────────────────────────────────────

  async extractFromEbay(url: string): Promise<ExtractedProduct> {
    const itemId = this.extractEbayItemId(url);
    if (!itemId) throw new BadRequestException('Could not extract item ID from eBay URL');

    const { EBAY_APP_ID, EBAY_CLIENT_SECRET } = process.env;

    if (!EBAY_APP_ID) {
      this.logger.warn('eBay API credentials not configured — returning placeholder');
      return {
        title: `eBay Item (ID: ${itemId})`,
        description: 'Configure eBay API credentials in .env to fetch real product data.',
        price: null,
        originalPrice: null,
        currency: 'USD',
        rating: null,
        reviewCount: null,
        images: [],
        affiliateLink: url,
        platform: 'ebay',
        specifications: {},
      };
    }

    try {
      // Get OAuth token
      const clientSecret = EBAY_CLIENT_SECRET || '';
      const credentials = Buffer.from(`${EBAY_APP_ID}:${clientSecret}`).toString('base64');
      const tokenResponse = await fetch('https://api.ebay.com/identity/v1/oauth2/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${credentials}`,
        },
        body: 'grant_type=client_credentials&scope=https://api.ebay.com/oauth/api_scope',
      });

      if (!tokenResponse.ok) {
        throw new Error(`eBay OAuth failed: ${tokenResponse.status}`);
      }

      const tokenData = await tokenResponse.json() as Record<string, string>;
      if (!tokenData.access_token) {
        throw new Error('eBay OAuth did not return access_token');
      }

      // Fetch item — try Browse API format
      const itemResponse = await fetch(
        `https://api.ebay.com/buy/browse/v1/item/v1|${itemId}|0`,
        {
          headers: {
            Authorization: `Bearer ${tokenData.access_token}`,
            'X-EBAY-C-MARKETPLACE-ID': 'EBAY_US',
          },
        },
      );

      if (!itemResponse.ok) {
        throw new Error(`eBay item fetch failed: ${itemResponse.status}`);
      }

      const item = await itemResponse.json() as Record<string, unknown>;

      const images: string[] = [];
      const primaryImage = item.image as Record<string, string> | undefined;
      if (primaryImage?.imageUrl) images.push(primaryImage.imageUrl);
      const additionalImages = item.additionalImages as Array<Record<string, string>> | undefined;
      if (additionalImages) {
        for (const img of additionalImages) {
          if (img.imageUrl) images.push(img.imageUrl);
        }
      }

      const priceObj = item.price as Record<string, string> | undefined;
      const price = priceObj?.value ? parseFloat(priceObj.value) : null;
      const currency = priceObj?.currency || 'USD';

      return {
        title: (item.title as string) || `eBay Item ${itemId}`,
        description: (item.shortDescription as string) || (item.description as string) || '',
        price,
        originalPrice: null,
        currency,
        rating: null,
        reviewCount: null,
        images,
        affiliateLink: (item.itemWebUrl as string) || url,
        platform: 'ebay',
        specifications: {},
      };
    } catch (error) {
      this.logger.error('eBay API error:', error);
      throw new BadRequestException('Failed to fetch product from eBay API');
    }
  }
}
