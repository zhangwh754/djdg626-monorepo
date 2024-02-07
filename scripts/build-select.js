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
    buildLib(currentIndex)
  } else {
    console.log('Available packages:')
    files.forEach(file => {
      console.log(file)
    })

    rl.question('Enter the package number you want to build: ', answer => {
      buildLib(answer)
    })
  }
})

function buildLib(index) {
  const selectedPackage = files.find(file => file.startsWith(`${index}-`))

  if (!selectedPackage) {
    console.error('Package not found!')
    rl.close()
    return
  }

  const packagePath = `${packagesDir}${selectedPackage}`
  const publishCommand = `pnpm --prefix ${packagePath} build`

  console.log(`Building package ${selectedPackage}...`)

  exec(publishCommand, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`)
      return
    }

    console.log(`Package ${selectedPackage} build successfully!`)
    rl.close()
  })
}
