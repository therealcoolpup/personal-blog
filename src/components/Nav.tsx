import React from 'react'
import Link from 'next/link'
import Image from 'next/image'

const Nav = () => {
  return (
    <nav className='p-3'>
      <ul className='flex flex-row justify-between items-center h-16'>
      <div>
        <li>
          <Link href="/">
            <Image
            className='object-contain'      
              src="/assets/images/logo.webp"
              alt="Logo"
              width={100}
              height={100}
            />
          </Link>
        </li>
      </div>
      <div className='flex flex-row gap-4 items-center'>
        <li><Link href="/about">About</Link></li>
        <li><Link href="/posts">Posts</Link></li>
        <li className='btn-sec'><Link href="/contact">Contact</Link></li>
      </div>
      </ul>
    </nav>
  )
}

export default Nav