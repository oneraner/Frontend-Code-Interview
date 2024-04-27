import Link from "next/link";
import { useState } from "react";

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className="relative bg-wall text-highLight p-1"
        onClick={() => setIsOpen(!isOpen)}
      >
        Menu
      </button>
      {isOpen ? (
        <nav className="absolute top-12 bg-white">
          <ul>
            <li className="p-2 hover:bg-highLight">
              <Link href="/" onClick={() => setIsOpen(false)}>
                Home
              </Link>
            </li>
            <li className="p-2 hover:bg-highLight">
              <Link href="/find-the-cheese" onClick={() => setIsOpen(false)}>
                Find The Cheese
              </Link>
            </li>
          </ul>
        </nav>
      ) : (
        <></>
      )}
    </>
  );
}
