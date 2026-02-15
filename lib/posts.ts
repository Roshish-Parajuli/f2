import fs from 'fs'
import path from 'path'

const dir = path.join(process.cwd(), 'content/blog')

export function getAllPosts() {
  return fs.readdirSync(dir).map(file => {
    const content = fs.readFileSync(path.join(dir, file), 'utf8')
    const lines = content.split('\n')
    const title = lines.find(line => line.startsWith('# '))?.slice(2)
    const description = lines.find(line => line.trim() !== '' && !line.startsWith('# ')) || ''
    
    return {
      slug: file.replace(/\.mdx$/, ''),
      title: title || file.replace(/\.mdx$/, ''),
      description: description.slice(0, 160) + (description.length > 160 ? '...' : ''),
      content
    }
  })
}