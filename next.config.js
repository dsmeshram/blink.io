/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['play-lh.googleusercontent.com'],
    },
    env :{
        LINKEDIN_REDIRECT: process.env.LINKEDIN_REDIRECT,
        LINKEDIN_CLIENT_ID: process.env.LINKEDIN_CLIENT_ID,
        JWT_SECRET:  process.env.JWT_SECRET
    }
}

module.exports = nextConfig
