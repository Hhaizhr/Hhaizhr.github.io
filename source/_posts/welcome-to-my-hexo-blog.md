---
title: 用 Hexo 搭建个人技术博客
date: 2026-09-14 20:15:00
updated: 2026-10-29
tags:
  - Hexo
  - 博客搭建
categories:
  - 经验总结
---

记录这个博客的项目结构、写作方式和发布流程。

<!-- more -->

## 当前使用的方案

博客由 **Hexo** 生成静态页面，主题是仓库里的 **nova 自定义主题**。文章使用 Markdown 编写，GitHub Actions 负责构建和发布到 GitHub Pages。

页面保留了文章归档、分类、标签、本地全文搜索、深浅主题切换和文章目录。主题样式与交互代码都在仓库内维护，不依赖外部主题包。

## 项目结构

```text
source/          文章和独立页面
themes/nova/     当前主题的模板、样式、脚本和头像
scaffolds/       新建文章、页面和草稿时使用的模板
test/           生成页面的检查脚本
_config.yml     博客信息、网址、主题和搜索配置
```

`node_modules/` 是安装的依赖，`public/` 是生成的网页，`db.json` 是 Hexo 缓存。这些文件由工具生成，已被 Git 忽略。

## 写作与本地预览

首次使用时安装依赖：

```bash
npm ci
```

新建文章并启动预览：

```bash
npx hexo new post "文章标题"
npm run server
```

浏览器打开 `http://localhost:4000`。文章放在 `source/_posts/` 中，分类和标签由文章头部的 `categories`、`tags` 字段生成。

## 构建与发布

提交前执行：

```bash
npm run check:theme
```

这个命令先生成网页，再检查页面标题、资源路径、站内链接和目录锚点。需要清理生成文件和缓存时，执行 `npm run clean`。

推送到 `main` 或 `master` 后，GitHub Actions 会安装锁定的依赖、运行构建检查，并把 `public/` 发布到 GitHub Pages。具体流程在 `.github/workflows/deploy.yml` 中。

## 代码高亮示例

Markdown 代码块由 Hexo 生成语法高亮，当前主题负责字体、行号和配色：

```python
def fibonacci(n: int) -> int:
    """计算第 n 项斐波那契数"""
    if n <= 1:
        return n
    a, b = 0, 1
    for _ in range(2, n + 1):
        a, b = b, a + b
    return b

if __name__ == "__main__":
    print(f"Fibonacci(10) = {fibonacci(10)}")
```
