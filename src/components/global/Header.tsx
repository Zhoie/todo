import React from 'react'

interface HeaderProps {
    label?: string;
}

export default function Header({label}: HeaderProps) {
  return (
    <div className='mt-2 mx-2 border-b-4 border-black font-semibold text-4xl md:text-5xl lg:text-6xl duration-500 '>
        <h1>
            {label}
        </h1>
    </div>
  )
}
