const url = require('url')
const http = require('http')
const path = require('path')
const fs = require('fs')

const server = http.createServer((message, response) => {
  const urlPath = url.parse(message.url).path.substring(1)
  const resolvedPath = path.resolve('view/', urlPath)

  fs.readFile(resolvedPath, { encoding: 'utf8'}, (err, html) => {
    if (err) reject(err, response)
    else resolve(html, response)
  })
})

const resolve = (html, response) => {
  response.writeHead(200)
  response.end(html)
}

const reject = (err, response) => {
  response.writeHead(404)
  response.end(err.toString())
}

server.listen(3000, (err) => {
  if(err) console.log(err)
  else console.log('running')
})
