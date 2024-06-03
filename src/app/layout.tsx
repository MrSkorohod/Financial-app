import MainThemeContext from '@/contexts/MainThemeContext';
import StoreProvider from '@/contexts/StoreProvider';
import { AuthContextProvider } from '@/contexts/AuthContext';
import 'react-toastify/ReactToastify.min.css';

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
            <AuthContextProvider>{children}</AuthContextProvider>
          </StoreProvider>
        </MainThemeContext>
      </body>
    </html>
  );
}
