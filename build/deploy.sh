#!/usr/bin/env sh

# 当发生错误时中止脚本
set -e

# 构建
npm run build:deploy

# cd 到构建输出的目录下 
cd projet-deploy-dist

# 部署到自定义域域名
# echo 'www.example.com' > CNAME

git init
git add -A
git commit -m 'deploy'

# 部署到 https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# 部署到 https://<USERNAME>.github.io/<REPO>
git push -f git@github.com:Murphy573/Projet.git master:gh-pages

cd -
