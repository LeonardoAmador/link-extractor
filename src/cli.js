import chalk from 'chalk';
import fs from 'fs';
import readFile from './index.js';
import validatedList from './http-validation.js';

const args = process.argv;

function printList(validate, result, identifier = '') {

  if (validate) {
    console.log(
      chalk.yellow('Validated list'),
      chalk.black.bgGreen(identifier),
      validatedList(result));
  } else {
    console.log(
      chalk.yellow('Links list'),
      chalk.black.bgGreen(identifier),
      result);
  }
}

async function processText(args) {
  const filePath = args[2];
  const validate = args[3] === "--validate";

  try {
    fs.lstatSync(filePath);
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log('file or directory does not exist');
      return;
    }
  }

  if (fs.lstatSync(filePath).isFile()) {
    const result = await readFile(args[2]);
    printList(validate, result);
  } else if (fs.lstatSync(filePath).isDirectory()) {
    const files = await fs.promises.readdir(filePath)
    files.forEach(async (filename) => {
      const list = await readFile(`${filePath}/${filename}`)
      printList(validate, list, filename)
    })
  }
}

processText(args);