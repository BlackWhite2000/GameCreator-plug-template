import process from 'node:process'
import { rm } from 'node:fs/promises'

// 获取命令行参数
const args = process.argv.slice(2).map(arg => arg.replace(/^-/, ''))
if (args.length !== 1) {
  console.error('请提供参数作为指定的文件路径。')
  process.exit(1)
}
const currentWorkingDirectory = process.cwd() // 获取当前工作目录

const folderPath = `${currentWorkingDirectory}/${args[0]}`

try {
  rm(folderPath, { recursive: true, force: true })
}
catch (err) {
  console.error(`删除文件夹错误: ${err}`)
}
