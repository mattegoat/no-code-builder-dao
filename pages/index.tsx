import type { NextPage } from 'next'
import { Seo } from 'components'
import dynamic from 'next/dynamic'
import useSWR from 'swr'
import { useEffect } from 'react'
import classes from './styles.module.css'
import ReactMarkdown from 'react-markdown'
import remarkBreaks from 'remark-breaks'

/*
const CurrentAuction = dynamic(() => import('../@dao-auction/components/CurrentAuction'), {
  ssr: false,
})
*/
const TokenExplorer = dynamic(() => import('../@dao-auction/components/TokenExplorer'), {
  ssr: false,
})

const fetcher = (url: any) => fetch(url).then((res) => res.json())

const Home: NextPage = () => {
  const { data, error } = useSWR('/api/staticdata', fetcher)

  const EditerMarkdown = dynamic(
    () =>
      import('@uiw/react-md-editor').then((mod) => {
        return mod.default.Markdown
      }),
    { ssr: false }
  )

  useEffect(() => {
    console.log(data)
  }, [data])

  //Handle the error state
  if (error) return <div>Failed to load</div>
  //Handle the loading state
  if (!data) return <div>Loading...</div>

  return (
    <>
      <Seo />
      <section id="current-auction" className="pt-10">
        <TokenExplorer daoAddress="0xd2E7684Cf3E2511cc3B4538bB2885Dc206583076" />
      </section>
      <section id="custom-content" className="pt-10">
        <div className={classes.markdown}>
          {/* <ReactMarkdown remarkPlugins={[remarkBreaks]}>
            {data?.markdown.replace(/\n/gi, '&nbsp; \n')}
          </ReactMarkdown> */}
          <EditerMarkdown className={classes.markdown} source={data?.markdown} />
        </div>
      </section>
    </>
  )
}

export default Home
