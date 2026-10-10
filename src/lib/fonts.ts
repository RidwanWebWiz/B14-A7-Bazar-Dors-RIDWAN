import { Inter, Hind_Siliguri } from "next/font/google";

// Primary English Font from Figma
export const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

// Primary Bangla Font (Includes clean Bangla digits)
export const hindSiliguri = Hind_Siliguri({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["bengali", "latin"],
  variable: "--font-hind-siliguri",
  display: "swap",
});