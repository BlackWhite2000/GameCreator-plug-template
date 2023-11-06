import process from 'node:process'
import fs from 'node:fs'
import path from 'node:path'

// 获取命令行参数
const args = process.argv.slice(2).map(arg => arg.replace(/^-/, ''))
if (args.length !== 2) {
  console.error('请提供两个参数作为命令行参数。')
  process.exit(1)
}

const currentWorkingDirectory = process.cwd() // 获取当前工作目录
const rootDirectory = `${currentWorkingDirectory}/lib/${args[0]}` // 目录路径
const outputPath = `${currentWorkingDirectory}/lib/${args[1]}` // 输出文件的名称

output(rootDirectory, outputPath)

function output(rootDirectory, outputPath) {
  const files = findFiles(rootDirectory)
  // 生成引用路径
  const referencePaths = files.map(filePath => `/// <reference path="${filePath}" />`)
  // 将引用路径写入输出文件

  // 获取父目录的路径
  const parentDirectory = path.dirname(outputPath)

  // 判断父目录是否存在，如果不存在则创建
  if (!fs.existsSync(parentDirectory))
    fs.mkdirSync(parentDirectory, { recursive: true })

  // 检查输出文件是否存在，如果不存在则创建它
  if (!fs.existsSync(outputPath))
    fs.writeFileSync(outputPath, '') // 创建一个空文件

  fs.appendFileSync(outputPath, `${referencePaths.join('\n')}\n`) // 追加引用路径到输出文件

  console.log(`生成.d.ts完毕 ${outputPath}`)
}

function findFiles(directory) {
  const files = fs.readdirSync(directory)
  const filePaths = []

  for (const file of files) {
    const filePath = path.join(directory, file)
    const stat = fs.statSync(filePath)

    if (stat.isDirectory()) {
      // 如果是目录，递归查找子目录中的文件
      filePaths.push(...findFiles(filePath))
    }
    else if (stat.isFile() && file.endsWith('.d.ts')) {
      // 如果是文件且是 .d.ts 文件，添加到结果数组
      filePaths.push(filePath)
    }
  }

  return filePaths
}
