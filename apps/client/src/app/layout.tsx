import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Lora } from "next/font/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "MoneyFlow — Atur Uangmu Lebih Gampang",
  description:
    "Catat pemasukan, pantau pengeluaran, bikin target nabung, dan lihat kondisi keuanganmu dalam satu tempat. Gratis dan gampang dipake.",
  keywords: [
    "keuangan pribadi",
    "catat pengeluaran",
    "nabung",
    "budget",
    "finance app",
    "MoneyFlow",
  ],
  authors: [{ name: "MoneyFlow" }],
  openGraph: {
    title: "MoneyFlow — Atur Uangmu Lebih Gampang",
    description:
      "Catat pemasukan, pantau pengeluaran, bikin target nabung, dan lihat kondisi keuanganmu dalam satu tempat.",
    type: "website",
    locale: "id_ID",
    siteName: "MoneyFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "MoneyFlow — Atur Uangmu Lebih Gampang",
    description:
      "Catat pemasukan, pantau pengeluaran, bikin target nabung, dan lihat kondisi keuanganmu dalam satu tempat.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${plusJakartaSans.variable} ${lora.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-slate-900 font-sans">
        {children}
      </body>
    </html>
  );
}
