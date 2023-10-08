"use client";

import { usePathname } from "next/navigation";

import { useAuth } from "../../state/AuthProvider";

interface INavbarContentRendererProps {
  editorNavigation: React.ReactNode;
  coreNavigation: React.ReactNode;
}

export default function NavbarContentRenderer({
  editorNavigation,
  coreNavigation,
}: INavbarContentRendererProps) {
  const { session } = useAuth();

  const pathname = usePathname();

  const isEditor = pathname?.includes("editor");
  const isAuthorizedContext = isEditor && !!session;

  return <>{isAuthorizedContext ? editorNavigation : coreNavigation}</>;
}
