import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { AppWrapper, Header } from './../components'

function NetLabel({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <div className="w-11/12 lg:w-10/12 m-auto">
        <Header />
        <main className="px-6">
          <Component {...pageProps} />
        </main>
      </div>
    </AppWrapper>
  )
}

export default NetLabel
