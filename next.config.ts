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
            {
                source: "/",
                destination: "/frontPages/home"
            },
            {
                source: "/gioi-thieu",
                destination: "/frontPages/summaryItem"
            },
            {
                source: "/ve-chung-toi",
                destination: "/frontPages/aboutUsIntroduction"
            },
            {
                source: "/dich-vu/:path*",
                destination: "/frontPages/catalogItem/services/:path*"
            },
            {
                source: "/khoa-hoc/:path*",
                destination: "/frontPages/catalogItem/courses/:path*"
            },
            {
                source: "/san-pham/:path*",
                destination: "/frontPages/catalogItem/products/:path*"
            },
            {
                source: "/lien-he",
                destination: "/frontPages/contact"
            }
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
            {
                protocol: "https",
                hostname: "placehold.co",
            }
        ],
    },
    eslint: {
        ignoreDuringBuilds: true,
    },
};

export default nextConfig;
