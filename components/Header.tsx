'use client'

import Link from 'next/link'

export default function Header() {
  return (
    <header className="border-b border-gray-300 bg-gradient-to-r from-sky-100 via-indigo-100 to-purple-100 shadow-md">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-courgette text-2xl font-semibold text-text-primary hover:text-accent transition-colors">
          Roshish Parajuli
        </Link>
        <nav className="space-x-6">
          <Link href="/" className="text-text-secondary hover:text-text-primary transition-colors">
            Home
          </Link>
          <Link href="/blog" className="text-text-secondary hover:text-text-primary transition-colors">
            Blog
          </Link>
          <Link href="/sql-console" className="text-text-secondary hover:text-text-primary transition-colors">
            SQL Console
          </Link>
          <Link href="/portfolio" className="text-text-secondary hover:text-text-primary transition-colors">
            Portfolio
          </Link>
          <Link href="/contact" className="text-text-secondary hover:text-text-primary transition-colors">
            Contact
          </Link>
          <Link href="/gallery" className="text-text-secondary hover:text-text-primary transition-colors">
            Gallery
          </Link>
        </nav>
      </div>
    </header>
  )
}
