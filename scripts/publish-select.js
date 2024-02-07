const readline = require('readline')
const fs = require('fs')
const { exec } = require('child_process')
require('dotenv').config()

const currentIndex = process.env.CURRENT_INDEX
let files = []

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const packagesDir = './packages/'

fs.readdir(packagesDir, (err, fileList) => {
  if (err) {
    console.error('Error reading packages directory:', err)
    return
  }

  files = fileList

  if (currentIndex !== undefined) {
    publishLib(currentIndex)
  } else {
    console.log('Available packages:')
    files.forEach(file => {
      console.log(file)
    })

    rl.question('Enter the package number you want to build: ', answer => {
      publishLib(answer)
    })
  }
})

function publishLib(index) {
  const selectedPackage = files.find(file => file.startsWith(`${index}-`))

  if (!selectedPackage) {
    console.error('Package not found!')
    rl.close()
    return
  }

  const packagePath = `${packagesDir}${selectedPackage}`
  const publishCommand = `npm publish --prefix ${packagePath} --access public`

  console.log(`Publishing package ${selectedPackage}...`)

  exec(publishCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`)
      return
    }

    console.log(`Package ${selectedPackage} publish successfully!`)
    rl.close()
  })
}
