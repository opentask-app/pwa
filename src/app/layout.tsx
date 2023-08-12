import './globals.css';
import { Inter } from 'next/font/google';
import { GaNextScriptNavigation } from './shared/ga';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Task Manager App',
  description: 'Yet another Task Manager app. But this one is on Next.js App Router!',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex min-h-screen flex-col`}>
        {children}
        <GaNextScriptNavigation gaId="G-C6TYTB01NE" />
      </body>
    </html>
  );
}
