import { NextResponse } from 'next/server'
import projects from '@/data/projects.json'

export async function POST(request: Request) {
  try {
    const { query } = await request.json()

    if (!query) {
      return NextResponse.json({ error: 'Query is required' }, { status: 400 })
    }

    // A very basic SQL-like parser for demonstration purposes
    // It only supports SELECT * FROM projects WHERE <column> = <value>
    const selectRegex = /SELECT \* FROM projects WHERE (.+)/i
    const match = query.match(selectRegex)

    let results = projects

    if (match && match[1]) {
      const whereClause = match[1].trim()
      const parts = whereClause.split('=').map((p: string) => p.trim())

      if (parts.length === 2) {
        const column = parts[0]
        const value = parts[1].replace(/['"]/g, '') // Remove quotes from value

        results = projects.filter((project: any) => project[column] == value)
      } else {
        return NextResponse.json({ error: 'Invalid WHERE clause format. Expected: column = value' }, { status: 400 })
      }
    } else if (!query.match(/SELECT \* FROM projects/i)) {
      return NextResponse.json({ error: 'Only SELECT * FROM projects queries are supported' }, { status: 400 })
    }

    return NextResponse.json(results)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
