import Header from '@/components/header/Header';
import AuthProvider from '@/contexts/AuthContext';
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
          <AuthProvider>
            <Header />
            {children}
          </AuthProvider>
        </MainThemeContext>
      </body>
    </html>
  );
}
