import React from 'react'
import { useDaoToken } from '@dao-auction/hooks/useDaoToken'

export default function TokenThumbnail({
  tokenId,
  daoAddress,
}: {
  daoAddress: string
  tokenId: string
}) {
  const [thumbnail, setThumbnail] = React.useState<undefined | string>()

  const { tokenData } = useDaoToken({
    daoAddress: daoAddress,
    tokenId: tokenId,
  })

  React.useEffect(() => {
    const image = tokenData?.metadata?.image
    if (image) {
      setThumbnail(image)
    }
  }, [tokenData])

  return (
    <div className="aspect-square relative w-11/12 m-auto bg-slate-50 rounded-2xl">
      {thumbnail ? (
        <img src={thumbnail} className="w-full h-full inset-0 rounded-2xl" />
      ) : (
        <></>
      )}
    </div>
  )
}
