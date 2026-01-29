# Article Metadata Format

The article index generation script automatically parses markdown files in the `public/articles/` directory. To ensure your articles are properly indexed with all metadata, follow this format:

## Format Specification

```markdown
# Article Title

cato: category-name

lables
- label1
- label2
- label3

time: 2024-01-15

<!--Here starts the main text-->

Your article content starts here. The first paragraph after the metadata will be used as the brief description in the index.

## Section Heading

More content...
```

## Metadata Fields

| Field        | Required | Format                           | Example                   |
| ------------ | -------- | -------------------------------- | ------------------------- |
| **Title**    | Yes      | `# Title` (Markdown H1)          | `# My Article`            |
| **Category** | No       | `cato: category-name`            | `cato: learning`          |
| **Labels**   | No       | List under `lables` heading      | `- learning`<br>`- guide` |
| **Time**     | No       | `time: YYYY-MM-DD` or any format | `time: 2024-01-15`        |
| **Brief**    | Auto     | First paragraph after metadata   | (Auto-extracted)          |
| **Length**   | Auto     | Calculated from file size        | (Auto-calculated in KB)   |

## Index Generation

**`public/articles/index.json`** - JSON export with article data
   - Contains interface definition and articles array

## Automatic Generation

Articles are indexed automatically when:
- Running `npm run gen:index`
- Building the project with `npm run build` (includes index generation)
- Deploying via GitHub Pages (workflow includes generation step)

## Notes

- The brief is auto-extracted as the first non-empty, non-metadata line
- Brief is truncated to 150 characters if longer
- File size is shown in KB
- Articles are sorted by filename
