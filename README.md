# Recruma - AI-Powered Resume Builder

Recruma is a modern, AI-powered resume builder that helps you create professional resumes that stand out. Built with Next.js and featuring beautiful templates, our platform combines cutting-edge design with intelligent optimization.

## Features

- 🎨 **Professional Templates** - Choose from a variety of beautifully designed templates
- 🤖 **AI-Powered Optimization** - Our AI analyzes job descriptions and optimizes your resume
- 📱 **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- ⚡ **Instant Download** - Get your resume in PDF format ready to send
- 🎯 **ATS-Friendly** - All templates are optimized for Applicant Tracking Systems

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Tech Stack

- **Framework**: Next.js 15
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Animations**: Lottie Files
- **Language**: TypeScript

## Project Structure

```
src/
├── app/                 # Next.js app directory
│   ├── layout.tsx      # Root layout
│   ├── page.tsx        # Home page
│   └── globals.css     # Global styles
├── components/          # React components
│   ├── navbar.tsx      # Navigation component
│   └── HeroSection.tsx # Hero section component
└── public/             # Static assets
    ├── animations/     # Lottie animations
    └── template*.png   # Resume templates
```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
