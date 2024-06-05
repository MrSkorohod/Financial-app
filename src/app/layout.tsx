import MainThemeContext from '@/contexts/MainThemeContext';
import StoreProvider from '@/contexts/StoreProvider';
import { AuthContextProvider } from '@/contexts/AuthContext';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const messages = await getMessages();

  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <MainThemeContext>
            <StoreProvider>
              <AuthContextProvider>{children}</AuthContextProvider>
            </StoreProvider>
          </MainThemeContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
