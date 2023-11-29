import process from 'node:process'
import { mkdir, rm, readdir } from 'node:fs/promises'
import fs from 'node:fs'
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
const sourceDirectory = `${currentWorkingDirectory}/src`// 设置源目录
const destinationDirectory = path.join(currentWorkingDirectory, 'template', outputPath, outputFolderName) // 设置目标目录
const directoriesToKeep = ['public', 'dist']; // 删除时忽略的目录

async function copyDirectory(source, target) {
  try {
    const stats = await fs.promises.stat(source)
    if (stats.isDirectory()) {
      await fs.promises.mkdir(target, { recursive: true })
      const files = await fs.promises.readdir(source)
      for (const file of files)
        await copyDirectory(path.join(source, file), path.join(target, file))
    }
    else {
      await fs.promises.copyFile(source, target)
    }
  }
  catch (err) {
    console.error(`拷贝文件夹错误: ${err}`)
    process.exit(1)
  }
}

(async () => {
  // 检查目标目录是否存在，如果不存在则创建它
  try {
    await mkdir(destinationDirectory, { recursive: true });
  } catch (err) {
    console.error(`创建目标文件夹错误: ${err}`);
    process.exit(1);
  }

  try {
    // 获取目标目录下的所有文件和子目录
    const filesAndDirs = await readdir(destinationDirectory);

    // 筛选出要保留的目录
    const directoriesToDelete = filesAndDirs.filter(
      (item) => !directoriesToKeep.includes(item)
    );

    // 删除不需要的文件和子目录
    for (const item of directoriesToDelete) {
      const itemPath = path.join(destinationDirectory, item);
      await rm(itemPath, { recursive: true, force: true });
    }

    // 检查目标目录是否存在，如果不存在则创建它
    try {
      await mkdir(destinationDirectory, { recursive: true });
    } catch (err) {
      console.error(`创建目标文件夹错误: ${err}`);
      process.exit(1);
    }

    // 拷贝源目录到目标目录
    await copyDirectory(sourceDirectory, destinationDirectory);

    console.log(`成功将目录从 ${sourceDirectory} 拷贝到 ${destinationDirectory}`);
  } catch (err) {
    console.error(`拷贝文件夹错误: ${err}`);
    process.exit(1);
  }
})();
