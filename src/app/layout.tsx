import Header from '@/components/header/Header';
import AuthProvider from '@/contexts/AuthContext';
import MainThemeContext from '@/contexts/MainThemeContext';
import StoreProvider from './StroeProvider';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MainThemeContext>
          <AuthProvider>
            <Header />
            <StoreProvider>{children}</StoreProvider>
          </AuthProvider>
        </MainThemeContext>
      </body>
    </html>
  );
}
