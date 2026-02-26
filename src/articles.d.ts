interface Article {
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