import React from 'react'

export function Status({ proposalStatus }: { proposalStatus: string }) {
  return (
    <div>
      {proposalStatus === 'Succeeded' && (
        <div className="badge badge-success p-3 my-auto font-bold">{proposalStatus}</div>
      )}
      {proposalStatus === 'Executed' && (
        <div className="badge badge-info p-3 my-auto font-bold">{proposalStatus}</div>
      )}
      {proposalStatus === 'Queued' && (
        <div className="badge badge-neutral p-3 my-auto font-bold">{proposalStatus}</div>
      )}
      {proposalStatus === 'Defeated' && (
        <div className="badge badge-error p-3 my-auto font-bold">{proposalStatus}</div>
      )}
      {proposalStatus === 'Vetoed' && (
        <div className="badge badge-error p-3 my-auto font-bold">{proposalStatus}</div>
      )}
      {proposalStatus === 'Cancelled' && (
        <div className="badge badge-neutral p-3 my-auto font-bold">{proposalStatus}</div>
      )}
      {proposalStatus === 'Expired' && (
        <div className="badge badge-neutral p-3 my-auto font-bold">{proposalStatus}</div>
      )}
      {proposalStatus === 'Active' && (
        <div className="badge badge-success p-3 my-auto font-bold">{proposalStatus}</div>
      )}
      {proposalStatus === 'Pending' && (
        <div className="badge badge-success p-3 my-auto font-bold">{proposalStatus}</div>
      )}
    </div>
  )
}
