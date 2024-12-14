import { UserButton } from '@clerk/nextjs'
import { Bell, Ellipsis, EllipsisVertical, MoonStar } from 'lucide-react'
import React from 'react'

interface NavProps {
  onClickMenu: () => void;
  menuOpen: boolean;
}

const Nav: React.FC<NavProps> = ({ onClickMenu, menuOpen }) => {
  return (
    <div className='flex items-center gap-3'>
      <button onClick={onClickMenu} className='cursor-pointer'>{ menuOpen ? <Ellipsis size={36} /> : <EllipsisVertical size={36} />}</button>
      <div className='flex justify-between items-center px-3 w-full'>
        <input type="text" placeholder='Search' className='bg-[#e8e8e8] p-2 rounded-md' />
        <div className='flex gap-5'>
          <button className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300'><Bell /></button>
          <button className='transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover: duration-300'><MoonStar /></button>
          <UserButton />
        </div>
      </div>
    </div>
  )
}

export default Nav
