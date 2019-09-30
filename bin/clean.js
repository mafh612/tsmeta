const { readdirSync, statSync, unlinkSync } = require('fs')
const { resolve } = require('path')

const removeFile = path => {
  if (statSync(path).isFile()) {
    if (path.endsWith('.d.ts') || path.endsWith('.map') || path.endsWith('.js')) unlinkSync(path)
  } else if (statSync(path).isDirectory()) {
    readdirSync(path).forEach(file => {
      removeFile(resolve(path, file))
    })
  } else {
    console.log(`coould not process ${path}`)
  }
}

removeFile(resolve('src'))
