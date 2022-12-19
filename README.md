# Create DAO House

![gif](./public/template.gif)

A repo to bootstrap your Nouns Builder DAO's website.

Here are 2 DAO site examples using this template:

## Features

1. uses [NextJS](https://nextjs.org/); Server-Side Rendering
2. uses `Typescript`
3. uses [Tailwind](https://tailwindcss.com/) for styling with [DaisyUI](https://daisyui.com/)
4. uses [wagmi](https://wagmi.sh/) + [rainbowkit](https://www.rainbowkit.com/)

## Getting Started

The application accepts the below environment variables, you WILL need to specify the network ID along with either a Curator ID or a Contract Address:

### ENV VARS:

```bash
NEXT_PUBLIC_INFURA_API_KEY=
```

## Develop

First, run the development server:

```bash
yarn && yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

You can start editing the styling by modifying `styles/globals.css`. More detailed guide coming soon.

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Or click the button below:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fmattegoat%2Fno-code-builder-dao&env=NEXT_PUBLIC_INFURA_KEY&project-name=no-code-nounish&repository-name=no-code-nounish-repo&redirect-url=https%3A%2F%2Fdaobuilder.website)

...Don't forget to add the necessary environment variables!
