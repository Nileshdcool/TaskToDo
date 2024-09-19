import Link from "next/link";

const Custom404 = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-900">
            <h1 className="text-6xl font-bold mb-4">404</h1>
            <p className="text-2xl mb-8">Page Not Found</p>
            <Link href="/" legacyBehavior>
                <a className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition">
                    Go Back Home
                </a>
            </Link>
        </div>
    );
};

export default Custom404;