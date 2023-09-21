## 说明

GameCreator功能开发起手模板

## 开始

```npm
npm install
npm install pnpm -g
pnpm install
```

## 配置

创建 `.env` 文件

配置环境变量 `OUTPUT_NAME`，这将会是ts合并后的名称

如 `OUTPUT_NAME=main`，合并后的ts名称将会是 `main.ts`

## 命令说明

```npm
pnpm build // 将src目录内的ts合并成一个ts文件，并放置dist目录内
pnpm link // 将硬链接dist目录内的ts至工程位置内，好处是修改后工程硬链接的ts文件也会同步修改
```
