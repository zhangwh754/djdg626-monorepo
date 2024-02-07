const readline = require('readline')
const fs = require('fs')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const packagesDir = './packages/'

fs.readdir(packagesDir, (err, files) => {
  if (err) {
    console.error('Error reading packages directory:', err)
    return
  }

  console.log('Available packages:')
  files.forEach(file => {
    console.log(file)
  })

  rl.question('Enter the package number you want to publish: ', answer => {
    const selectedPackage = files.find(file => file.startsWith(`${answer}-`))

    if (!selectedPackage) {
      console.error('Package not found!')
      rl.close()
      return
    }

    const packagePath = `${packagesDir}${selectedPackage}`
    const publishCommand = `npm publish ${packagePath} --access public`

    console.log(`Publishing package ${selectedPackage}...`)

    const { exec } = require('child_process')
    exec(publishCommand, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`)
        return
      }
      if (stderr) {
        console.error(`stderr: ${stderr}`)
        return
      }
      console.log(`Package ${selectedPackage} published successfully!`)
    })

    rl.close()
  })
})
