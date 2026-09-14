---
title: 基于 Hexo & NexT 搭建个人技术博客之旅
date: 2026-09-14 20:15:00
tags:
  - Hexo
  - NexT
  - 博客搭建
categories:
  - 经验总结
---

欢迎来到我的新博客！这里是我记录技术成长、沉淀知识与分享经验的新起点。

<!-- more -->

## 为什么选择 Hexo？

在对比了各类博客方案之后，我最终选择了 **Hexo + NexT** 主题：

1. **渲染速度极快**：基于 Node.js 驱动，静态页面秒级生成。
2. **专注于 Markdown**：无需操作繁琐后台，用你最习惯的 Markdown 编辑器写作。
3. **生态丰富**：NexT 主题经过多年打磨，黑白极简的卡片风格与阅读体验非常适合技术博文。
4. **自动化部署**：搭配 GitHub Actions，每次 `git push` 即可全自动构建并发布到 GitHub Pages。

---

## 常用命令速查

在日常写作中，Hexo 的常用管理命令如下：

```bash
# 新建一篇文章
$ hexo new post "文章名称"

# 本地启动预览（访问 http://localhost:4000）
$ hexo server

# 生成静态文件
$ hexo generate

# 清理缓存与已生成的文件
$ hexo clean
```

---

## 代码高亮示例

NexT 主题内置了优雅的代码高亮与一键复制功能：

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

---

## 下一步计划

- [x] 完成 Hexo + NexT 基础环境搭建与本地调试
- [ ] 关联 GitHub 远程仓库并配置 GitHub Actions 自动部署
- [ ] 撰写系列技术文章，保持每周学习输出

*“千里之行，始于足下。” 让我们在这里共同见证技术的积累与突破！*
