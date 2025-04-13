"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const pathname = usePathname()

  return (
    <nav className="flex gap-4 px-12 py-4 fixed bg-gray-300 w-full">
      <Link href="/" className={pathname === "/" ? "font-bold" : undefined}>
        Início
      </Link>
      <Link
        href="/pesquisa"
        className={pathname === "/pesquisa" ? "font-bold" : undefined}
      >
        Pesquisa
      </Link>
    </nav>
  )
}
