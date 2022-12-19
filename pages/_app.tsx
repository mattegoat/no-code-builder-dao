import 'styles/globals.css'
import type { AppProps } from 'next/app'
import { AppWrapper, Header } from './../components'
import { Footer } from 'components/Footer'
import { DAO_ADDRESS } from '@dao-auction/config'
import { etherscanLink } from '@dao-auction/lib'

function NetLabel({ Component, pageProps }: AppProps) {
  return (
    <div data-theme="forest">
      <AppWrapper>
        <div className="w-12/12 md:11/12 lg:w-10/12 m-auto">
          <Header daoAddress={DAO_ADDRESS} />
          <main className="px-6">
            <Component {...pageProps} />
          </main>
        </div>
        <Footer />
      </AppWrapper>
    </div>
  )
}

export default NetLabel
