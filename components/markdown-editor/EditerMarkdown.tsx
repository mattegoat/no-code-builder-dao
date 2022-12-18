import '@uiw/react-md-editor/markdown-editor.css'
import '@uiw/react-markdown-preview/markdown.css'
import dynamic from 'next/dynamic'
import classes from './styles.module.css'
import logo from '/public/favicon.png'
import Image from 'next/image'

const MDEditor = dynamic(
  () => import('@uiw/react-md-editor').then((mod) => mod.default),
  { ssr: false }
)
const EditerMarkdown = dynamic(
  () =>
    import('@uiw/react-md-editor').then((mod) => {
      return mod.default.Markdown
    }),
  { ssr: false }
)

function EditerMd({ value, setValue }: { value: string | undefined; setValue: any }) {
  return (
    <div data-color-mode="dark" className="w-full flex flex-row gap-4">
      <MDEditor
        value={value}
        preview="edit"
        onChange={setValue}
        style={{ width: '100%', height: '100%', minHeight: '100%' }}
      />
      <div className="mockup-window border border-base-300 w-full">
        <div className="flex flex-col p-4 border-t border-base-300 gap-4">
          <div className="w-full ">
            <nav className="flex items-center justify-between flex-wrap p-3">
              {' '}
              <div
                className="flex items-center flex-shrink-0 text-white mr-6"
                style={{ cursor: 'pointer', height: '60px', width: '60px' }}>
                <Image src={logo} alt="logo" />
              </div>
              <button className="btn btn-circle btn-primary swap swap-rotate">
                <svg
                  className="swap-off fill-current"
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 512 512">
                  <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
                </svg>
              </button>
            </nav>
          </div>
          <EditerMarkdown className={classes.markdown} source={value} />
        </div>
      </div>
    </div>
  )
}

export default EditerMd
