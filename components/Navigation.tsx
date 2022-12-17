import Link from 'next/link'
import { useRouter } from 'next/router'
import testlogo from '../public/social-card.png'
import Image from 'next/image'
import { pages } from '../config.js'
import { useTreasuryBalance } from '@dao-auction/hooks/useTreasuryBalance'

export function Navigation({ daoAddress }: { daoAddress: string }) {
  const router = useRouter()

  const treasuryBalance = useTreasuryBalance()

  return (
    <nav className="flex flex-row items-center gap-8">
      <div className="flex flex-row gap-4">
        <Link passHref href={'/'} key={'/'}>
          <Image
            src={testlogo}
            width="60px"
            height={'60px'}
            style={{ cursor: 'pointer' }}
            alt="logo"
          />
        </Link>
        <button className="h-10 m-auto px-4 bg-transparent font-semibold border rounded-lg hover:opacity-60  active:translate-y-0">
          Treasury Ξ {treasuryBalance.toString()}
        </button>
        {pages.map((page) => (
          <Link passHref href={page.slug} key={page.slug}>
            <button className="h-10 m-auto py-2 px-4 bg-transparent font-semibold border rounded-md hover:opacity-60  active:translate-y-0">
              {page.title}
            </button>
          </Link>
        ))}
      </div>
    </nav>
  )
}
