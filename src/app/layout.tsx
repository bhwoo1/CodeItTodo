import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/layout/Header";
import ClientProvider from "./providers/ClientProvider";


export const metadata: Metadata = {
  title: "Codeit Todo",
  description: "코드잇 스프린트 프론트엔드 단기심화 우병현",
  icons: {
    icon: 'Size=Small.png'
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Header />
        <ClientProvider>{children}</ClientProvider>
      </body>
    </html>
  );
}
