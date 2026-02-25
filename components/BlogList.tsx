'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FiArrowRight, FiClock, FiCalendar, FiTag, FiSearch } from 'react-icons/fi'
import { useState } from 'react'

interface Post {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  readTime: string
  image: string
}

interface BlogListProps {
  posts: Post[]
  allTags: string[]
}

export default function BlogList({ posts, allTags }: BlogListProps) {
  const [activeTag, setActiveTag] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredPosts = posts.filter(p => {
    const matchesTag = !activeTag || p.tags.includes(activeTag)
    const matchesSearch = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesTag && matchesSearch
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12 }
    }
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  }

  function formatDate(dateStr: string): string {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <article className="w-full min-h-screen px-6 py-10 md:px-12 md:py-16 flex flex-col items-center gap-10">

      {/* Hero Header */}
      <motion.header
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-center max-w-4xl w-full"
      >
        <div className="inline-flex items-center gap-2 bg-indigo-600/10 border border-indigo-500/20 text-indigo-400 text-xs font-mono uppercase tracking-widest px-4 py-2 rounded-full mb-6">
          <FiTag size={12} />
          {posts.length} Articles Published
        </div>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 font-merriweather leading-tight">
          <span className="text-gradient">Tech Insights</span>
        </h1>
        <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
          Deep dives into data engineering, system architecture, automation,
          and the craft of building production-grade software.
        </p>
      </motion.header>

      {/* Search + Filters */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="w-full max-w-4xl space-y-4"
      >
        {/* Search Bar */}
        <div className="relative">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
          <input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-2xl pl-12 pr-4 py-3.5 text-white placeholder:text-gray-500 focus:outline-none focus:border-indigo-500/50 focus:ring-1 focus:ring-indigo-500/20 transition-all"
          />
        </div>

        {/* Tag Filters */}
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${!activeTag
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
              }`}
          >
            All Posts
          </button>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveTag(activeTag === tag ? null : tag)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${activeTag === tag
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/10'
                }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </motion.div>

      {/* Featured Post (First Post) */}
      {filteredPosts.length > 0 && !activeTag && !searchQuery && (
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="w-full max-w-4xl"
        >
          <Link href={`/blog/${filteredPosts[0].slug}`} className="group block relative">
            <div className="relative overflow-hidden rounded-3xl glass-panel border border-white/10 hover:border-indigo-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10">
              {/* Image */}
              {filteredPosts[0].image && (
                <div className="h-72 md:h-80 overflow-hidden relative">
                  <img
                    src={filteredPosts[0].image}
                    alt={filteredPosts[0].title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    loading="eager"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>
              )}

              {/* Content overlay */}
              <div className={`${filteredPosts[0].image ? 'absolute bottom-0 left-0 right-0' : ''} p-8 md:p-10`}>
                <div className="flex items-center gap-3 mb-4">
                  <span className="bg-indigo-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                    Featured
                  </span>
                  <span className="text-gray-300 text-xs flex items-center gap-1.5">
                    <FiCalendar size={12} />
                    {formatDate(filteredPosts[0].date)}
                  </span>
                  <span className="text-gray-300 text-xs flex items-center gap-1.5">
                    <FiClock size={12} />
                    {filteredPosts[0].readTime}
                  </span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 group-hover:text-indigo-300 transition-colors leading-tight">
                  {filteredPosts[0].title}
                </h2>
                <p className="text-gray-300 text-sm md:text-base leading-relaxed line-clamp-2 max-w-2xl">
                  {filteredPosts[0].description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {filteredPosts[0].tags.map(tag => (
                    <span key={tag} className="bg-white/10 text-indigo-200 text-xs px-3 py-1 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      )}

      {/* Blog Posts Grid */}
      <motion.ul
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid gap-8 md:grid-cols-2 w-full max-w-4xl"
      >
        {(activeTag || searchQuery ? filteredPosts : filteredPosts.slice(1)).map(p => (
          <motion.li key={p.slug} variants={itemVariants}>
            <Link
              href={`/blog/${p.slug}`}
              className="group block glass-panel rounded-3xl overflow-hidden hover:border-indigo-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-indigo-500/10 h-full"
            >
              {/* Card Image */}
              {p.image && (
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={p.image}
                    alt={p.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>
              )}

              <div className="p-6 md:p-8">
                {/* Meta */}
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiCalendar size={11} />
                    {formatDate(p.date)}
                  </span>
                  <span className="w-1 h-1 bg-gray-600 rounded-full" />
                  <span className="flex items-center gap-1">
                    <FiClock size={11} />
                    {p.readTime}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-xl md:text-2xl font-bold text-white mb-3 group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                  {p.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 text-sm leading-relaxed line-clamp-3 mb-4">
                  {p.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="bg-white/5 text-indigo-300 text-[10px] font-mono px-2.5 py-0.5 rounded-full border border-white/5">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Read More */}
                <div className="flex items-center text-indigo-400 font-semibold text-sm gap-2 group-hover:gap-3 transition-all">
                  Read article
                  <FiArrowRight className="transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </motion.li>
        ))}
      </motion.ul>

      {/* Empty State */}
      {filteredPosts.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-20"
        >
          <p className="text-gray-500 text-lg">No articles found matching your criteria.</p>
          <button
            onClick={() => { setActiveTag(null); setSearchQuery('') }}
            className="mt-4 text-indigo-400 hover:text-indigo-300 transition-colors"
          >
            Clear filters
          </button>
        </motion.div>
      )}
    </article>
  )
}
