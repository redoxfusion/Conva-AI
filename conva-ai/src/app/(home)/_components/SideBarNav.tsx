import { File, Layout, Search } from "lucide-react";
import Link from "next/link";
import React from "react";

interface SideBarNavProps {
  menuOpen: boolean;
}

const SideBarNav: React.FC<SideBarNavProps> = ({ menuOpen }) => {
  const navList = [
    {
      id: 1,
      name: "Browse",
      icon: Search,
      path: "/browse",
    },
    {
      id: 2,
      name: "dashboard",
      icon: Layout,
      path: "/dashboard",
    },
  ];

  const appList = [
    {
      id: 1,
      name: "document manager",
      icon: File,
      path: "/file_manager",
    },
  ];
  return (
    <div className="h-full bg-[#191919] text-[#EEEEEE] border-r flex flex-col shadow-md ">
      <div className="flex justify-center p-5 z-50">
        <img src="/Conva Ai Logo-01.png" alt="Logo" width={90} height={150} />
      </div>

      <div className="flex flex-col ms-7 gap-4  h-full">
        <div className="flex flex-col gap-3">
          { menuOpen && <h2>Navigation</h2>}
          <div className=" flex flex-col gap-2 ms-3">
            {navList.map((item, index) => (
              <Link href={item.path} className={`${menuOpen && 'flex gap-2'} p hover:text-[#cdcdcd]`} key={index}>
                <item.icon />
                <h2 className={`${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300 ease-in-out`}>{item.name}</h2>
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-3">
          { menuOpen && <h2>Apps</h2>}
          <div className=" flex flex-col gap-2 ms-3">
            {appList.map((item, index) => (
              <Link href={item.path} className={`${menuOpen && 'flex gap-2'} p hover:text-[#cdcdcd]`} key={index}>
                <item.icon />
                <h2 className={`${menuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'} transition-all duration-300 ease-in-out`}>{item.name}</h2>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBarNav;
