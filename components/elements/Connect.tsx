import { ConnectButton as RKConnectButton } from '@rainbow-me/rainbowkit'
import { Avatar } from './Avatar'

export function Connect({
  connectCopy,
  ...props
}: {
  connectCopy?: string | JSX.Element
}) {
  return (
    <div className="relative" {...props}>
      <RKConnectButton.Custom>
        {({ account, chain, openAccountModal, openConnectModal, mounted }) => {
          return (
            <>
              {(() => {
                if (!mounted || !account || !chain) {
                  return (
                    <button className="btn btn-primary" onClick={openConnectModal}>
                      {connectCopy ? connectCopy : 'Connect Wallet'}
                    </button>
                  )
                }
                if (chain.unsupported) {
                  return (
                    <button className="btn btn-primary">&#x26A0; Wrong Network</button>
                  )
                }
                return (
                  <button className="btn btn-primary" onClick={openAccountModal}>
                    <div className="flex items-center gap-2 text-sm">
                      <Avatar />
                      {account.displayName}
                    </div>
                  </button>
                )
              })()}
            </>
          )
        }}
      </RKConnectButton.Custom>
    </div>
  )
}
