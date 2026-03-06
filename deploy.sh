#!/bin/bash

# 错误时退出
set -e

# 构建
npm run build

# 进入dist目录
cd dist

# 初始化新的Git仓库
git init
git checkout -B gh-pages
git add -A

if git diff --cached --quiet; then
	echo "无变更可提交，直接推送。"
else
	git commit -m "Deploy to GitHub Pages"
fi

# 推送到gh-pages分支
git push -f https://github.com/FreedomSnow/braveray-outsourcing-site.git gh-pages

cd -
