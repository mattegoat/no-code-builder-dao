import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useState } from 'react'
import Image from 'next/image'
import logo from '../public/favicon.png'
import { pages } from '../config.js'

const DisconnectButton = dynamic(() => import('./elements/DisconnectButton'), {
  ssr: false,
})

export function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className=" ">
      <nav className="flex items-center justify-between flex-wrap p-3">
        <div
          className="flex items-center flex-shrink-0 text-white mr-6"
          style={{ cursor: 'pointer' }}>
          <Link href="/">
            <Image src={logo} />
          </Link>
        </div>
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="btn btn-circle btn-primary swap swap-rotate">
            <svg
              className="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512">
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>
          </button>
        </div>
        <div
          className={`${
            isOpen ? 'block' : 'hidden'
          } w-full block flex-grow lg:flex lg:items-center lg:w-auto`}>
          <div className="lg:flex-grow pb-4 lg:pb-0">
            {pages.map((page) => (
              <a href="#" className="block mt-5 lg:inline-block lg:mt-0  mr-4">
                <button className="btn btn-ghost">{page.title}</button>
              </a>
            ))}
          </div>
          <div className="grid gap-3 grid-cols-2	">
            <button className="btn btn-outline btn-secondary">Treasury Ξ 100 ETH</button>
            <button className="btn btn-primary">Connect</button>
          </div>
        </div>
      </nav>
    </div>
    // <header classNameNameNameNameNameNameName="flex flex-col justify-center md:flex-row md:justify-between md:items-center w-full px-6 gap-2">
    //   <Navigation />
    //   <div classNameNameNameNameNameNameName="relative">
    //     <DisconnectButton />
    //   </div>
    // </header>
  )
}
