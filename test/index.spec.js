const path = require('path')
const exec = require('child_process').exec

// cli object
// {
//   "code": 0,
//   "error": null,
//   "stderr": "",
//   "stdout": "Generated Password: P16s2nlk Password copied to clipboard Password saved to passwords.txt"
// }

// | Short | Long              | Description                     |
// | ----- | ----------------- | ------------------------------- |
// | -l    | --length <number> | length of password (default: 8) |
// | -s    | --save            | save password to passwords.txt  |
// | -nn   | --no-numbers      | remove numbers                  |
// | -ns   | --no-symbols      | remove symbols                  |
// | -h    | --help            | display help for command        |
// | -V    | --version         | show the version                |

test('length of password (default: 8)', async () => {
  const result = await cli(['-l', '8'], '.')
  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toContain('Generated Password')
})

test('save password to passwords.txt', async () => {
  const result = await cli(['-s'], '.')
  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toContain('Generated Password')
})

test('remove numbers', async () => {
  const result = await cli(['-nn'], '.')
  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toContain('Generated Password')
})

test('remove symbols', async () => {
  const result = await cli(['-ns'], '.')
  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toContain('Generated Password')
})

test('display help for command', async () => {
  const result = await cli(['-h'], '.')
  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
  expect(result.stdout).toContain('Node.js Password Generator')
})

test('show the version', async () => {
  const result = await cli(['-V'], '.')
  expect(result.code).toBe(0)
  expect(result.error).toBe(null)
  expect(result.stderr).toBe('')
})

function cli (args, cwd) {
  return new Promise((resolve) => {
    exec(`node ${path.resolve('./dist/index.js')} ${args.join(' ')}`, { cwd }, (error, stdout, stderr) => {
      resolve({
        code: error && error.code ? error.code : 0,
        error,
        stdout,
        stderr
      })
    })
  })
}
