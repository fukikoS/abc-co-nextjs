import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-5xl px-4 py-6">
        <p className="text-center text-sm text-muted-foreground">
          &copy; {year}{" "}
          <Link
            href="/"
            className="font-medium text-foreground underline-offset-4 transition-colors hover:underline"
          >
            News Site
          </Link>
        </p>
      </div>
    </footer>
  );
}
