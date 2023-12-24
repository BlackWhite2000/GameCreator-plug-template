## 开始

### 1、安装依赖

```bash
pnpm install
```

### 2、实时编写

```bash
pnpm run dev
```

执行 `pnpm run dev` 后，访问 `http://localhost:4567` 即可开始实时编写文档。

## 配置

### API

默认提供了API的请求方法，可通过 `docs/constants/apis` 调整。

其中 `docs/apis` 已经预设了一套请求代码，并关联到 `docs/components/content/Versions.vue`。

### SEO

`docs/constants/index` 设定了网站基本的SEO，可自由修改扩展。

### LOGO

可通过 `docs/components/Logo.vue` 去修改LOGO的样式，默认使用SVG。

## 静态部署

### 1、编译

```bash
pnpm run generate
```

### 2、发布

编译后的文件通常存放在 `docs\dist` 内。

将这些文件发布至服务端即可。


## 动态部署

### 1、编译

```bash
pnpm run build
```

### 2、发布

编译后的文件通常存放在 `docs\.output` 内。

需要nodejs服务器来启动 `docs\.output\server\index.mjs` ，推荐使用PM2。

## 更多

更多关于该文档的工作原理，请查看 [Docus](https://docus.dev)。
