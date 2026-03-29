import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "股票交易心理测评",
  description: "了解你的交易心理特征，发现优势与盲点",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className="min-h-full flex flex-col antialiased">
        {children}
      </body>
    </html>
  );
}
