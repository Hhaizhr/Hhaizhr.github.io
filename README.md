# Nova小新 · 技术手记

基于 Hexo 的个人博客，使用仓库内的 `garden` 主题，发布到 GitHub Pages。

## 本地使用

```bash
npm ci
npm run server
```

预览地址：`http://localhost:4000`。

```bash
npx hexo new post "文章标题"  # 新建文章
npm run check:theme          # 构建并检查页面、资源、链接和目录锚点
npm run clean               # 清理生成文件和缓存
```

## 文件位置

- `source/`：文章、关于页、分类和标签页。
- `themes/garden/`：当前使用的页面模板、样式、搜索和主题切换代码。
- `themes/garden/source/images/nova-avatar.jpg`：导航头像与网站图标。
- `_config.yml`：博客名称、作者、网址、主题及搜索配置。
- `scaffolds/`：Hexo 新建文章、页面和草稿的模板。
- `test/check-theme.cjs`：生成页面的检查脚本，GitHub Actions 构建时也会运行。

推送到 `main` 或 `master` 后，`.github/workflows/deploy.yml` 自动构建并发布。`node_modules/`、`public/` 和 `db.json` 是已被 Git 忽略的本地产物。
