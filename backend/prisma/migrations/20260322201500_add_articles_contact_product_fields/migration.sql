-- AlterTable: Add enhanced product fields
ALTER TABLE "products" ADD COLUMN "editorial_note" TEXT;
ALTER TABLE "products" ADD COLUMN "brand" TEXT;
ALTER TABLE "products" ADD COLUMN "pet_type" TEXT;
ALTER TABLE "products" ADD COLUMN "sub_category" TEXT;
ALTER TABLE "products" ADD COLUMN "tags" TEXT[] DEFAULT '{}';
ALTER TABLE "products" ADD COLUMN "is_staff_pick" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "products" ADD COLUMN "is_deal" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "products" ADD COLUMN "deal_expiry" TIMESTAMP(3);
ALTER TABLE "products" ADD COLUMN "affiliate_links" JSONB;
ALTER TABLE "products" ADD COLUMN "specs" JSONB;
ALTER TABLE "products" ALTER COLUMN "currency" SET DEFAULT 'GBP';

-- CreateTable: articles
CREATE TABLE "articles" (
    "id" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "subtitle" TEXT,
    "type" TEXT NOT NULL DEFAULT 'blog-post',
    "pet_type" TEXT,
    "hero_image" TEXT,
    "hero_image_alt" TEXT,
    "excerpt" TEXT,
    "content" TEXT,
    "quick_picks" JSONB,
    "comparison_products" TEXT[] DEFAULT '{}',
    "author_name" TEXT,
    "author_photo" TEXT,
    "author_bio" TEXT,
    "author_credentials" TEXT,
    "reviewer_name" TEXT,
    "reviewer_photo" TEXT,
    "reviewer_credentials" TEXT,
    "read_time" INTEGER,
    "is_featured" BOOLEAN NOT NULL DEFAULT false,
    "seo_title" TEXT,
    "meta_description" TEXT,
    "focus_keyword" TEXT,
    "faqs" JSONB,
    "related_articles" TEXT[] DEFAULT '{}',
    "status" TEXT NOT NULL DEFAULT 'DRAFT',
    "published_at" TIMESTAMP(3),
    "category_id" TEXT,
    "deleted_at" TIMESTAMP(3),
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "articles_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "articles_slug_key" ON "articles"("slug");
CREATE INDEX "articles_status_idx" ON "articles"("status");
CREATE INDEX "articles_type_idx" ON "articles"("type");
CREATE INDEX "articles_pet_type_idx" ON "articles"("pet_type");
CREATE INDEX "articles_category_id_idx" ON "articles"("category_id");
CREATE INDEX "articles_is_featured_idx" ON "articles"("is_featured");
CREATE INDEX "articles_published_at_idx" ON "articles"("published_at");

ALTER TABLE "articles" ADD CONSTRAINT "articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateTable: contact_submissions
CREATE TABLE "contact_submissions" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "contact_submissions_pkey" PRIMARY KEY ("id")
);
