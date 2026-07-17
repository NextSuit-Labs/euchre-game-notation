#!/usr/bin/env node
/**
 * Script to generate condensed and expanded binary files for all EGN examples
 * Usage: node generate-example-binaries.js
 */

const fs = require("fs");
const path = require("path");
const { convertEgnJsonToBin } = require("./dist/src/converter");

const EXAMPLES_DIR = path.resolve(__dirname, "examples");

// Get all .egn files from the main examples folder (not subdirectories)
const exampleFiles = fs.readdirSync(EXAMPLES_DIR)
  .filter(file => file.endsWith(".egn") && fs.statSync(path.join(EXAMPLES_DIR, file)).isFile());

console.log(`Found ${exampleFiles.length} EGN files to process\n`);

exampleFiles.forEach(fileName => {
  const filePath = path.join(EXAMPLES_DIR, fileName);
  const fileContent = fs.readFileSync(filePath, "utf8");

  // Generate expanded binary
  const expandedBinPath = path.join(EXAMPLES_DIR, `${fileName.substring(0, fileName.length - 4)}.expanded.egnb`);
  try {
    convertEgnJsonToBin(fileContent, expandedBinPath, false);
    const expandedSize = fs.statSync(expandedBinPath).size;
    console.log(`✓ ${fileName}`);
    console.log(`  └─ Expanded: ${expandedBinPath} (${expandedSize} bytes)`);
  } catch (error) {
    console.error(`✗ Failed to generate expanded binary for ${fileName}:`, error.message);
  }

  // Generate condensed binary
  const condensedBinPath = path.join(EXAMPLES_DIR, `${fileName.substring(0, fileName.length - 4)}.egnb`);
  try {
    convertEgnJsonToBin(fileContent, condensedBinPath, true);
    const condensedSize = fs.statSync(condensedBinPath).size;
    console.log(`  └─ Condensed: ${condensedBinPath} (${condensedSize} bytes)`);
  } catch (error) {
    console.error(`✗ Failed to generate condensed binary for ${fileName}:`, error.message);
  }

  console.log();
});

console.log("Done! Binary files generated in examples folder.");
