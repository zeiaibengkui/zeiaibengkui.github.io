import fs from 'fs'
import path from 'path'

interface Article {
  filename: string
  title: string
  brief: string
  cato: string
  lables: string[]
  time?: string
  length: number
}

function extractMetadata(content: string): {
  title: string
  cato: string
  lables: string[]
  time?: string
} {
  const lines = content.split('\n')
  let title = ''
  let cato = ''
  const lables: string[] = []
  let time: string | undefined

  // Extract title (first h1)
  for (const line of lines) {
    if (line.startsWith('# ')) {
      title = line.replace(/^# /, '').trim()
      break
    }
  }

  // Extract metadata from content
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (line.startsWith('cato:')) {
      cato = line.replace('cato:', '').trim()
    }
    if (line.startsWith('lables') || line.startsWith('labels')) {
      // Parse the list that follows
      i++
      while (i < lines.length && lines[i].startsWith('- ')) {
        lables.push(lines[i].replace('- ', '').trim())
        i++
      }
      i--
    }
    if (line.startsWith('time:')) {
      time = line.replace('time:', '').trim()
    }
  }

  return { title, cato, lables, time }
}

function extractBrief(content: string): string {
  const lines = content.split('\n')
  let inMainText = false
  let brief = ''

  for (const line of lines) {
    // Skip metadata and HTML
    if (line.startsWith('cato:') || line.startsWith('lables') || line.startsWith('labels') ||
        line.startsWith('time:') || line.startsWith('<!--') || line.startsWith('#')) {
      continue
    }

    // Skip iframe and empty lines
    if (line.includes('iframe') || line.trim() === '' || line.startsWith('-') || line.startsWith('>')) {
      continue
    }

    // First non-empty, non-metadata line is the brief
    if (line.trim() && !brief) {
      brief = line.trim()
      // Limit to first 150 chars
      if (brief.length > 150) {
        brief = brief.substring(0, 147) + '...'
      }
      break
    }
  }

  return brief || '(No brief)'
}

function getFileSize(filePath: string): number {
  const stat = fs.statSync(filePath)
  return Math.ceil(stat.size / 1024) // Return size in KB
}

function generateIndex() {
  const articlesDir = path.join(process.cwd(), 'public/articles')
  const files = fs.readdirSync(articlesDir)
    .filter(file => file.endsWith('.md') && file !== 'template.md')
    .sort()

  const articles: Article[] = []

  for (const file of files) {
    const filePath = path.join(articlesDir, file)
    const content = fs.readFileSync(filePath, 'utf-8')

    const metadata = extractMetadata(content)
    const brief = extractBrief(content)
    const length = getFileSize(filePath)

    articles.push({
      filename: file,
      title: metadata.title || file.replace('.md', ''),
      brief,
      cato: metadata.cato || 'uncategorized',
      lables: metadata.lables,
      time: metadata.time,
      length
    })
  }

  // Generate JSON export
  const jsonContent = JSON.stringify({ articles }, null, 2)

  // Generate Markdown index
  const mdContent = `# Article Index

${articles.map(article => `
## [${article.title}](/articles/${article.filename})

- **Category**: ${article.cato}
- **Labels**: ${article.lables.length > 0 ? article.lables.join(', ') : 'none'}
- **Time**: ${article.time || 'N/A'}
- **Length**: ${article.length} KB

${article.brief}

---
`).join('\n')}
`

  // Write JSON file
  fs.writeFileSync(path.join(articlesDir, 'index.json'), jsonContent)
  console.log('Generated: public/articles/index.json')

  // Write Markdown index
  fs.writeFileSync(path.join(articlesDir, 'INDEX.md'), mdContent)
  console.log('Generated: public/articles/INDEX.md')

  console.log(`\nTotal articles indexed: ${articles.length}`)
}

generateIndex()
