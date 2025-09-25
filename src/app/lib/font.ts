import { Montserrat, Roboto } from "next/font/google";
import localFont from "next/font/local";

export const montserrat = Montserrat({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    display: "swap",
});

export const roboto = Roboto({
    subsets: ["latin"],
    weight: ["400", "500", "700"],
    display: "swap",
});

export const minion = localFont({
    src: [
        {
            path: "../../fonts/minion/MinionPro-Bold.otf", // relative to this file
            weight: "700",
            style: "normal",
        },
    ],
    variable: "--font-minion",
    display: "swap",
});