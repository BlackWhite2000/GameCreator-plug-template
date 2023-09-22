import process from 'node:process'
import readline from 'node:readline'
import fs from 'node:fs/promises'
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

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const currentWorkingDirectory = process.cwd() // 获取当前工作目录
const sourcePath = `${currentWorkingDirectory}/dist/${outputName}.ts` // 源文件路径
const hardLinkPath = `${templatePath}/Game/game/${outputFolderName}/${outputName}.ts` // 创建的硬链接路径

// 确保目标路径存在，如果不存在就创建它
async function ensureDirectoryExists(directoryPath) {
  try {
    await fs.access(directoryPath)
  }
  catch (error) {
    if (error.code === 'ENOENT')
      await fs.mkdir(directoryPath, { recursive: true })

    else
      throw error
  }
}

(async () => {
  await ensureDirectoryExists(path.dirname(hardLinkPath))

  // 检查目标地址是否已经存在文件
  try {
    await fs.access(hardLinkPath)

    // 删除已存在的文件
    await fs.unlink(hardLinkPath)
    console.log('已删除目标地址的现有文件:', hardLinkPath)
  }
  catch (error) {
    if (error.code !== 'ENOENT')
      console.error('删除现有文件时出错：', error)
  }

  // 创建硬链接
  try {
    await fs.link(sourcePath, hardLinkPath)
    console.log('硬链接已创建：', hardLinkPath)
  }
  catch (error) {
    console.error('创建硬链接失败：', error)
  }

  rl.close()
})()
