import React from 'react'

function Footer() {
  return (
    <div className='text-center pt-4 pb-6 backdrop-blur-lg'>
      &copy; {new Date().getFullYear()} TaskTarget. All rights reserved.
    </div>
  )
}

export default Footer
