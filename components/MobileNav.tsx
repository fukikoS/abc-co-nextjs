"use client"

import { useState, useSyncExternalStore } from "react"
import { createPortal } from "react-dom"
import Link from "next/link"
import { Menu, X } from "lucide-react"

// import { Button } from "@/components/ui/button"

type NavLink = {
  href: string
  label: string
}

export default function MobileNav({ links }: { links: NavLink[] }) {
  const [open, setOpen] = useState(false)

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )

  if (!isMounted) return null

  return (
    <div className="md:hidden z-500">
      <button
        className="relative"
        aria-label={open ? "メニューを閉じる" : "メニューを開く"}
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? <X width={32} height={32} /> : <Menu />}
      </button>

      {/* ヘッダーの backdrop-blur の影響を避けるため body 直下に描画する */}
      {typeof document !== 'undefined' &&
        createPortal(
          <>
            {/* 背景オーバーレイ（タップで閉じる） */}
            <div
              aria-hidden
              onClick={() => setOpen(false)}
              className={`fixed inset-0 z-60 bg-black/40 transition-opacity duration-300 ${
                open ? "" : "pointer-events-none opacity-0"
              }`}
            />

            {/* 右からスライドインするドロワー */}
            <nav
              className={`fixed inset-y-0 right-0 z-100 h-dvh w-72 max-w-[80%] border-l bg-background shadow-xl transition-transform duration-300 ease-out ${
                open ? "translate-x-0" : "translate-x-full"
              }`}
            >
              <button
                className="absolute right-2 top-3"
                aria-label="メニューを閉じる"
                onClick={() => setOpen(false)}
              >
                <X />
              </button>

              <ul className="flex flex-col gap-1 px-4 pt-16">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block rounded-md px-3 py-2 text-base font-medium hover:bg-accent hover:text-accent-foreground"
                      onClick={() => setOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </>,
          document.body
        )}
    </div>
  )
}
