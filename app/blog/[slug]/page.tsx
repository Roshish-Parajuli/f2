import { getAllPosts } from '@/lib/posts'
import { notFound } from 'next/navigation'
import { MDXRemote } from 'next-mdx-remote/rsc'
import Link from 'next/link'

export function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map(p => ({ slug: p.slug }))
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const posts = getAllPosts()
  const post = posts.find(p => p.slug === params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article className="w-full min-h-screen px-6 py-10 md:px-12 md:py-20 flex justify-center">
      <div className="max-w-4xl w-full">
        <header className="mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight font-merriweather">
            {post.title}
          </h1>
          <div className="flex items-center gap-4 text-gray-400 text-sm">
             <span className="bg-indigo-600/20 text-indigo-400 px-3 py-1 rounded-full font-mono uppercase tracking-wider">
               Dev Log
             </span>
             <span>•</span>
             <span>Refined Insights</span>
          </div>
        </header>

        <section className="glass-panel p-8 md:p-12 rounded-3xl prose prose-invert prose-indigo max-w-none shadow-2xl">
          <MDXRemote source={post.content} />
        </section>

        <footer className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
          <Link href="/#blog" className="text-indigo-400 hover:text-white transition-colors flex items-center gap-2">
            ← Back to insights
          </Link>
        </footer>
      </div>
    </article>
  )
}
