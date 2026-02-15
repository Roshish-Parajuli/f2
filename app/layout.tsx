import './globals.css'
import type { Metadata } from 'next'
import { Poppins, Merriweather } from 'next/font/google'
import Sidebar from '@/components/Sidebar'

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-poppins'
})

const merriweather = Merriweather({
  subsets: ['latin'],
  weight: ['300', '400', '700', '900'],
  variable: '--font-merriweather'
})

export const metadata: Metadata = {
  title: 'Roshish Parajuli | Data Engineer & Systems Architect',
  description: 'Roshish Parajuli is a Data Engineer specializing in scalable ETL pipelines, cloud-native analytics, and automation. Expert in Python, SQL, and AWS.',
  keywords: ['Data Engineer', 'ETL', 'Python', 'SQL', 'AWS', 'Nepal', 'Roshish Parajuli', 'Data Pipelines', 'Automation'],
  authors: [{ name: 'Roshish Parajuli' }],
  openGraph: {
    title: 'Roshish Parajuli | Data Engineer',
    description: 'Building scalable data systems and automation tools.',
    url: 'https://roshishparajuli.com.np',
    siteName: 'Roshish Parajuli Portfolio',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Roshish Parajuli | Data Engineer',
    description: 'Building scalable data systems and automation tools.',
    creator: '@roshish_parajuli',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${merriweather.variable} scroll-smooth`}>
      <body className="bg-black text-white selection:bg-indigo-500/30 font-poppins">
        <div className="flex flex-col md:flex-row min-h-screen bg-black overflow-hidden relative">
          <SidebarWrapper />
          <main className="flex-1 h-screen overflow-y-auto w-full relative">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
}

function SidebarWrapper() {
  return (
    <div className="hidden md:block h-screen sticky top-0 z-50">
      <Sidebar />
    </div>
  )
}