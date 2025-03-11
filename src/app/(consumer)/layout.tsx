import { ReactNode, Suspense } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { UserButton, SignedIn, SignedOut } from "@clerk/nextjs";

export default function ConsumerLayout({
  children,
}: Readonly<{ children: ReactNode }>) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function Navbar() {
  return (
    <header className="flex h-15 shadow bg-background z-10">
      <nav className="flex gap-4 container px-2">
        <Link
          className="hover:bg-accent/10 pr-2 mr-auto text-lg items-center flex"
          href="/"
        >
          Course Product
        </Link>
        <Suspense>
          <SignedIn>
            <AdminLink />

            <Link
              className="hover:bg-accent/10 mr-auto text-lg items-center px-2 flex"
              href="/courses"
            >
              My Courses
            </Link>
            <Link
              className="hover:bg-accent/10 mr-auto text-lg items-center px-2 flex"
              href="/purchases"
            >
              Purchase History
            </Link>
            <div className="size-8 self-center">
              <UserButton appearance={{ elements: { userButtonAvatarBox: { width: "100%", height: "100%" } } }} />
            </div>
          </SignedIn>
        </Suspense>
        <Suspense>
          <SignedOut>
            <Button className="self-center" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </Suspense>
      </nav>
    </header>
  );
}


async function AdminLink() {
  return <Link
    className="hover:bg-accent/10 mr-auto text-lg items-center px-2 flex"
    href="/admin"
  >
    Admin
  </Link>
}
