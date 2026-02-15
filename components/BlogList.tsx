'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight } from 'react-icons/fi'

interface Post {
  slug: string
  title: string
  description: string
}

interface BlogListProps {
  posts: Post[]
}

export default function BlogList({ posts }: BlogListProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  }

  return (
    <article className="w-full min-h-screen px-6 py-10 md:px-12 md:py-16 flex flex-col items-center gap-12">
      
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center max-w-4xl"
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6 text-gradient font-merriweather">
          Tech Insights
        </h1>
        <p className="text-gray-400 text-lg">
          Deep dives into data systems, cloud architecture, and engineering patterns.
        </p>
      </motion.header>

      {/* Blog Posts */}
      <motion.ul 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 w-full max-w-4xl"
      >
        {posts.map(p => (
          <motion.li key={p.slug} variants={itemVariants}>
            <Link 
              href={`/blog/${p.slug}`} 
              className="group block glass-panel p-8 rounded-3xl hover:border-indigo-500/50 transition-all hover:shadow-2xl hover:shadow-indigo-500/10 relative z-10"
            >
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-indigo-400 transition-colors">
                {p.title}
              </h2>
              <p className="text-gray-400 text-sm md:text-base leading-relaxed line-clamp-3">
                {p.description}
              </p>
              <div className="mt-6 flex items-center text-indigo-400 font-semibold gap-2">
                Read full article 
                <FiArrowRight className="transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>
    </article>
  )
}
