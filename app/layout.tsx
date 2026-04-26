import type { Metadata } from "next";
import Script from "next/script";
import { IBM_Plex_Mono, Noto_Sans_SC, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { ConditionalFooter } from "@/components/layout/ConditionalFooter";
import { ThemeProvider } from "@/components/theme/ThemeProvider";

const sans = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Noto_Serif_SC({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "陈凡｜AI 产品与增长",
    template: "%s｜陈凡",
  },
  description: "聚焦 AI 产品思维、内容驱动增长、国际用户洞察与结构化决策的个人作品集。",
};

const themeBoot = `(function(){try{var t=localStorage.getItem("portfolio-theme");if(t==="terminal")t="green";if(t==="dark"||t==="light"||t==="green"||t==="pink")document.documentElement.setAttribute("data-theme",t);else document.documentElement.setAttribute("data-theme","dark");}catch(e){document.documentElement.setAttribute("data-theme","dark");}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${sans.variable} ${serif.variable} ${mono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen overflow-x-clip font-sans font-normal">
        <Script id="theme-boot" strategy="beforeInteractive">
          {themeBoot}
        </Script>
        <ThemeProvider>
          <SiteHeader />
          <main className="relative z-10 pt-[var(--header-h)]">{children}</main>
          <ConditionalFooter />
        </ThemeProvider>
      </body>
    </html>
  );
}
