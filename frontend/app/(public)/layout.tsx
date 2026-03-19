import Header from '@/components/public/Header';
import Footer from '@/components/public/Footer';
import CookieConsent from '@/components/ui/CookieConsent';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main className="min-h-screen">{children}</main>
      <Footer />
      <CookieConsent />
    </>
  );
}
