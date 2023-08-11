import fs from 'fs';
import chalk from 'chalk';

function extractLinks(text) {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const captures = [...text.matchAll(regex)];
  const results = captures.map(capture => ({[capture[1]]: capture[2]}))
  return results.length !== 0 ? results : 'no links found in the file';
}

function handleError(error) {
  console.log(error);
  throw new Error(chalk.red(error.code, 'no file in the directory'));
}

async function readFile(filePath) {
  try {
    const encoding = 'utf-8';
    const text = await fs.promises.readFile(filePath, encoding)
    return extractLinks(text);
  } catch (error) {
    handleError(error)
  }
}

export default readFile;
