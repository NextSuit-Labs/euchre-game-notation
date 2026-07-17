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