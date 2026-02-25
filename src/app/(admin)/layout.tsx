import { Montserrat } from "next/font/google";
import "./globals.css"
import { Providers } from "@/redux/Provider";

export const metadata = {
  title: "Lumina Talent Advisory",
  description: "Professional talent advisory services for modern businesses",
}


const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body>
        <Providers>

          {children}
        </Providers>
      </body>
    </html>
  )
}
