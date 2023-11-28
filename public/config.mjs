import { existsSync, mkdirSync, readdirSync, createReadStream, createWriteStream } from 'fs';
import { join } from 'path';
import path from 'node:path'
import { rm } from 'node:fs/promises'
import dotenv from 'dotenv'

// 从 .env 文件中加载环境变量
dotenv.config()

// 获取环境变量
const outputPath = process.env.OUTPUT_PATH
const outputFolderName = process.env.OUTPUT_FOLDER_NAME
const outputName = process.env.OUTPUT_NAME
const env = [
    {
        var: outputPath,
        name: 'OUTPUT_PATH',
        type: 'ts合并路径',
    },
    {
        var: outputFolderName,
        name: 'OUTPUT_FOLDER_NAME',
        type: 'ts目录名称',
    },
    {
        var: outputName,
        name: 'OUTPUT_NAME',
        type: 'ts文件名称',
    },
]
for (const i in env) {
    if (!env[i].var) {
        console.error(`未找到${env[i].type}，请在 .env 文件中设置 ${env[i].name} 变量。`)
        process.exit(1)
    }
}


// 定义源目录和目标目录的路径
const currentWorkingDirectory = process.cwd() // 获取当前工作目录
const sourceDirectory = path.join(currentWorkingDirectory, 'public')
const targetDirectory = path.join('template', outputPath, outputFolderName, 'public')

// 创建目标目录（如果不存在）
if (!existsSync(targetDirectory)) {
    mkdirSync(targetDirectory);
} else {
    rm(targetDirectory, { recursive: true, force: true })
}

// 获取源目录中的所有文件
const files = readdirSync(sourceDirectory);

// 遍历文件并拷贝到目标目录
files.forEach(file => {
    // 排除名为config.mjs的文件
    if (file === 'config.mjs') {
        return;
    }
    const sourceFilePath = join(sourceDirectory, file);
    const targetFilePath = join(targetDirectory, file);

    // 使用流来拷贝文件
    const readStream = createReadStream(sourceFilePath);
    const writeStream = createWriteStream(targetFilePath);

    readStream.pipe(writeStream);

    // 监听拷贝完成事件
    writeStream.on('finish', () => {
        console.log(`拷贝 ${file} 到 ${targetDirectory}`);
    });
});