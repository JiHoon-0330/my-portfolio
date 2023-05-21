cd my-portfolio
git pull
yarn install
PROD=true yarn build
yarn pm2:reload