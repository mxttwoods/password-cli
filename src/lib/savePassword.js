const fs = require('fs')
const path = require('path')
const os = require('os')
const chalk = require('chalk')

// write password to file
const savePassword = (password) => {
  // open password file
  fs.open(path.join(__dirname, '../', 'passwords.txt'), 'a', 666, (e, id) => {
    // write string to file
    fs.write(id, password + os.EOL, null, 'utf-8', () => {
      // close file and log to user
      fs.close(id, () => {
        console.log(chalk.green('Password saved to passwords.txt'))
      })
    })
  })
}

module.exports = savePassword
