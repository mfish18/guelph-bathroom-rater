import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'University of Guelph Bathroom Rater',
  description: 'Rate and discover the best bathrooms at the University of Guelph',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
