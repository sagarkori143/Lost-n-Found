import Link from 'next/link'
import React from 'react'

function page() {
  return (
    <div>
        <h1><Link href='/signin'>signin</Link></h1>
        <h1><Link href='/signup'>signup</Link></h1>
    </div>
  )
}

export default page