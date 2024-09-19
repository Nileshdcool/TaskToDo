import { NextPageContext } from "next";
import Link from "next/link";

interface ErrorProps {
  statusCode: number;
}

const Error = ({ statusCode }: ErrorProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
      <h1 className="text-6xl font-bold mb-4">{statusCode}</h1>
      <p className="text-2xl mb-8">
        {statusCode
          ? `An error ${statusCode} occurred on server`
          : "An error occurred on client"}
      </p>
      <Link href="/">
        <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
          Go Back Home
        </a>
      </Link>
    </div>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { statusCode };
};

export default Error;