import Link from "next/link";

interface Props {
  href: string;
  children: string | JSX.Element | JSX.Element[];
  hoverClassName?: string;
}

const NavbarLink = ({ href, children }: Props) => {
  return (
    <Link
      href={href}
      className={
        "relative h-16 text-gray-200 font-semibold px-2 md:px-4 text-sm lg:text-base lg:px-8 flex flex-col align-center justify-center hover:bg-blue-200 hover:bg-opacity-10"
      }
    >
      {children}
    </Link>
  );
};

export default NavbarLink;
