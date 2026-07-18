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

import { describe, expect, it } from "@jest/globals";
import * as fs from "fs";

const { generateProtoSchemasSource, outputPath } = require("../generate-proto-schemas.js") as {
  generateProtoSchemasSource: () => string;
  outputPath: string;
};

describe("generated proto schemas", () => {
  it("should stay in sync with the .proto source files", () => {
    const expected = generateProtoSchemasSource();
    const actual = fs.readFileSync(outputPath, "utf8");

    expect(actual).toBe(expected);
  });
});