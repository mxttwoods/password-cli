# Password Generator CLI

Node.js command line app to generate random passwords

## Usage

Install dependencies

```bash
npm i
```

Run file

```bash
node . (options) # or node /src/index
```

```bash
Usage: password-cli [options]

Node.js Password Generator

Options:
  -V, --version          output the version number
  -l, --length <number>  length of password (default: "8")
  -s, --save             save password to passwords.txt
  -nn, --no-numbers      remove numbers
  -ns, --no-symbols      remove symbols
  -h, --help             display help for command
```

To create a symlink to run "password-cli" from anywhere

```bash
npm link

# Now you can run
password-cli (options)

# To remove symlink
npm unlink
```

## Options

| Short | Long              | Description                     |
| ----- | ----------------- | ------------------------------- |
| -l    | --length <number> | length of password (default: 8) |
| -s    | --save            | save password to passwords.txt  |
| -nn   | --no-numbers      | remove numbers                  |
| -ns   | --no-symbols      | remove symbols                  |
| -h    | --help            | display help for command        |
| -V    | --version         | show the version                |
