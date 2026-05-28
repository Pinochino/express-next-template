#!/usr/bin/env node

import fs from 'fs-extra'
import path from 'path'
import chalk from 'chalk'
import ora from 'ora'
import { execSync } from 'child_process'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const projectName = process.argv[2]

if (!projectName) {
  console.log(chalk.red('Please provide project name'))
  process.exit(1)
}

const spinner = ora('Creating project...').start()

try {
  // template path
  const templatePath = path.join(
    __dirname,
    '../templates/fullstack'
  )

  // target path
  const targetPath = path.join(
    process.cwd(),
    projectName
  )

  // check exists
  if (fs.existsSync(targetPath)) {
    spinner.fail('Folder already exists')
    process.exit(1)
  }

  // copy template
  await fs.copy(templatePath, targetPath)

  spinner.text = 'Installing client dependencies...'

  execSync('npm install', {
    cwd: path.join(targetPath, 'client'),
    stdio: 'inherit'
  })

  spinner.text = 'Installing server dependencies...'

  execSync('npm install', {
    cwd: path.join(targetPath, 'server'),
    stdio: 'inherit'
  })

  spinner.succeed('Project created successfully!')

  console.log(`
${chalk.green('Next steps:')}

cd ${projectName}

Client:
cd client
npm run dev

Server:
cd server
npm run dev
`)
} catch (error) {
  spinner.fail('Error creating project')
  console.error(error)
}