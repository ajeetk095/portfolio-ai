import './globals.css';
import Navbar from '@/src/components/Navbar';
import Footer from '@/src/components/Footer';
import ThreeBackground from '@/src/components/ThreeBackground';
import { ThemeProvider } from 'next-themes';

export const metadata = {
  title: 'Ajeet | Portfolio',
  description: 'AI-powered portfolio with 3D background and admin CMS.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-black text-white">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <ThreeBackground />
          <Navbar />
          <main className="pt-20 mx-auto max-w-6xl px-4">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
