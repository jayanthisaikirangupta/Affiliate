import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import CookieConsent from '@/components/ui/CookieConsent';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-white focus:px-4 focus:py-2 focus:rounded focus:shadow-lg focus:text-primary focus:text-sm focus:font-semibold">
        Skip to content
      </a>
      <Header />
      <main id="main-content" className="min-h-screen">{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
