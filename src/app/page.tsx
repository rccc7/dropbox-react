import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      {/* <h1 className="text-red-500 dark:text-blue-500">Dropbex React</h1> */}
      <div className="flex flex-col lg:flex-row items-center bg-[#2B2929] dark:bg-slate-800 ">
        <div className="p-10 flex flex-col bg-[#2B2929] dark:bg-slate-800 space-y-5 text-white">
          <h1 className="text-4xl font-bold">
            Welcome to Dropbox-React. <br />
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
          <div className="flex flex-row justify-start gap-x-2 items-center">
            <Link
              className="flex cursor-pointer bg-blue-500 p-5 w-fit"
              href={"/dashboard"}
            >
              Try it for free!
              <ArrowRight className="ml-10" />
            </Link>
            <h1 className="text-xs w-44">
              Sign in securely using your Google account or email.{" "}
              <a
                href="https://clerk.com/"
                target="_blank"
                className="text-blue-500 underline"
              >
                Secured by Clerk
              </a>
              .
            </h1>
          </div>
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
      <p className="text-center font-light text-sm p-2">
        This app was made for informational, educational, and testing purposes
        only. There is no commercial intention. The main goal of this app is to
        practice and demonstrate the latest features of Next.js. I do not own or
        affiliate with Dropbox or/and any of its subsidiaries in any form.
        Copyright disclaimer under section of the Copyright Act 1976, allowance
        is made for &quot;fair use&quot;.{" "}
      </p>
      <p className="text-center text-sm font-light p-2">
        <span className="font-bold">Important notice:</span> When you log in, we
        do not get personal information except of your user name, name, and
        email for a personalized UI interaction.
      </p>
      <p className="text-center text-sm">
        Dropbox logo obtained from Wikimedia Commons and video from{" "}
        <a
        // className="text-blue-500 underline"
        // href="https://aem.dropbox.com/cms/content/dam/dropbox/warp/en-us/overview/lp-header-graphite200-1920x1080.mp4"
        >
          Dropbox site.
        </a>
      </p>
      <p className="text-center text-sm p-2">
        THIS IS NOT THE OFFICIAL DROPBOX. THIS IS A REACTJS DEMO APP FOR TESTING
        AND DEMONSTRATION PURPOSES ONLY.
      </p>
    </main>
  );
}
