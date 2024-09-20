import { MESSAGES } from "@/constants/messages";
import React from "react";

const Logo = () => {
    return (
        <div className="flex items-center">
            <img src="/logo.jpg" alt="Logo" className="h-8 w-8 mr-2" />
            <span className="text-xl font-bold">{MESSAGES.APP_NAME}</span>
        </div>
    );
};

export default Logo;