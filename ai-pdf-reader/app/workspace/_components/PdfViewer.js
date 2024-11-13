import React from 'react'

const PdfViewer = ({ fileUrl }) => {
  return (
    <div>
      <iframe src={fileUrl+"#toolbar=0"} height="90vh" width="100%" className='hidden md:block h-[100vh]'/>
    </div>
  )
}

export default PdfViewer
