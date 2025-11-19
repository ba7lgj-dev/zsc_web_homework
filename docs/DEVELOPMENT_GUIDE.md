# 开发接入指南

本仓库现在以 `public/` 为静态资源根目录，以 `assets/` 存放所有共享资源。所有新增页面、脚本、样式以及图片请遵循以下约定，便于团队协作与后续的 CDN 复用。

## 目录结构

```
├── assets
│   ├── css/            # 全局与通用样式表
│   ├── images/         # 描述性命名的图片与图标资源
│   └── js/             # 原生 JavaScript（行为脚本、装配脚本）
├── docs/               # 设计、规范、接入文档
└── public/
    ├── header-navigation.html  # 公共的页面框架（头部、侧栏、模态等）
    └── *.html          # 业务页面（文件名即路由）
```

> **图片命名规则**：全部使用 kebab-case，名称需体现用途，例如 `logo-segmentfault.svg`、`qr-code-wechat-login.jpg`。避免无意义的 hash 或纯数字文件名。

## HTML / CSS / JS 放置原则

| 类型 | 放置位置 | 说明 |
| --- | --- | --- |
| HTML 页面 | `public/` 目录或其子目录 | 文件名即未来的 URL（`public/questions-list.html` → `/questions-list.html`）。子目录可表达业务模块，例如 `public/events/list.html`。 |
| 全局样式 | `assets/css/` | `styles.css` 负责头部/框架基础样式，页面自定义样式可新增独立的 `*.css` 并在页面中引入。 |
| 行为脚本 | `assets/js/script.js` | 暴露 `window.initializeHeaderInteractions`，由页面或装配脚本调用。禁止在模块顶层写全局副作用以便复用。 |
| 装配脚本 | `assets/js/header-loader.js` | 负责把 `header-navigation.html` 注入到任意页面，并将页面主体内容放入布局中的 `data-slot="page-content"`。 |
| 图片 / 图标 | `assets/images/` | 需要根据语义命名，SVG/PNG/WebP 可按实际使用类型命名。 |

## 布局拼接（接入 `header-navigation.html`）

1. **占位节点**：在页面 `<body>` 内放置一个宿主容器并添加 `data-component="app-shell-host"`。可根据部署位置设置以下可选属性：
   - `data-src`：公共框架的地址。默认值为同目录下的 `header-navigation.html`，若线上使用 CDN，可设为 `https://cdn.jsdelivr.net/gh/ba7lgj-dev/zsc_web_homework@main/public/header-navigation.html`。
   - `data-behavior-src`：行为脚本地址。默认值 `../assets/js/script.js`；若走 CDN，可设为 `https://cdn.jsdelivr.net/gh/ba7lgj-dev/zsc_web_homework@main/assets/js/script.js`。
   - `data-page-fragment-selector`：当页面存在多个模板时，可自定义选择器（默认 `[data-page-fragment]`）。

2. **页面主体**：使用 `<template data-page-fragment>` 包裹业务内容，`header-loader.js` 会把该模板的节点克隆并插入到公共布局中 `data-slot="page-content"` 指定的位置。

3. **引入装配脚本**：在页面底部引入 `assets/js/header-loader.js`（或对应的 CDN 链接）。脚本会自动：
   - 通过 `fetch` 载入 `header-navigation.html`；
   - 将页面模板内容挂载到布局中；
   - 若页面尚未加载 `script.js`，自动追加 `<script>` 并在完成后调用 `window.initializeHeaderInteractions()`，保证导航、搜索、模态等行为可用。

### 示例

```html
<body>
  <div data-component="app-shell-host"
       data-src="header-navigation.html"
       data-behavior-src="../assets/js/script.js">
  </div>

  <template data-page-fragment>
    <section class="my-page">自定义内容</section>
  </template>

  <script src="../assets/js/header-loader.js"></script>
</body>
```

如需直接通过 jsDelivr 引入，可替换为：

```html
<script src="https://cdn.jsdelivr.net/gh/ba7lgj-dev/zsc_web_homework@main/assets/js/header-loader.js"></script>
```

## 路由与跳转原则

1. **页面命名 = 路由**：`public/questions-list.html` 部署后可通过 `/questions-list.html` 访问；若放在子目录 `public/community/events.html`，对应路由为 `/community/events.html`。
2. **链接统一使用相对路径**：在公共导航或页面内跳转时，优先使用相对地址（例如 `href="questions-list.html"`），这样在本地预览与线上部署都能正常访问。
3. **锚点与外部链接**：站内锚点统一以 `#/section-id` 形式描述，外部链接添加 `rel="noopener" target="_blank"`。
4. **CDN 引用策略**：公共框架和脚本可直接使用 `https://cdn.jsdelivr.net/gh/ba7lgj-dev/zsc_web_homework@main/...`，保证其他项目按需注入。若需锁定版本，可在 URL 末尾添加 `@<tag>`。

## 使用提示

- 在 `header-navigation.html` 中，`data-slot="page-content"` 是唯一的业务渲染区域。请勿在公共框架内直接写入页面内容，所有页面内容都应通过模板插入。
- 若某页面需要在装配后执行额外的脚本，可以监听 `app-shell:loaded` 事件：

```js
document.querySelector('[data-component="app-shell-host"]').addEventListener('app-shell:loaded', () => {
  // 页面专属逻辑
});
```

- 所有新增图片需放置在 `assets/images/` 并按照「用途-描述.后缀」的格式命名，例如 `icon-project-management.webp`。
- 若页面需要专属样式/脚本，可在 `assets/css/` 或 `assets/js/` 下新增文件，并在对应页面中通过 `<link>`/`<script>` 引入，保持公共资源干净。
