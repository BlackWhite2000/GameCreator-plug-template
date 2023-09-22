import process from 'node:process'
import { existsSync, mkdirSync, readdirSync, statSync, unlinkSync } from 'node:fs'

import { extname, join } from 'node:path'

// 获取命令行参数
const args = process.argv.slice(2).map(arg => arg.replace(/^-/, ''))
if (args.length !== 1) {
  console.error('请提供参数作为指定的文件路径。')
  process.exit(1)
}
const currentWorkingDirectory = process.cwd() // 获取当前工作目录

// 定义要删除文件的目录路径
const directoryPath = `${currentWorkingDirectory}/${args[0]}`

// 遍历目录中的所有文件和子目录
function deleteNonDTsFiles(dir) {
  readdirSync(dir).forEach((file) => {
    const filePath = join(dir, file)

    if (statSync(filePath).isDirectory()) {
      // 如果是子目录，递归删除
      deleteNonDTsFiles(filePath)
    }
    else {
      // 如果是文件，检查文件扩展名是否为 .d.ts .d.ts.map，如果不是，则删除
      if (extname(file) !== '.d.ts' && !file.endsWith('.d.ts') && !file.endsWith('.d.ts.map') && !file.endsWith('.d.ts.map'))
        unlinkSync(filePath)
    }
  })
}

// 创建目标目录（如果不存在）
if (!existsSync(directoryPath))
  mkdirSync(directoryPath)

// 调用函数开始删除非 .d.ts 文件
deleteNonDTsFiles(directoryPath)
