export function Footer({
  twitter,
  discord,
  etherscan,
}: {
  twitter: string
  discord: string
  etherscan: string
}) {
  return (
    <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-24 w-full">
      <div className="flex flex-col sm:flex-row gap-4 p-5">
        <a href="twitter" className="font-semibold text-md">
          Twitter
        </a>
        <a href="etherscan" className="font-semibold text-md">
          Etherscan
        </a>
        <a href="discord" className="font-semibold text-md">
          Discord
        </a>
      </div>
    </footer>
  )
}
