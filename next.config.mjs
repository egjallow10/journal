/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
      return [
        {
          source: "/api/:path*", // Apply these headers to all API routes
          headers: [
            {
              key: "Access-Control-Allow-Origin",
              value: "*", // Replace with your specific origin if needed
            },
            {
              key: "Access-Control-Allow-Methods",
              value: "GET, POST, PUT, DELETE, OPTIONS",
            },
            {
              key: "Access-Control-Allow-Headers",
              value: "Content-Type, Authorization",
            },
          ],
        },
      ];
    },
  };
  
  export default nextConfig;
  