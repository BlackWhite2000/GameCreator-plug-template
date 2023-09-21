import process from 'node:process'
import readline from 'node:readline'
import fs from 'node:fs'
import dotenv from 'dotenv'

// 从 .env 文件中加载环境变量
dotenv.config()

// 获取环境变量中的输出名称
const outputName = process.env.OUTPUT_NAME

if (!outputName) {
  console.error('未找到输出名称，请在 .env 文件中设置 OUTPUT_NAME 变量。')
  process.exit(1)
}

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

rl.question('请输入目标地址：', (targetPath) => {
  const sourcePath = `dist/${outputName}.ts` // 源文件路径
  const hardLinkPath = `${targetPath}/${outputName}.ts` // 创建的硬链接路径

  // 检查目标地址是否已经存在文件
  if (fs.existsSync(hardLinkPath)) {
    rl.question('目标地址已经存在相同的文件，是否删除并重新创建链接？(y/n): ', (answer) => {
      if (answer.toLowerCase() === 'y') {
        // 删除已存在的文件
        fs.unlinkSync(hardLinkPath)
        console.log('已删除目标地址的现有文件:', hardLinkPath)
        createHardLink(sourcePath, hardLinkPath)
      }
      else {
        console.log('未创建硬链接，因为用户选择不删除现有文件。')
        rl.close()
      }
    })
  }
  else {
    createHardLink(sourcePath, hardLinkPath)
  }
})

function createHardLink(sourcePath, hardLinkPath) {
  fs.link(sourcePath, hardLinkPath, (err) => {
    if (err)
      console.error('创建硬链接失败：', err)

    else
      console.log('硬链接已创建：', hardLinkPath)

    rl.close()
  })
}
