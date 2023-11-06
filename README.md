## 说明

GameCreator功能开发起手模板。

## 配置

创建 `.env` 文件, 可参考 `.env.example` 文件。

```env
TEMPLATE_PATH=D:\我的游戏工程  # 工程的根路径
OUTPUT_NAME=App # ts合并名称
OUTPUT_FOLDER_NAME=App  # 硬链接后存放的文件夹名
```

## 开始

> 请配置好 .env 再执行以下操作

```shell
npm install pnpm -g
pnpm install
pnpm run init
```

## 命令说明

> 通常的开发只需要执行一次 `pnpm run init` 以及确保 `pnpm run build:w` 存在即可。
> 开发过程中如新建了自定义指令，则需要执行一次 `pnpm run build:lib` 以拉取最新api库。
> 其他命令用的相对少。

```shell
pnpm run init # 将自动获取工程的 .d.ts，自动建立硬链接，以确保开发环境是正确的，最后会执行一次 pnpm run build:w。该命令通常执行一次即可。如果希望更新开发环境可再次执行。
pnpm run build # 合并 src 目录内的ts文件至 dist 目录内
pnpm run build:w # 持续监听执行 pnpm run build，当 src 目录内有变更时，自动合并更新。
pnpm run build:lib # 获取工程的 .d.ts，工程如果新增了相关api，可以执行一次来更新。
pnpm run build:public # 将 public 目录内的文件拷贝至 dist/public。同时将会拷贝至游戏工程内，通常路径是：我的游戏工程/Game/game/硬链接后存放的文件夹名/public。
pnpm run build:ts # 将 build 目录内的文件拷贝至 dist/build。同时将会拷贝至游戏工程内，通常路径是：我的游戏工程/Game/game/硬链接后存放的文件夹名/build。
pnpm run build:update # 将会执行 pnpm run build:public 跟 pnpm run build:ts。
pnpm run link # 将会执行一次硬链接建立，如果硬链接丢失可执行此命令。
```

## 目录说明

```shell
lib # 游戏工程的 .d.ts 支持库
script # 该项目运行脚本
build # 该目录下的文件将会被编译成一个 js 文件，固定名称为 main.js。该目录下的文件并不会与 lib 目录关联。
public # 该目录下的文件不会被编译、合并。将会直接被拷贝。该目录下的文件并不会与 lib 目录关联。
src # 该目录下的文件将被合并成一个 ts 文件，文件名跟随环境变量 OUTPUT_NAME。该目录下的文件与 lib 目录关联。
```

## CI说明

如要使用每周自动更新依赖版本以及自动合并。

请在仓库的 `Settings` -> `Actions` -> `General` 中。

开启 `Allow GitHub Actions to create and approve pull requests`。

如不需要，则删除 `.github` 文件即可。
