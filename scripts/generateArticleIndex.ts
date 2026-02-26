import fs from 'fs'
import path from 'path'

export interface Article {
  filename: string
  title: string
  brief: string
  cato: string
  labels: string[]
  time?: string
  length: number
}

export interface CategoryIndex {
  name: string
  color: string
  count: number
  articles: string[] // filenames
}

export interface LabelIndex {
  name: string
  color: string
  count: number
  articles: string[] // filenames
}

function extractMetadata(content: string): {
  title: string
  cato: string
  labels: string[]
  time?: string
} {
  const lines = content.split('\n')
  let title = ''
  let cato = ''
  const labels: string[] = []
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
    if (line.startsWith('labels') || line.startsWith('labels')) {
      // Parse the list that follows
      i++
      while (i < lines.length && lines[i].startsWith('- ')) {
        labels.push(lines[i].replace('- ', '').trim())
        i++
      }
      i--
    }
    if (line.startsWith('time:')) {
      time = line.replace('time:', '').trim()
    }
  }

  return { title, cato, labels, time }
}

function extractBrief(content: string): string {
  const lines = content.split('\n')
  let brief = ''

  for (const line of lines) {
    // Skip metadata and HTML
    if (line.startsWith('cato:') || line.startsWith('labels') || line.startsWith('labels') ||
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
        brief = brief.substring(0, 147) + '……'
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

function generateColor(index: number): string {
  const colors = [
    '#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6',
    '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1',
    '#14B8A6', '#A855F7', '#F43F5E', '#22D3EE', '#EAB308',
    '#DC2626', '#7C3AED', '#059669', '#D97706', '#DB2777'
  ]
  return colors[index % colors.length]
}

function generateIndex() {
  const articlesDir = path.join(process.cwd(), 'public/articles')
  const files = fs.readdirSync(articlesDir)
    .filter(file => file.endsWith('.md') && file !== 'template.md')
    .sort()

  const articles: Article[] = []
  const categoryMap = new Map<string, string[]>() // cato -> filenames
  const labelMap = new Map<string, string[]>() // label -> filenames

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
      labels: metadata.labels,
      time: metadata.time,
      length
    })

    // Build category index
    const cato = metadata.cato || 'uncategorized'
    if (!categoryMap.has(cato)) {
      categoryMap.set(cato, [])
    }
    categoryMap.get(cato)!.push(file)

    // Build label index
    for (const label of metadata.labels) {
      if (!labelMap.has(label)) {
        labelMap.set(label, [])
      }
      labelMap.get(label)!.push(file)
    }
  }

  // Generate category index
  const categories: object = {}
  let colorIndex = 0
  for (const [name, articleFiles] of Array.from(categoryMap.entries()).sort((a, b) => a[0].localeCompare(b[0]))) {
    categories[name] = ({
      color: generateColor(colorIndex++),
      count: articleFiles.length,
      articles: articleFiles
    })
  }

  // Generate label index
  const labels: object = {}
  colorIndex = 0
  for (const [name, articleFiles] of Array.from(labelMap.entries()).sort((a, b) => a[0].localeCompare(b[0]))) {
    labels[name] = ({
      color: generateColor(colorIndex++),
      count: articleFiles.length,
      articles: articleFiles
    })
  }

  // Sort Articles by time
  articles.sort((a, b) => {
    // Handle cases where time might be undefined
    if (!a.time && !b.time) return 0;
    if (!a.time) return 1; // Put articles without time at the end
    if (!b.time) return -1; // Put articles without time at the end

    // Convert time strings to Date objects for comparison
    const timeA = new Date(a.time).getTime();
    const timeB = new Date(b.time).getTime();

    // Sort in descending order (newest first)
    return timeB - timeA;
  });

  // Generate JSON export
  const jsonContent = JSON.stringify({
    articles,
    categories,
    labels
  }, null, 2)

  // Write JSON file
  fs.writeFileSync(path.join(articlesDir, 'index.json'), jsonContent)

  console.log('Generated: public/articles/index.json')
  console.log(`Total articles indexed: ${articles.length}`)
  console.log(`Categories: ${Object.keys(categories)}`)
  console.log(`Labels: ${Object.keys(labels)}`)
}

generateIndex()
