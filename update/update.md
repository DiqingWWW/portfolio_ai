# Portfolio 项目更新记录

## 当前状态

当前项目仍处于 **v0.x** 开发阶段，不是正式发布的 V1 Portfolio。

### 当前目标
- 持续完善 v0.x
- 保持代码架构健康
- 为未来正式版本演进做好准备

---

## 版本管理规则

### 小版本（Minor Version）
例：`v0.1 → v0.2 → v0.3`

**范围：**
- UI 微调
- 动画调整
- Component 优化
- Bug 修复
- 内容更新
- 小范围 Layout 调整

**处理方式：**
- Git commit + push 到 main branch
- 不创建历史网站版本

### 大版本（Major Version）
例：`v0 → v1` / `v1 → v2`

**范围可能包括：**
- 完全重新设计
- 信息架构变化
- 页面结构变化
- 视觉语言变化
- 交互方式变化

**处理方式：**
需要保留旧版本：

```
/                  → 当前最新版本
/archive/v1        → 历史 V1
/archive/v2        → 历史 V2
```

大版本历史通过 **Next.js route** 保存，不是通过：
- Git branch
- 多个 GitHub repository
- 多个 Vercel deployment

---

## Git 管理原则

1. 同一个长期维护的 Portfolio 项目
2. Repository 永远保持：`https://github.com/DiqingWWW/portfolio_ai`
3. `main` branch 是唯一长期部署分支
4. 不创建 `v1`/`v2` branch 或 `portfolio-v1`/`portfolio-v2` repository
5. branch 只用于短期开发（如 `feature/new-animation`），完成后 merge 回 main
6. Git history 用于记录开发过程
7. Major version 的网站历史由 Next.js route 管理

---

## Next.js 架构原则

当前项目采用：

```
JSON content
    ↓
lib/content loader
    ↓
typed components
    ↓
Next.js page
```

### 未来 Major Version 架构

允许不同版本拥有不同 `page.tsx`：

```
app/
├── page.tsx              # 当前版本
└── archive/
    └── v1/
        └── page.tsx      # 历史版本
```

**原则：**
- Page 可以不同
- Component 必须尽量共享
- 最大程度复用 shared components、UI components、utilities、assets、common content、design tokens
- 避免复制 Button/Card/Footer、公共图片资源、profile 数据、工具函数

---

## Repository

`https://github.com/DiqingWWW/portfolio_ai`
