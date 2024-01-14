// "use client";

import { SignInButton, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { ThemeToggler } from "./ThemeToggler";

function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href={"/"} className="flex  items-center space-x-2">
        <div className="bg-[#0160FE] w-fit">
          <Image
            src={
              //   "https://upload.wikimedia.org/wikipedia/commons/7/78/Dropbox_Icon.svg"
              "https://upload.wikimedia.org/wikipedia/commons/4/44/Font_Awesome_5_brands_dropbox.svg"
            }
            alt={
              //   "Dropbox logo obtained from wikimedia commons: https://commons.wikimedia.org/wiki/File:Dropbox_Icon.svg"
              "Drop box logo obtained from wikimedia commons: https://commons.wikimedia.org/wiki/File:Font_Awesome_5_brands_dropbox.svg"
            }
            className="invert"
            height={50}
            width={50}
          />
        </div>
        <h1 className="font-bold text-xl">Dropbex-React</h1>
      </Link>
      <div className="px-5 flex space-x-2 items-center">
        {/* Theme toggler */}
        <ThemeToggler />
        <UserButton afterSignOutUrl="/" />
        {/* This controls the visiblitiy of the sigInButton: If the current user is signed out then render the SignInButton */}
        <SignedOut>
          {/* After the user signs in then redirect to the /dashboard url. */}
          <SignInButton afterSignInUrl="/dashboard" />
          {/* <p>Signed out</p> */}
        </SignedOut>
      </div>
    </header>
  );
}

export default Header;
