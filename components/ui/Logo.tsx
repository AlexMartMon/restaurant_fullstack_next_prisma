import Image from 'next/image'
import React from 'react'

export default function Logo() {
  return (
    <div className='flex justify-center mt-5'>
        <div className='relative w-32 h-32'>
            <Image  fill alt='Logo' src={`/logo.svg`}/>
        </div>
    </div>
  )
}
