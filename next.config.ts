import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    allowedDevOrigins: ["frontend-workstation.khanhhuy.dev", "frontend.khanhhuy.dev"],
    async rewrites() {
        return [
            {
                source: "/api/:path*",
                destination: "http://localhost:5000/api/:path*",
            },
            {
                source: "/images/:path*",
                destination: "http://localhost:5000/images/:path*",
            },
        ];
    },
    images: {
        remotePatterns: [
            {
                protocol: "http",
                hostname: "localhost",
                port: "5000",
                pathname: "/images/**",
                search: "",
            },
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
