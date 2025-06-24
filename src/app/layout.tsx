import type { Metadata } from "next";
import { Noto_Sans, Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import { FormProvider } from "./world-dental-hygienist-awards/wdha.context";
import { FormProviderEDHF } from "./gum-edhf-award-of-distinction/edhf.context";
import Script from "next/script";

const notoSans = Noto_Sans({
  variable: "--font-noto-sans",
  subsets: ["latin"],
});

const notoSansMono = Noto_Sans_Mono({
  variable: "--font-noto-sans-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sunstar Foundation - Awards submission forms",
  description:
    "Welcome to the Sunstar Foundation Awards submission forms. Please select the appropriate form from the list below to begin your submission process. Each form is designed to gather specific information related to the respective award category. Ensure that you fill out all required fields accurately and completely.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
         <Script
          id="usercentrics-cmp"
          src="https://app.usercentrics.eu/browser-ui/latest/loader.js"
          data-settings-id="_2XSaYDrpo"
          async={true}
          strategy="afterInteractive"
        />
      </head>
      <body
        className={`${notoSans.variable} ${notoSansMono.variable} antialiased`}
      >
       
        <FormProviderEDHF>
          <FormProvider>{children}</FormProvider>
        </FormProviderEDHF>
      </body>
    </html>
  );
}
