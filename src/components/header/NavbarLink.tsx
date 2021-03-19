import Link from 'next/link';
import React, { useState } from 'react';

interface Props {
  href: string;
  children: string | JSX.Element | JSX.Element[];
  hoverClassName?: string;
  // hoverMenu?: {
  //   label: string;
  //   href: string;
  // }[];
}

const NavbarLink = ({ href, children, hoverClassName }: Props) => {
  // const [showHoverMenu, setShowHoverMenu] = useState(false);

  return (
    <Link href={href}>
      <a
        className={`relative h-16 text-gray-200 font-semibold px-2 md:px-4 text-sm lg:text-base lg:px-8 flex flex-col align-center justify-center hover:bg-gray-700 ${hoverClassName}`}
        // onMouseEnter={() => setShowHoverMenu(true)}
        // onMouseLeave={() => setShowHoverMenu(false)}
      >
        {children}
        {/* {showHoverMenu && hoverMenu ? (
          <div
            className={`absolute h-full w-full -bottom-full left-0 dark-gray flex flex-col align-center justify-center text-center`}
          >
            {hoverMenu.map((item) => (
              <Link href={item.href}>
                <a className={`${hoverClassName} `}>{item.label}</a>
              </Link>
            ))}
          </div>
        ) : (
          <></>
        )} */}
      </a>
    </Link>
  );
};

export default NavbarLink;
