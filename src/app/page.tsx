import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      {/* <h1 className="text-red-500 dark:text-blue-500">Dropbex React</h1> */}
      <div className="flex flex-col lg:flex-row items-center bg-[#2B2929] dark:bg-slate-800 ">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 space-y-5 text-white">
          <h1 className="text-5xl font-bold">
            Welcome to Dropbex. <br />
            <br />
            Storing everything for you and your business needs. All in one
            place.
          </h1>
          <p className="pb-20">
            Enhance your storage with Dropbex, offering a simple and efficient
            way to upload, organize, and access files from anywhere. Securely
            store important documents and media, and experience the convenience
            of easy file management and sharing in one centralized solution.
          </p>
          <Link
            className="flex cursor-pointer bg-blue-500 p-5 w-fit"
            href={"/dashboard"}
          >
            Try it for free!
            <ArrowRight className="ml-10" />
          </Link>
        </div>
        <div className="flex flex-col bg-[#1E1919] dark:bg-slate-800 p-10 h-full sjustify-center">
          <video autoPlay loop muted className="rounded-lg">
            <source
              src="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
              type="video/mp4"
            />
          </video>
        </div>
      </div>
      <p className="text-center font-bold text-xl pt-5">Disclaimer</p>
      <p className="text-center font-light p-2">
        This app was made for informational, educational, and testing purposes
        only. There is no commercial intention. The main goal of this app is to
        practice and demonstrate the latest features of Next.js. I do not own or
        affiliate with Dropbox or/and any of its subsidiaries in any form.
        Copyright disclaimer under section of the Copyright Act 1976, allowance
        is made for &quot;fair use&quot;
      </p>
    </main>
  );
}
