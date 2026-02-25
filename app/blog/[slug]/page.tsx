import { getAllPosts, getPostBySlug } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'
import type { Metadata } from 'next'
import { FiArrowLeft, FiClock, FiCalendar, FiUser, FiTag, FiArrowRight } from 'react-icons/fi'

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getPostBySlug(params.slug)
  if (!post) return {}

  return {
    title: `${post.title} | Roshish Parajuli`,
    description: post.description,
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://roshishparajuli.com.np/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: post.image, width: 1200, height: 630 }] : [],
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `https://roshishparajuli.com.np/blog/${post.slug}`,
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const posts = getAllPosts()
  const post = posts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  const currentIndex = posts.findIndex(p => p.slug === params.slug)
  const prevPost = currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null
  const nextPost = currentIndex > 0 ? posts[currentIndex - 1] : null

  // Related posts: same tags, exclude current
  const relatedPosts = posts
    .filter(p => p.slug !== post.slug && p.tags.some(t => post.tags.includes(t)))
    .slice(0, 3)

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    author: {
      '@type': 'Person',
      name: post.author,
      url: 'https://roshishparajuli.com.np',
    },
    image: post.image || undefined,
    url: `https://roshishparajuli.com.np/blog/${post.slug}`,
    keywords: post.tags.join(', '),
    publisher: {
      '@type': 'Person',
      name: 'Roshish Parajuli',
    },
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <article className="w-full min-h-screen px-6 py-10 md:px-12 md:py-16 flex justify-center">
        <div className="max-w-4xl w-full">

          {/* Back button */}
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-gray-400 hover:text-indigo-400 transition-colors text-sm mb-8 group"
          >
            <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
            Back to all articles
          </Link>

          {/* Hero Image */}
          {post.image && (
            <div className="rounded-3xl overflow-hidden mb-8 relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
                loading="eager"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
          )}

          {/* Header */}
          <header className="mb-10">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 bg-indigo-600/15 text-indigo-400 text-xs font-mono px-3 py-1 rounded-full border border-indigo-500/20"
                >
                  <FiTag size={10} />
                  {tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-merriweather">
              {post.title}
            </h1>

            {/* Meta bar */}
            <div className="flex flex-wrap items-center gap-4 text-gray-400 text-sm pb-6 border-b border-white/10">
              <span className="flex items-center gap-1.5">
                <FiUser size={14} className="text-indigo-400" />
                {post.author}
              </span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span className="flex items-center gap-1.5">
                <FiCalendar size={14} className="text-indigo-400" />
                {formatDate(post.date)}
              </span>
              <span className="w-1 h-1 bg-gray-600 rounded-full" />
              <span className="flex items-center gap-1.5">
                <FiClock size={14} className="text-indigo-400" />
                {post.readTime}
              </span>
            </div>
          </header>

          {/* Article Content */}
          <section className="
            glass-panel p-8 md:p-12 rounded-3xl shadow-2xl shadow-indigo-500/5
            prose prose-invert prose-indigo max-w-none
            prose-headings:font-merriweather prose-headings:font-bold
            prose-h2:text-2xl prose-h2:md:text-3xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:text-white prose-h2:border-b prose-h2:border-white/10 prose-h2:pb-4
            prose-h3:text-xl prose-h3:md:text-2xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-200
            prose-p:text-gray-300 prose-p:leading-relaxed prose-p:text-base prose-p:md:text-lg
            prose-li:text-gray-300 prose-li:leading-relaxed
            prose-strong:text-white prose-strong:font-semibold
            prose-a:text-indigo-400 prose-a:no-underline hover:prose-a:text-indigo-300
            prose-code:bg-white/10 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-md prose-code:text-indigo-300 prose-code:text-sm prose-code:font-mono
            prose-pre:bg-black/60 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-2xl prose-pre:shadow-lg
            prose-blockquote:border-indigo-500 prose-blockquote:bg-indigo-500/5 prose-blockquote:rounded-r-xl prose-blockquote:py-1
            prose-table:border-collapse
            prose-th:bg-white/5 prose-th:border prose-th:border-white/10 prose-th:px-4 prose-th:py-2
            prose-td:border prose-td:border-white/10 prose-td:px-4 prose-td:py-2
          ">
            <MDXRemote source={post.content} />
          </section>

          {/* Post Navigation */}
          <nav className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-4" aria-label="Post navigation">
            {prevPost ? (
              <Link
                href={`/blog/${prevPost.slug}`}
                className="glass-panel p-6 rounded-2xl hover:border-indigo-500/30 transition-all group flex flex-col"
              >
                <span className="text-xs text-gray-500 mb-2 flex items-center gap-1">
                  <FiArrowLeft size={12} /> Previous Article
                </span>
                <span className="text-white font-semibold group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {prevPost.title}
                </span>
              </Link>
            ) : (
              <div />
            )}
            {nextPost && (
              <Link
                href={`/blog/${nextPost.slug}`}
                className="glass-panel p-6 rounded-2xl hover:border-indigo-500/30 transition-all group flex flex-col text-right md:col-start-2"
              >
                <span className="text-xs text-gray-500 mb-2 flex items-center gap-1 justify-end">
                  Next Article <FiArrowRight size={12} />
                </span>
                <span className="text-white font-semibold group-hover:text-indigo-400 transition-colors line-clamp-1">
                  {nextPost.title}
                </span>
              </Link>
            )}
          </nav>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="text-2xl font-bold text-white mb-8 font-merriweather">
                Related Articles
              </h2>
              <div className="grid gap-6 md:grid-cols-3">
                {relatedPosts.map(rp => (
                  <Link
                    key={rp.slug}
                    href={`/blog/${rp.slug}`}
                    className="glass-panel rounded-2xl overflow-hidden hover:border-indigo-500/30 transition-all group"
                  >
                    {rp.image && (
                      <div className="h-32 overflow-hidden">
                        <img
                          src={rp.image}
                          alt={rp.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                          loading="lazy"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-xs text-gray-500 flex items-center gap-1 mb-2">
                        <FiClock size={10} />
                        {rp.readTime}
                      </span>
                      <h3 className="text-sm font-bold text-white group-hover:text-indigo-400 transition-colors line-clamp-2">
                        {rp.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Author Card */}
          <section className="mt-16 glass-panel p-8 rounded-3xl flex flex-col md:flex-row items-center gap-6">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-indigo-500/30 flex-shrink-0">
              <img src="/me.jpeg" alt="Roshish Parajuli" className="w-full h-full object-cover" />
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-lg font-bold text-white mb-1">Written by Roshish Parajuli</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Full Stack Developer & Data Engineer based in Kathmandu, Nepal.
                Building production-grade data systems, automation tools, and scalable web applications.
              </p>
            </div>
            <Link
              href="/contact"
              className="ml-auto px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold transition-all whitespace-nowrap flex-shrink-0"
            >
              Get in Touch
            </Link>
          </section>

        </div>
      </article>
    </>
  )
}
