import type { NextPage } from 'next'
import * as React from 'react'
import EditerMd from '../../components/markdown-editor/EditerMarkdown'

const DAO: NextPage = () => {
  const [markdown, setMarkdown] = React.useState<string | undefined>('**Hello World!**')

  const saveMarkdown = async () => {
    try {
      await fetch(`/api/editor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="pt-6 flex flex-row gap-3 w-full" style={{ height: '80vh' }}>
      <button className="btn" onClick={saveMarkdown}>
        Save
      </button>
      <EditerMd value={markdown} setValue={setMarkdown} />
    </div>
  )
}

export default DAO
