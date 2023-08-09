import chalk from "chalk";
import fs from "fs";
import getFile from "./index.js";

const path = process.argv;

const printList = (result, id = "") =>
  console.log(chalk.yellow("Links list"), chalk.black.bgGreen(id), result);

const processText = async (arg) => {
  const path = arg[2];

  try {
    fs.lstatSync(path);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.log("No such file or directory!");
      return;
    }
  }
  
  if (fs.lstatSync(path).isFile()) {
    const result = await getFile(path);
    printList(result);
  } else if (fs.lstatSync(path).isDirectory()) {
    const files = await fs.promises.readdir(path);

    files.forEach(async (fileName) => {
      const list = await getFile(`${path}/${fileName}`);
      printList(list, fileName);
    });
  }
};

processText(path);
