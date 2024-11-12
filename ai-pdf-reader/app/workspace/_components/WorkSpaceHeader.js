import { UserButton } from '@clerk/nextjs'
import React from 'react'

const WorkSpaceHeader = ({ fileName }) => {
  return (
    <div className='p-4 flex justify-between shadow-md'>
      <h2 className="text-xl font-bold">Ai-PDF-reader</h2>
      <h2 className="text-xl font-normal">File Name : {fileName}</h2>
      <UserButton />
    </div>
  )
}

export default WorkSpaceHeader
