import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-white">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <div className="space-y-2 text-center text-sm text-muted-foreground">
          <p>
            &copy; {year}{" "}
            <Link
              href="/"
              className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
            >
              ABC Co.
            </Link>
          </p>
          <nav aria-label="Legal links">
            <ul className="flex items-center justify-center gap-4">
              <li>
                <Link
                  href="/privacypolicy"
                  className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  プライバシーポリシー
                </Link>
              </li>
              <li aria-hidden className="select-none text-border">
                |
              </li>
              <li>
                <Link
                  href="/terms"
                  className="underline-offset-4 transition-colors hover:text-foreground hover:underline"
                >
                  利用規約
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
