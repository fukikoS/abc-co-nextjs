import Link from "next/link"

import MobileNav from "@/components/MobileNav"


const navLinks = [
  { href: "/company", label: "Company" },
  { href: "/service", label: "Service" },
  { href: "/updates", label: "Updates" },
  { href: "/blog", label: "Blog" },
  { href: "/recruit", label: "Recruit" },
  { href: "/contact", label: "Contact" },
]

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 shadow backdrop-blur ">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="font-black text-3xl">
          <span className="text-main-blue">ABC Co.</span>
        </Link>

        <nav className="hidden md:flex">
          <ul className="flex gap-4">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="underline-animation">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <MobileNav links={navLinks} />
      </div>
    </header>
  )
}
