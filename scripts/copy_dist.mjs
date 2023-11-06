import process from 'node:process'
import { mkdir, rm } from 'node:fs/promises'
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

// 从 .env 文件中加载环境变量
dotenv.config()

// 获取环境变量
const templatePath = process.env.TEMPLATE_PATH
const outputName = process.env.OUTPUT_NAME
const outputFolderName = process.env.OUTPUT_FOLDER_NAME
const env = [
  {
    var: templatePath,
    name: 'TEMPLATE_PATH',
    type: '工程根路径',
  },
  {
    var: outputName,
    name: 'OUTPUT_NAME',
    type: 'ts合并名称',
  },
  {
    var: outputFolderName,
    name: 'OUTPUT_FOLDER_NAME',
    type: '硬链接后存放的文件夹名',
  },
]
for (const i in env) {
  if (!env[i].var) {
    console.error(`未找到${env[i].type}，请在 .env 文件中设置 ${env[i].name} 变量。`)
    process.exit(1)
  }
}
// 获取命令行参数
const args = process.argv.slice(2).map(arg => arg.replace(/^-/, ''))
if (args.length !== 1) {
  console.error('请提供参数作为指定的文件路径。')
  process.exit(1)
}
const currentWorkingDirectory = process.cwd() // 获取当前工作目录
const sourceDirectory = `${currentWorkingDirectory}/dist/${args[0]}`// 设置源目录
const destinationDirectory = `${templatePath}/Game/${outputFolderName}/${args[0]}` // 设置目标目录

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
    await mkdir(sourceDirectory, { recursive: true })
  }
  catch (err) {
    console.error(`创建目标文件夹错误: ${err}`)
    process.exit(1)
  }

  try {
    // 删除目标目录（如果存在）
    await rm(destinationDirectory, { recursive: true, force: true })

    // 检查目标目录是否存在，如果不存在则创建它
    try {
      await mkdir(destinationDirectory, { recursive: true })
    }
    catch (err) {
      console.error(`创建目标文件夹错误: ${err}`)
      process.exit(1)
    }

    // 拷贝源目录到目标目录
    await copyDirectory(sourceDirectory, destinationDirectory)

    console.log(`成功将目录从 ${sourceDirectory} 拷贝到 ${destinationDirectory}`)
  }
  catch (err) {
    console.error(`拷贝文件夹错误: ${err}`)
    process.exit(1)
  }
})()
