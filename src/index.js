import fs from "fs";
import chalk from "chalk";

const extractLinks = (text) => {
  const regex = /\[([^[\]]*?)\]\((https?:\/\/[^\s?#.].[^\s]*)\)/gm;
  const linkFound = [...text.matchAll(regex)];
  const results = linkFound.map(([_, text, href]) => ({ text, href }));

  if (results.length !== 0) {
    return results.map((link, index) => `${index + 1}. Text: ${link.text}, Href: ${link.href}`).join("\n");
  } else {
    return 'There are no links in the file';
  }
}

const handleError = (error) => {
  throw new Error(chalk.red(`${error.code}: No such file in directory.`));
};

const getFile = async (path) => {
  try {
    const encoding = "utf-8";
    const text = await fs.promises.readFile(path, encoding);

    return extractLinks(text);
  } catch (error) {
    handleError(error)
  }
}

export default getFile;
