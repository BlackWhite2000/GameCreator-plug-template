import process from 'node:process'
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

// 从 .env 文件中加载环境变量
dotenv.config()

// 获取环境变量
const templatePath = process.env.TEMPLATE_PATH
const outputName = process.env.OUTPUT_NAME
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
]
for (const i in env) {
  if (!env[i].var) {
    console.error(`未找到${env[i].type}，请在 .env 文件中设置 ${env[i].name} 变量。`)
    process.exit(1)
  }
}

// 获取命令行参数
const args = process.argv.slice(2).map(arg => arg.replace(/^-/, ''))
if (args.length !== 2) {
  console.error('请提供两个参数作为命令行参数。')
  process.exit(1)
}

const currentWorkingDirectory = process.cwd() // 获取当前工作目录
const notCopyPath = [`${templatePath}/Game/game/${outputName}`]
const sourceDirectory = `${templatePath}/${args[0]}` // 设置源目录
const destinationDirectory = `${currentWorkingDirectory}/lib/${args[1]}` // 设置目标目录

copy(destinationDirectory, sourceDirectory)

// 拷贝
function copy(destinationDirectory, sourceDirectory) {
  // 获取父目录的路径
  const parentDirectory = path.dirname(destinationDirectory)

  // 判断父目录是否存在，如果不存在则创建
  if (!fs.existsSync(parentDirectory))
    fs.mkdirSync(parentDirectory, { recursive: true })

  // 创建目标目录（如果不存在）
  if (!fs.existsSync(destinationDirectory))
    fs.mkdirSync(destinationDirectory)
  else
    remove(destinationDirectory)
  // 获取源目录的文件列表
  const files = fs.readdirSync(sourceDirectory)

  // 遍历源目录的文件列表
  files.forEach((file) => {
    const sourceFilePath = path.join(sourceDirectory, file)
    const destinationFilePath = path.join(destinationDirectory, file)

    // 检查文件是否为目录
    if (fs.statSync(sourceFilePath).isDirectory()) {
      // 如果是目录，检查目录路径是否在不拷贝的路径列表中
      if (!isPathInNotCopyList(sourceFilePath)) {
        // 如果不在列表中，递归拷贝目录
        copyDirectory(sourceFilePath, destinationFilePath)
      }
    }
    else {
      // 如果是文件，直接拷贝文件
      fs.copyFileSync(sourceFilePath, destinationFilePath)
    }
  })

  console.log(`成功拷贝目录 '${sourceDirectory}' 到 '${destinationDirectory}'。`)
}

// 递归拷贝目录的函数
function copyDirectory(source, destination) {
  // 创建目标目录（如果不存在）
  if (!fs.existsSync(destination))
    fs.mkdirSync(destination)

  // 获取源目录的文件列表
  const files = fs.readdirSync(source)

  // 遍历源目录的文件列表
  files.forEach((file) => {
    const sourceFilePath = path.join(source, file)
    const destinationFilePath = path.join(destination, file)

    // 检查文件是否为目录
    if (fs.statSync(sourceFilePath).isDirectory()) {
      // 如果是目录，检查目录路径是否在不拷贝的路径列表中
      if (!isPathInNotCopyList(sourceFilePath)) {
        // 如果不在列表中，递归拷贝目录
        copyDirectory(sourceFilePath, destinationFilePath)
      }
    }
    else {
      // 如果是文件，直接拷贝文件
      fs.copyFileSync(sourceFilePath, destinationFilePath)
    }
  })
}
function remove(destinationDirectory) {
  // 清空目标目录
  if (fs.existsSync(destinationDirectory)) {
    // 获取目录下的所有文件和子目录
    const files = fs.readdirSync(destinationDirectory)

    // 删除目标目录中的所有文件和子目录
    files.forEach((file) => {
      const filePath = `${destinationDirectory}/${file}`
      if (fs.statSync(filePath).isDirectory()) {
        // 如果是子目录，递归删除
        removeDirectory(filePath)
      }
      else {
        // 如果是文件，直接删除
        fs.unlinkSync(filePath)
      }
    })
  }
  console.log(`成功清空目录 '${destinationDirectory}'。`)
}

// 删除目录的函数
function removeDirectory(directoryPath) {
  const files = fs.readdirSync(directoryPath)
  files.forEach((file) => {
    const filePath = `${directoryPath}/${file}`
    if (fs.statSync(filePath).isDirectory())
      removeDirectory(filePath)

    else
      fs.unlinkSync(filePath)
  })
  fs.rmdirSync(directoryPath)
}

// 检查文件路径是否在不拷贝的路径列表中
function isPathInNotCopyList(filePath) {
  return notCopyPath.some(notCopy => path.relative(notCopy, filePath) === '')
}
