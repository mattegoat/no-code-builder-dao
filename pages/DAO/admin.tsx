import type { NextPage } from 'next'
import * as React from 'react'
import EditerMd from '../../components/markdown-editor/EditerMarkdown'

const DAO: NextPage = () => {
  const [markdown, setMarkdown] = React.useState('')

  const handleChange = (value: string) => {
    setMarkdown(value)
  }
  return (
    <div className="pt-6 flex flex-row gap-3 w-full" style={{ height: '80vh' }}>
      <EditerMd />
    </div>
  )
}

export default DAO
