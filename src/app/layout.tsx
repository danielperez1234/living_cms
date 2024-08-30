import AppNavBar from "@/components/common/app_nav_bar/main";
import AppTheme from "@/components/common/app_theme";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Living CMS",
  description: "Sistema de admministracion para contenido en living web",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppTheme>
          {children}
        </AppTheme>
      </body>
    </html>
  );
}
