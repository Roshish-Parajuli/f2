import BlogList from '@/components/BlogList'
import { getAllPosts, getAllTags } from '@/lib/posts'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog | Roshish Parajuli — Tech Insights & Engineering Guides',
  description: 'Read in-depth articles on data engineering, web scraping, automation, API design, and modern software architecture by Roshish Parajuli.',
  openGraph: {
    title: 'Tech Insights Blog | Roshish Parajuli',
    description: 'Deep dives into data engineering, system architecture, and the craft of building production-grade software.',
    url: 'https://roshishparajuli.com.np/blog',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tech Insights Blog | Roshish Parajuli',
    description: 'Deep dives into data engineering, system architecture, and the craft of building production-grade software.',
  },
  alternates: {
    canonical: 'https://roshishparajuli.com.np/blog',
  },
}

export default function BlogIndex() {
  const posts = getAllPosts()
  const allTags = getAllTags()
  return <BlogList posts={posts} allTags={allTags} />
}
