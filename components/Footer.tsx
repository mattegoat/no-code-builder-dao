import { DAO_ADDRESS } from '@dao-auction/config'
import { etherscanLink } from '@dao-auction/lib'
import { DISCORD_LINK, TWITTER_HANDLE } from 'utils'

export function Footer() {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-24 w-full">
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        <a
          href={`https://twitter.com/${TWITTER_HANDLE}`}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-md">
          Twitter
        </a>
        <a
          href={etherscanLink({ linkType: 'address', hash: DAO_ADDRESS })}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-md">
          Etherscan
        </a>
        <a
          href={`https://discord.com/${DISCORD_LINK}`}
          target="_blank"
          rel="noreferrer"
          className="font-semibold text-md">
          Discord
        </a>
      </div>
    </footer>
  )
}
