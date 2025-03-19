"use client";
import * as authenticationService from "@/services/authenticationService";

export default function TestingAuthenticationComponent() {
    const handleClick = async () => {
        console.log(await authenticationService.checkAuthenticationStatusAsync());
    };

    return (
        <button className="btn btn-primary" onClick={handleClick}>
            Check
        </button>
    );
}