import * as React from 'react'
import ReactMarkdown from 'react-markdown'

interface MarkdownEditorProps {
  value: string
  onChange: (value: string) => void
}

const MarkdownEditor: React.FC<MarkdownEditorProps> = ({ value, onChange }) => {
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange(event.target.value)
  }

  return (
    <div className="pt-6 flex flex-row gap-3 w-full">
      <div className="mockup-window border border-base-300 w-1/2">
        <div
          className="flex justify-center border-t border-base-300"
          style={{ height: '80%' }}>
          <textarea
            className="textarea textarea-bordered w-full h-full"
            placeholder="Type here"
            value={value}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="mockup-window border border-base-300 w-1/2">
        <div className="flex p-4 border-t border-base-300">
          <ReactMarkdown>{value}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default MarkdownEditor
