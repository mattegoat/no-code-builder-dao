import type { NextPage } from 'next'
import * as React from 'react'
import MarkdownEditor from '../../components/MarkdownEditor'

const DAO: NextPage = () => {
  const [markdown, setMarkdown] = React.useState('')

  const handleChange = (value: string) => {
    setMarkdown(value)
  }
  return (
    <div className="pt-6 flex flex-row gap-3 w-full" style={{ height: '80vh' }}>
      <MarkdownEditor value={markdown} onChange={handleChange} />
    </div>
  )
}

export default DAO
