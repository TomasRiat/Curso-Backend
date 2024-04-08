import fs from "fs";

const destinationFile = "./currentDate.txt";
const configFile = "./config.json";

const current = new Date().toLocaleString();

const processFile = async (file, content, charset) => {
  await fs.promises.writeFile(file, content, charset);
  return await fs.promises.readFile(file, charset);
};

console.log(await processFile(destinationFile, `${current}\n`, "utf-8"));

const writeFile = async (file, content, charset) => {
  await fs.promises.writeFile(file, content, charset);
};

const readFile = async (file) => {
  return await fs.promises.readFile(file);
};

const content = {
  PORT: 8000,
  K: 3.22,
};

await writeFile(configFile, JSON.stringify(content));

const data = await readFile(configFile);
const parsedDAta = await JSON.parse(data);
console.log(parsedDAta.PORT);
