import fs from 'fs'
import path from 'path'
import rehypeFormat from 'rehype-format'
import rehypeKatex from 'rehype-katex'
import rehypeRaw from 'rehype-raw'
import rehypeStringify from 'rehype-stringify'
import remarkDirective from 'remark-directive'
import remarkFrontmatter from 'remark-frontmatter'
import remarkGfm from 'remark-gfm'
import remarkMath from 'remark-math'
import remarkParse from 'remark-parse'
import remarkRehype from 'remark-rehype'
import { unified } from 'unified'

/**
 * Normalize LaTeX math delimiters:
 * - \[ \] → $$ (display math)
 * - \( \) → $ (inline math)
 */
function normalizeLatexDelimiters(content: string): string {
  return content
    .replace(/\\\[/g, '$$$$')
    .replace(/\\\]/g, '$$$$')
    .replace(/\\\(/g, '$')
    .replace(/\\\)/g, '$')
}

/**
 * Remove custom frontmatter from content
 * Handles both ---...--- format and custom cato/labels format
 */
function removeFrontmatter(content: string): string {
  // Remove ---...--- YAML frontmatter
  if (content.trim().startsWith('---')) {
    const endMatch = content.match(/^---\n([\s\S]*?)\n---\n?/)
    if (endMatch) {
      content = content.slice(endMatch[0].length)
    }
  }
  
  // Remove custom frontmatter: lines at start that match patterns like cato:, labels:, time:, or - xxx
  const lines = content.split('\n')
  const cleanLines: string[] = []
  let pastTitle = false
  let inFrontmatter = true
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    
    // First non-empty line is the title (starts with #)
    if (!pastTitle) {
      if (line.startsWith('# ')) {
        pastTitle = true
        cleanLines.push(line)
      } else if (line.trim() === '') {
        // Skip empty lines before title
        continue
      } else {
        // No title found, just pass through
        pastTitle = true
        cleanLines.push(line)
      }
      continue
    }
    
    // After title, check if we're still in frontmatter
    if (inFrontmatter) {
      // Stop at first heading (## or deeper) or any substantive content
      if (line.startsWith('## ') || line.startsWith('> ') || line.startsWith('```') || 
          (line.trim() && !line.match(/^(cato:|labels:|time:|- )/))) {
        inFrontmatter = false
        cleanLines.push(line)
      }
      // Otherwise skip frontmatter lines
    } else {
      cleanLines.push(line)
    }
  }
  
  return cleanLines.join('\n')
}

// Create unified processor for markdown -> HTML
const processor = unified()
  .use(remarkParse)
  .use(remarkDirective)
  .use(remarkFrontmatter)
  .use(remarkGfm)
  .use(remarkMath)
  .use(remarkRehype, { allowDangerousHtml: true })
  .use(rehypeRaw)
  .use(rehypeKatex)
  .use(rehypeFormat)
  .use(rehypeStringify)

async function precompileMarkdown() {
  const articlesDir = path.join(process.cwd(), 'public/articles')
  const outputDir = path.join(process.cwd(), 'public/precompiled')
  
  // Create output directory if it doesn't exist
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true })
  }

  const files = fs.readdirSync(articlesDir)
    .filter(file => file.endsWith('.md') && file !== 'template.md')

  console.log(`Precompiling ${files.length} markdown files to HTML...`)

  for (const file of files) {
    const inputPath = path.join(articlesDir, file)
    const outputPath = path.join(outputDir, file.replace('.md', '.html'))
    
    // Read markdown file
    let content = fs.readFileSync(inputPath, 'utf-8')
    
    // Remove frontmatter
    content = removeFrontmatter(content)
    
    // Normalize LaTeX delimiters
    content = normalizeLatexDelimiters(content)
    
    // Debug: log first 200 chars of processed content
    console.log(`  Processing: ${file}`)
    console.log(`    Content preview: ${content.slice(0, 100).replace(/\n/g, ' ')}...`)
    
    // Convert to HTML
    const html = await processor.process(content)
    
    // Write HTML file
    fs.writeFileSync(outputPath, html.toString())
    
    console.log(`  ✓ ${file} → ${path.basename(outputPath)}`)
  }

  console.log(`\nPrecompiled ${files.length} files to ${outputDir}`)
}

precompileMarkdown().catch(console.error)
