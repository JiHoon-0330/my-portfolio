cd my-portfolio
git pull
pnpm install
PROD=true pnpm build
pnpm pm2:reload