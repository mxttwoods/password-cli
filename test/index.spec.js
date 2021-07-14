const path = require('path')
const fs = require('fs')
const exec = require('child_process').exec
const numbers = '0123456789'
const symbols = '!@#$%^&*_-+='

test('length of password (default: 8)', async () => {
  const result = await cli(['-l', '8'], '.')

  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toContain('Generated Password')
  expect(result.stdout).toContain('Password copied to clipboard')
  expect(result.stdout).toHaveLength(58)
})

test('save password to passwords.txt', async () => {
  const file = path.join(__dirname, '../src', 'passwords.txt')

  if (fs.existsSync(file)) {
    fs.unlinkSync(file)
  }

  const result = await cli(['-s'], '.')
  const fileStream = fs.readFileSync(file, 'utf8', function (err, data) {
    if (err) {
      console.error()
    }
    return data
  })

  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toContain('Generated Password')
  expect(result.stdout).toContain('Password copied to clipboard')
  expect(result.stdout).toContain('Password saved to passwords.txt')
  expect(result.stdout).toHaveLength(90)
  expect(result.stdout).toContain(fileStream)

  if (fs.existsSync(file)) {
    fs.unlinkSync(file)
  }
})

test('remove numbers', async () => {
  const result = await cli(['-nn'], '.')

  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toContain('Generated Password')
  expect(result.stdout).toContain('Password copied to clipboard')
  expect(result.stdout).toHaveLength(58)
  expect(result.stdout).not.toContain(numbers)
})

test('remove symbols', async () => {
  const result = await cli(['-ns'], '.')

  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toContain('Generated Password')
  expect(result.stdout).toContain('Password copied to clipboard')
  expect(result.stdout).toHaveLength(58)
  expect(result.stdout).not.toContain(symbols)
})

test('display help for command', async () => {
  const result = await cli(['-h'], '.')

  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toContain(
    'Usage: index [options]\n' +
      '\n' +
      'Node.js Password Generator\n' +
      '\n' +
      'Options:\n' +
      '  -V, --version          output the version number\n' +
      '  -l, --length <number>  length of password (default: "8")\n' +
      '  -s, --save             save password to passwords.txt\n' +
      '  -nn, --no-numbers      remove numbers\n' +
      '  -ns, --no-symbols      remove symbols\n' +
      '  -h, --help             display help for command\n'
  )
})

test('show the version', async () => {
  const result = await cli(['-V'], '.')

  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toBe('1.0.0\n')
})

function cli (args, cwd) {
  return new Promise((resolve) => {
    exec(`node ${path.resolve('./src/index.js')} ${args.join(' ')}`, { cwd }, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr
      })
    })
  })
}
