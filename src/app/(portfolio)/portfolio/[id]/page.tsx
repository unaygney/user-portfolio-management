import React from 'react'

export default function PortfolioPage({ params }: { params: { id: string } }) {
  return <div>portfolio : {params.id}</div>
}
