import Header from '@/components/header/Header';
import MainThemeContext from '@/contexts/MainThemeContext';
import StoreProvider from '../contexts/StoreProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainThemeContext>
          <StoreProvider>
            <Header />
            {children}
          </StoreProvider>
        </MainThemeContext>
      </body>
    </html>
  );
}
