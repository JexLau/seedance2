# Seedance 2.0

The world's first AI video generation model with native audio-video synchronization. Powered by ByteDance Seed Team.

![preview](preview.png)

## Features

- Native audio-video synchronization
- Phoneme-level lip sync in 8+ languages
- 2K resolution cinematic output
- Multi-shot narrative generation
- Dual-Branch DiT architecture

## Quick Start

1. Clone the repository

```bash
git clone https://github.com/seedance2/seedance2.site.git
```

2. Install dependencies

```bash
pnpm install
```

3. Run the development server

```bash
pnpm dev
```

## Customize

- Set your environment variables

```bash
cp .env.example .env.local
```

- Set your theme in `app/theme.css`

- Set your landing page content in `i18n/pages/landing`

- Set your i18n messages in `i18n/messages`

## Deploy

- Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fseedance2%2Fseedance2.site&project-name=seedance2-site&repository-name=seedance2-site)

- Deploy to Cloudflare

1. Customize your environment variables

```bash
cp .env.example .env.production
cp wrangler.toml.example wrangler.toml
```

2. Deploy

```bash
npm run cf:deploy
```

## Resources

- [Official Site](https://seedance2.site)
- [Try Seedance 2.0](https://jimeng.jianying.com/ai-tool/seedance)

## License

- [License Agreement](LICENSE)
