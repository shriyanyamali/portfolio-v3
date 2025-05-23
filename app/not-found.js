import Link from "next/link";
import Head from "next/head";

const NotFound = () => {
  return (
    <>
      <Head>
        <title>404 | Page Not Found - Shriyan Yamali</title>
        <meta
          name="404 Page for Shriyan Yamali's Personal Website"
          content="404, found, not, page"
        />
      </Head>
      <main className="font-mono grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
        <div className="text-center">
          <p className="text-2xl font-semibold text-indigo-600">404</p>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-gray-900 sm:text-7xl">
            Page not found
          </h1>
          <p className="mt-6 text-lg font-medium text-pretty text-gray-500 sm:text-xl/8">
            Sorry, we couldn’t find the page you’re looking for.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/"
              className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-lg font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Go back home
            </a>
            <a href="mailto:yamalishriyan@gmail.com" className="text-lg font-semibold text-gray-900">
              Contact me <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </div>
      </main>
    </>
  );
};

export default NotFound;
