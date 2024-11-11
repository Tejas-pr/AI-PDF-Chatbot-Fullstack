import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Header = () => {
  return (
    <div className='flex justify-end p-5 shadow-sm'>
      <UserButton />
    </div>
  )
}

export default Header
