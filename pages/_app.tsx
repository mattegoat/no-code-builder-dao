import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { AppWrapper, Header } from './../components'

function NetLabel({ Component, pageProps }: AppProps) {
  return (
    <AppWrapper>
      <div className="w-12/12 md:11/12 lg:w-10/12 m-auto">
        <Header daoAddress="0xd2E7684Cf3E2511cc3B4538bB2885Dc206583076" />
        <main className="px-6">
          <Component {...pageProps} />
        </main>
      </div>
    </AppWrapper>
  )
}

export default NetLabel
