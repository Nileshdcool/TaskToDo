import { ReactNode } from "react";
import Logo from "../Logo";

interface LayoutProps {
    children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-blue-600 text-white p-4 flex items-center">
                <Logo />
            </header>
            <main className="flex-grow p-8">{children}</main>
            <footer className="bg-blue-600 text-white p-4 text-center">
                <p>&copy; 2024 My Todo App</p>
            </footer>
        </div>
    );
};

export default Layout;