import { existsSync, mkdirSync, readdirSync, createReadStream, createWriteStream } from 'fs';
import { join } from 'path';

// 定义源目录和目标目录的路径
const currentWorkingDirectory = process.cwd() // 获取当前工作目录
const sourceDirectory = `${currentWorkingDirectory}/public`
const targetDirectory = `${currentWorkingDirectory}/dist/public`

// 创建目标目录（如果不存在）
if (!existsSync(targetDirectory)) {
    mkdirSync(targetDirectory);
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
        console.log(`Copied ${file} to ${targetDirectory}`);
    });
});