import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ProvidersAntd from "./providers/antdproviders";
import I18nProvider from "./providers/i18nproviders";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Clearify",
  description: "Clearify - AI Image Deblurring Tool",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ProvidersAntd>
            <I18nProvider>
              {children}
            </I18nProvider>
        </ProvidersAntd>
      </body>
    </html>
  );
}
