import { Spinner } from '@nextui-org/react'
import React from 'react'

const loading = () => {
  return (
    <div className='w-screen h-screen text-center justify-center flex'>
      <Spinner size="lg" />
    </div>
  )
}

export default loading