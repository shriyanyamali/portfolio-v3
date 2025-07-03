import Link from "next/link";
import Head from "next/head";

export default function NotFound() {
  return (
    <>
      <Head>
        <title>404 | Page Not Found - Shriyan Yamali</title>
        <meta
          name="description"
          content="404 Page for Shriyan Yamali's Personal Website"
        />
      </Head>
      <main className="font-mono grid min-h-screen place-items-center bg-neutral-900 px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center bg-neutral-800 rounded-2xl p-10 shadow-lg">
          <p className="text-4xl font-bold text-blue-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-white sm:text-7xl">
            Page Not Found
          </h1>
          <p className="mt-6 text-lg text-gray-300 sm:text-xl">
            I&apos;m sorry, Dave. I&apos;m afraid I can&apos;t display that.
          </p>

          <div className="mt-8 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-blue-600 px-3.5 py-2.5 text-base sm:text-lg font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a
              href="mailto:yamalishriyan@gmail.com"
              target="_blank"
              className="text-lg font-semibold text-white hover:underline"
            >
              Contact me <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
}
