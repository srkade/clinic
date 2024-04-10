import Image from 'next/image'
import React from 'react'

function Header() {
    const Menu=[
        {
            id:1,
            name:'Home',
            path:'/'
        },
        {
            id:1,
            name:'Home',
            path:'/'
        },
        {
            id:1,
            name:'Home',
            path:'/'
        },
        {
            id:1,
            name:'Home',
            path:'/'
        }
    ]
  return (
    <div>
        <Image src='logo.svg' alt='logo' width={180} height={80} />
    </div>
  )
}

export default Header