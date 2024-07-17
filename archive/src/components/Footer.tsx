import Image from 'next/image'
import Link from 'next/link'
import React, { Fragment } from 'react'

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();

  return (
    <Fragment>
      <footer className='flex flex-row justify-between bg-pri p-3'>
        <div><Link href="/"><Image alt='Logo' src="/assets/images/logo-sec.webp" width={100} height={100} /></Link></div>
        <div>
          <ul className='flex flex-col text-right gap-3'>
            <li><Link className='text-white hover:text-slate-200' href="/">Home</Link></li>
            <li><Link className='text-white hover:text-slate-200' href="/about">About</Link></li>
            <li><Link className='text-white hover:text-slate-200' href="/posts">Posts</Link></li>
            <li><Link className='text-white hover:text-slate-200' href="/contact">Contact</Link></li>
          </ul>
        </div>
      </footer>
      <div className='bg-blue-700 text-white p-3 text-center'>
        <Link href="https://azaber.com/" target='_blank'>{currentYear} Azaber</Link>
      </div>
    </Fragment>
  )
}

export default Footer;
