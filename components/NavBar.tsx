import Link from "next/link";
import { useRouter } from "next/router";

export default function NavBar() {
  const router = useRouter();
  return (
    <nav>
      <Link
        href="/"
        style={{ color: router.pathname === "/" ? "pink" : "skyblue" }}
      >
        Home
      </Link>
      <Link
        href="/about"
        style={{ color: router.pathname === "/about" ? "pink" : "skyblue" }}
      >
        About
      </Link>
    </nav>
  );
}
