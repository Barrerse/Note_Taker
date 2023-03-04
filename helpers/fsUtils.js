const fs = require('fs').promises;

// Function to read from a file
const readFromFile = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, 'utf8');
    return data;
  } catch (err) {
    console.error(err);
  }
};

// Function to write to a file
const writeToFile = async (filePath, content) => {
  try {
    await fs.writeFile(filePath, JSON.stringify(content));
  } catch (err) {
    console.error(err);
  }
};

// Function to append to a file
const readAndAppend = async (content, filePath) => {
  try {
    await fs.writeFile(filePath, JSON.stringify([...await readFromFile(filePath), content]));
  } catch (err) {
    console.error(err);
  }
};

// Function to delete a note from a file by ID
const deleteFromFile = async (id, filePath) => {
  try {
    const data = await readFromFile(filePath);
    const notes = JSON.parse(data).filter((note) => note.id !== id);
    await writeToFile(filePath, notes);
  } catch (err) {
    console.error(err);
  }
};

module.exports = { readFromFile, writeToFile, readAndAppend, deleteFromFile };
