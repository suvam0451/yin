/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        // formats: ["image/avif", "image/webp"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "*",
                port: "",
                pathname: "/image/upload/**",
            },
        ],
    },
    compiler: {
        styledComponents: true,
    },
}

export default nextConfig;
