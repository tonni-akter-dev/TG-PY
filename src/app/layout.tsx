import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: 'UHQ SMM Dashboard',
  description: 'Professional UHQ SMM Dashboard'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased dark:bg-gradient-dark`}>
        <ThemeProvider defaultTheme='system' storageKey='smm-ui-theme'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
