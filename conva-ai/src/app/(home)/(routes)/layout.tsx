"use client"

import React, { useState } from 'react'
import SideBarNav from '../_components/SideBarNav';
import Nav from '../_components/Nav';

function Homelayout({
    children,
  }: Readonly<{children: React.ReactNode;}>) {
    const [menuOpen, setMenuOpen] = useState(false);

    const onClickMenu = () => {
      setMenuOpen((prev) => !prev);
    }

  return (
    <div>
        <div className={`h-full ${menuOpen ? 'w-64' : 'w-28'} transition-all ease-in-out duration-300 flex-col fixed inset-y-0 z-50`}>
            <SideBarNav menuOpen={menuOpen} />
        </div>
        <div className={`${menuOpen ? 'ml-64' : 'ml-28'} transition-all ease-in-out duration-300 p-3`}>
          <Nav menuOpen={menuOpen} onClickMenu={onClickMenu} />
        </div>
     {children}
    </div>
  )
}

export default Homelayout
