# Places in Abuja

A Next.js 14+ application showcasing places, restaurants, parks, and events in Abuja, Nigeria. Built with TypeScript, Tailwind CSS, and the App Router.

## Features

- 🏙️ **Places Discovery**: Find restaurants, parks, events, and hidden gems in Abuja
- 📝 **Blog Posts**: Detailed reviews and guides about places in Abuja
- 🎨 **Modern UI**: Built with Tailwind CSS and Framer Motion
- 📱 **Responsive**: Mobile-first design that works on all devices
- ⚡ **Fast**: Built with Next.js 14+ App Router for optimal performance
- 🔍 **SEO Optimized**: Built-in SEO features and sitemap generation

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: Version 18.17.0 or later
- **npm**: Version 9.0.0 or later

### Check Your Node.js Version

```bash
node -v
```

If you don't have Node.js installed or need to update, visit [nodejs.org](https://nodejs.org/) to download the latest LTS version.

## Quick Start

1. **Clone the repository** (if not already done):
   ```bash
   git clone <repository-url>
   cd places-in-abuja
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```

4. **Open your browser** and navigate to [http://localhost:3000](http://localhost:3000)

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Run ESLint for code quality
- `npm run test` - Run Jest tests
- `npm run type-check` - Run TypeScript type checking

## Troubleshooting

### "next is not recognized" Error

If you encounter the error `'next' is not recognized as an internal or external command`, follow these steps:

1. **Ensure dependencies are installed**:
   ```bash
   npm install
   ```

2. **Check if node_modules exists**:
   ```bash
   ls node_modules  # On Unix/Mac
   dir node_modules  # On Windows
   ```

3. **Try using npx as a fallback**:
   ```bash
   npx next dev
   ```

4. **Clear npm cache and reinstall**:
   ```bash
   npm cache clean --force
   rm -rf node_modules package-lock.json  # On Unix/Mac
   rmdir /s node_modules & del package-lock.json  # On Windows
   npm install
   ```

### Common Issues

- **Port 3000 already in use**: Change the port with `npm run dev -- -p 3001`
- **TypeScript errors**: Run `npm run type-check` to identify issues
- **Build failures**: Ensure all dependencies are installed with `npm install`

## Project Structure

```
places-in-abuja/
├── app/                    # Next.js 14+ App Router
│   ├── (marketing)/       # Marketing pages group
│   ├── about/             # About page
│   ├── blog/              # Blog pages
│   ├── contact/           # Contact page
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/             # Reusable React components
├── content/               # MDX blog posts
├── lib/                   # Utility functions
├── public/                # Static assets
├── types/                 # TypeScript type definitions
├── __tests__/             # Test files
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── tailwind.config.ts     # Tailwind CSS configuration
└── next.config.mjs        # Next.js configuration
```

## Technology Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX for blog posts
- **Testing**: Jest + React Testing Library
- **Linting**: ESLint + Prettier
- **Animation**: Framer Motion

## Development

### Adding New Places

1. Create a new MDX file in `content/posts/`
2. Follow the existing frontmatter structure
3. The post will automatically appear in the blog

### Customizing Styles

- Global styles: `app/globals.css`
- Tailwind config: `tailwind.config.ts`
- Component styles: Use Tailwind classes directly

### Environment Variables

Create a `.env.local` file for environment-specific variables:

```env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Other Platforms

1. Build the application: `npm run build`
2. Start the production server: `npm run start`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Search existing issues on GitHub
3. Create a new issue with detailed information about your problem

---

**Happy exploring places in Abuja! 🏙️**