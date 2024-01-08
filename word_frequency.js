const fs = require("fs");
const path = require("path");
const filePath = process.argv[2];

const STOP_WORDS = [
  "a",
  "an",
  "and",
  "are",
  "as",
  "at",
  "be",
  "by",
  "for",
  "from",
  "has",
  "he",
  "i",
  "in",
  "is",
  "it",
  "its",
  "of",
  "on",
  "that",
  "the",
  "to",
  "were",
  "will",
  "with",
];

function printWordFreq(file, callback) {
  // Read in `file` and print out the frequency of words in that file.
  fs.readFile(file, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      process.exit(1);
    }
    // TODO: write code to count the words in the file

    const wordCount = data
      // .replace(/[.,'\/#!$%\^&\*;:{}=\-_`~()]/g, "")
      .toLowerCase()
      .split(/\W+/)
      .sort();
    const frequency = {};

    for (const word of wordCount) {
      if (STOP_WORDS.includes(word)) {
        continue;
      }
      if (word in frequency) {
        frequency[word]++;
      } else {
        frequency[word] = 1;
      }
    }
    // console.log("Initial data read from file: ", data);
    callback(frequency);
  });
}

printWordFreq(filePath, (wordCount) => {
  console.log("The results from your word counts:", wordCount);
});
