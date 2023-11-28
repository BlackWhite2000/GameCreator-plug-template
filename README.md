## 说明

GameCreator功能开发起手模板。

## 配置

创建 `.env` 文件, 可参考 `.env.example` 文件。

```env
OUTPUT_NAME=App # ts合并名称。
OUTPUT_PATH=Game # 存放文件的目录, 使用相对路径，如Game就表示存放至 template/Game 目录内。
OUTPUT_FOLDER_NAME=App  # ts合并存放的文件夹名。
```

## 开始

### 1、安装依赖

```shell
npm install pnpm -g
pnpm install
```

### 2、下载工程

将工程下载放到 `template` 目录内。

如果发现 `tsconfig.json` 不再报找不到文件 `**/template/game` 的错误，表示放置正确。

### 3、开发

从 `src` 文件开始，开发完毕后执行 `pnpm run build` 将自动合并ts并拷贝至工程内。

### 4、填写开发文档

`docs` 内置了md文档，可查看 `docs/README.md` 来开始。

## 命令说明

```shell
pnpm run build # 合并 src 目录内的ts文件并拷贝至工程内。
pnpm run build:w # 持续监听执行 pnpm run build，当 src 目录内有变更时，自动合并更新。
pnpm run build:public # 将 public 目录内的文件并拷贝至工程内。
pnpm run build:ts # 将 build 目录内的文件编译成js，并拷贝至工程内。
```

## 目录说明

```shell
docs # 项目配套文档。
template # 项目工程存放目录。
script # 该项目运行脚本。
build # 该目录下的文件将会被编译成一个 js 文件，固定名称为 main.js。
public # 该目录下的文件不会被编译、合并。将会直接被拷贝。
src # 该目录下的文件将被合并成一个 ts 文件，文件名跟随环境变量 OUTPUT_NAME。
```
