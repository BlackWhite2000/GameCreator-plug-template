import process from 'node:process'
import { rm, readdir } from 'node:fs/promises'
import path from 'node:path'
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

const currentWorkingDirectory = process.cwd() // 获取当前工作目录
const destinationDirectory = path.join(currentWorkingDirectory, 'template', outputPath, outputFolderName) // 设置目标目录

// 检查目录是否存在
async function isDirectoryExists(directory) {
    try {
        const stat = await fs.stat(directory);
        return stat.isDirectory();
    } catch (error) {
        return false;
    }
}
if (isDirectoryExists) { 
    rm(destinationDirectory, { recursive: true, force: true });
    console.log('删除操作完成。');
} else {
    console.log('目录不存在，无需执行删除操作。');
}
