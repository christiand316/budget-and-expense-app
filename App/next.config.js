/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXTAUTH_URL: "https://budget-app2324-9f87dae227a5.herokuapp.com/api/auth",
    NEXTAUTH_SECRET: "42baf80f-68a2-421e-ba6c-de686b475548="
  }
}

module.exports = nextConfig
