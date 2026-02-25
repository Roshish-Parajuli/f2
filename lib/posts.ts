import fs from 'fs'
import path from 'path'

const dir = path.join(process.cwd(), 'content/blog')

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  tags: string[]
  author: string
  readTime: string
  image: string
  content: string
}

function parseFrontmatter(raw: string): { meta: Record<string, any>; content: string } {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/)
  if (!match) {
    // Fallback for posts without frontmatter
    const lines = raw.split('\n')
    const title = lines.find(line => line.startsWith('# '))?.slice(2) || 'Untitled'
    const description = lines.find(line => line.trim() !== '' && !line.startsWith('#')) || ''
    return {
      meta: { title, description: description.slice(0, 160) },
      content: raw
    }
  }

  const frontmatter = match[1]
  const content = match[2].trim()
  const meta: Record<string, any> = {}

  frontmatter.split('\n').forEach(line => {
    const colonIdx = line.indexOf(':')
    if (colonIdx === -1) return
    const key = line.slice(0, colonIdx).trim()
    let value = line.slice(colonIdx + 1).trim()

    // Handle arrays
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key] = value
        .slice(1, -1)
        .split(',')
        .map(s => s.trim().replace(/^["']|["']$/g, ''))
    }
    // Handle quoted strings
    else if (value.startsWith('"') && value.endsWith('"')) {
      meta[key] = value.slice(1, -1)
    }
    else {
      meta[key] = value
    }
  })

  return { meta, content }
}

export function getAllPosts(): PostMeta[] {
  const files = fs.readdirSync(dir).filter(f => f.endsWith('.mdx'))
  
  const posts = files.map(file => {
    const raw = fs.readFileSync(path.join(dir, file), 'utf8')
    const { meta, content } = parseFrontmatter(raw)

    return {
      slug: file.replace(/\.mdx$/, ''),
      title: meta.title || file.replace(/\.mdx$/, ''),
      description: meta.description || '',
      date: meta.date || '2025-01-01',
      tags: Array.isArray(meta.tags) ? meta.tags : [],
      author: meta.author || 'Roshish Parajuli',
      readTime: meta.readTime || '3 min read',
      image: meta.image || '',
      content
    }
  })

  // Sort by date, newest first
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getPostBySlug(slug: string): PostMeta | undefined {
  const posts = getAllPosts()
  return posts.find(p => p.slug === slug)
}

export function getAllTags(): string[] {
  const posts = getAllPosts()
  const tagSet = new Set<string>()
  posts.forEach(p => p.tags.forEach(t => tagSet.add(t)))
  return Array.from(tagSet).sort()
}