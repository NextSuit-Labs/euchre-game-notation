#!/usr/bin/env node
/*
 * Copyright 2026 Write Words - Make Magic, LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

const { spawnSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const repoRoot = __dirname;

function buildWorkbenchBundle() {
  console.log("Generating Workbench standalone browser bundle...");

  const args = [
    "esbuild",
    "src/workbench/entry.ts",
    "--bundle",
    "--format=iife",
    "--global-name=EuchreNotation",
    "--platform=browser",
    "--alias:fs=./src/workbench/browser-shims.js",
    "--alias:path=./src/workbench/browser-shims.js",
    "--outfile=src/workbench/bundle.js",
  ];

  const isWindows = process.platform === "win32";
  const npxCmd = isWindows ? "npx.cmd" : "npx";

  const result = spawnSync(npxCmd, args, { cwd: repoRoot, stdio: "inherit", shell: true });

  if (result.error) {
    throw result.error;
  }
  if (result.status !== 0) {
    throw new Error(`esbuild exited with code ${result.status}`);
  }

  const outJs = path.join(repoRoot, "src", "workbench", "bundle.js");
  const stats = fs.statSync(outJs);
  console.log(`✓ Successfully generated "${outJs}" (${(stats.size / 1024).toFixed(1)} KB)`);
}

if (require.main === module) {
  buildWorkbenchBundle();
}

module.exports = { buildWorkbenchBundle };
