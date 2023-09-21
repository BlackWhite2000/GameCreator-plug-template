import process from 'node:process'
import fs from 'node:fs'
import path from 'node:path'
import dotenv from 'dotenv'

// 从 .env 文件中加载环境变量
dotenv.config()

// 获取环境变量中的输出名称
const outputName = process.env.OUTPUT_NAME

if (!outputName) {
  console.error('未找到输出名称，请在 .env 文件中设置 OUTPUT_NAME 变量。')
  process.exit(1)
}

// 定义要合并的文件的目录
const srcDir = './src'

// 定义要输出的合并后的文件路径和文件名
const outputFilePath = `./dist/${outputName}.ts`

// 递归遍历目录并合并所有.ts文件
function mergeFilesInDirectory(directoryPath, outputFilePath) {
  const files = fs.readdirSync(directoryPath)

  for (const file of files) {
    const filePath = path.join(directoryPath, file)
    const stats = fs.statSync(filePath)

    if (stats.isDirectory()) {
      // 如果是子目录，则递归处理
      mergeFilesInDirectory(filePath, outputFilePath)
    }
    else if (path.extname(filePath) === '.ts') {
      // 如果是.ts文件，则将内容追加到合并后的文件
      const fileContent = fs.readFileSync(filePath, 'utf8')
      fs.appendFileSync(outputFilePath, fileContent)
    }
  }
}

// 合并所有.ts文件
try {
  fs.writeFileSync(outputFilePath, '') // 创建一个空文件
  mergeFilesInDirectory(srcDir, outputFilePath)
  console.log(`合并成功，合并后的文件位于: ${outputFilePath}`)
}
catch (error) {
  console.error(`合并失败: ${error}`)
}
