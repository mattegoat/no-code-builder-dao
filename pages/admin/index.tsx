import { ADMIN_ADDRESS } from '@dao-auction/config'
import { useAuth } from 'hooks/useAuth'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useAccount } from 'wagmi'
import EditerMd from '../../components/markdown-editor/EditerMarkdown'

const Admin: NextPage = () => {
  const [markdown, setMarkdown] = React.useState<string | undefined>('**Hello World!**')

  const { address, isConnected } = useAccount()
  const router = useRouter()

  React.useEffect(() => {
    // checks if the user is authenticated
    if (address !== ADMIN_ADDRESS) router.push('/')
  }, [address, router])

  const saveMarkdown = async () => {
    try {
      await fetch(`/api/editor`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ markdown }),
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className="pt-6 flex flex-row gap-3 w-full" style={{ height: '80vh' }}>
      <button className="btn" onClick={saveMarkdown}>
        Save
      </button>
      <EditerMd value={markdown} setValue={setMarkdown} />
    </div>
  )
}

export default Admin
