import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
// @ts-ignore
import './globals.css';
import { ThemeProvider } from '@/components/ThemeProvider';
import { AppProvider } from '@/context/AppContext';
import { CustomCursor } from '@/components/CustomCursor';
import { GenerativeSoundscape } from '@/components/GenerativeSoundscape';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
});

export const metadata: Metadata = {
  title: 'Ethereal | Digital Journal',
  description: 'A techno-humanistic editorial experience.',
  icons: {
    icon: '/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" suppressHydrationWarning>
      <body className={`${inter.variable} ${playfair.variable} ${mono.variable} font-sans antialiased cursor-none`}>
        <ThemeProvider>
          <AppProvider>
            <CustomCursor />
            <GenerativeSoundscape />
            {children}
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
