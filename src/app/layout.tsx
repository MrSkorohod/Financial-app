import Header from '@/components/header/Header';
import MainThemeContext from '@/contexts/MainThemeContext';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainThemeContext>
          <Header />
          {children}
        </MainThemeContext>
      </body>
    </html>
  );
}
