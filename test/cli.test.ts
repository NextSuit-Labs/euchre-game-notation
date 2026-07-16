import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";
import { collectAnalysisPropertyNames } from "../src/cli-baseline-egn";
import { validateEGN } from "../src/validator";
import { VERSION } from "../src/version";

const cliPath = path.resolve(__dirname, "../dist/src/cli.js");
const baselineEgnCliPath = path.resolve(__dirname, "../dist/src/cli-baseline-egn.js");
const bitpackCliPath = path.resolve(__dirname, "../dist/src/cli-bitpack.js");
const upgradeCliPath = path.resolve(__dirname, "../dist/src/cli-upgrade.js");

function deleteFileSync(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  for (let i = 0; i < 5; i++) {
    try {
      fs.unlinkSync(filePath);
      return;
    } catch (err: any) {
      if (err.code === "EBUSY" || err.code === "EPERM") {
        // Wait 50ms synchronously
        const end = Date.now() + 50;
        while (Date.now() < end) {}
      } else {
        throw err;
      }
    }
  }
}

function removeDirSync(dirPath: string) {
  if (!fs.existsSync(dirPath)) return;
  for (let i = 0; i < 5; i++) {
    try {
      fs.rmdirSync(dirPath);
      return;
    } catch (err: any) {
      if (err.code === "EBUSY" || err.code === "ENOTEMPTY" || err.code === "EPERM") {
        // Wait 50ms synchronously
        const end = Date.now() + 50;
        while (Date.now() < end) {}
      } else {
        throw err;
      }
    }
  }
}

const validMockData = {
  "fileType": "Euchre Game Notation",
  "version": VERSION,
  "metadata": {
    "players": ["Player0", "Player1", "Player2", "Player3"],
    "initialScore": [0, 0]
  },
  "deals": [
    {
      "dealNumber": 0,
      "initialState": {
        "dealer": 3,
        "upCard": "Jd"
      },
      "phases": [
        {
          "phaseNumber": 0,
          "type": "EUCHRE_BIDDING",
          "calls": ["Pass", "Pass", "Pass", "Order"],
          "isAlone": false
        }
      ]
    }
  ]
};

describe("EGN Converter CLI", () => {
  // Ensure the project is built before running CLI tests
  beforeAll(() => {
    execSync("npm run build", { cwd: path.resolve(__dirname, "..") });
  });

  it("should discover analysis-only properties from the schema metadata", () => {
    const analysisPropertyNames = collectAnalysisPropertyNames();
    expect(analysisPropertyNames).toEqual(expect.arrayContaining(["callAnnotations", "playAnnotations", "alternativeLines"]));
  });

  it("should show help when run with --help, -h, or insufficient arguments", () => {
    const stdoutHelp = execSync(`node "${cliPath}" --help`).toString();
    expect(stdoutHelp).toContain("Usage:");
    expect(stdoutHelp).toContain("egn-convert");

    const stdoutH = execSync(`node "${cliPath}" -h`).toString();
    expect(stdoutH).toContain("Usage:");

    const stdoutNoArgs = execSync(`node "${cliPath}"`).toString();
    expect(stdoutNoArgs).toContain("Usage:");
  });

  it("should fail and exit with code 1 when missing output path", () => {
    let threw = false;
    try {
      execSync(`node "${cliPath}" input.egn --expanded`, { stdio: "pipe" });
    } catch (err: any) {
      threw = true;
      expect(err.status).toBe(1);
    }
    expect(threw).toBe(true);
  });

  it("should fail when input file does not exist", () => {
    let threw = false;
    try {
      execSync(`node "${cliPath}" non_existent_file_xyz.egn output.bin`, { stdio: "pipe" });
    } catch (err: any) {
      threw = true;
      expect(err.status).toBe(1);
    }
    expect(threw).toBe(true);
  });

  it("should successfully convert JSON to Binary and back using CLI", () => {
    const tempDir = path.resolve(__dirname, "../temp_cli_test");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const inputJsonPath = path.join(tempDir, "input.egn");
    const outputBinPath = path.join(tempDir, "output.bin");
    const outputJsonPath = path.join(tempDir, "output.egn");

    fs.writeFileSync(inputJsonPath, JSON.stringify(validMockData), "utf8");

    try {
      // 1. Convert JSON to Bin (Default Condensed)
      const res1 = execSync(`node "${cliPath}" "${inputJsonPath}" "${outputBinPath}"`).toString();
      expect(res1).toContain("Conversion completed successfully!");
      expect(fs.existsSync(outputBinPath)).toBe(true);

      // 2. Convert Bin to JSON (Default Condensed)
      const res2 = execSync(`node "${cliPath}" "${outputBinPath}" "${outputJsonPath}"`).toString();
      expect(res2).toContain("Conversion completed successfully!");
      expect(fs.existsSync(outputJsonPath)).toBe(true);

      // 3. Verify content
      const finalJson = JSON.parse(fs.readFileSync(outputJsonPath, "utf8"));
      expect(finalJson.fileType).toBe(validMockData.fileType);
      expect(finalJson.version).toBe(validMockData.version);
      expect(finalJson.deals.length).toBe(1);
    } finally {
      deleteFileSync(inputJsonPath);
      deleteFileSync(outputBinPath);
      deleteFileSync(outputJsonPath);
      removeDirSync(tempDir);
    }
  });

  it("should successfully convert JSON to Binary and back in expanded mode", () => {
    const tempDir = path.resolve(__dirname, "../temp_cli_test_expanded");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const inputJsonPath = path.join(tempDir, "input.egn");
    const outputBinPath = path.join(tempDir, "output.bin");
    const outputJsonPath = path.join(tempDir, "output.egn");

    fs.writeFileSync(inputJsonPath, JSON.stringify(validMockData), "utf8");

    try {
      // 1. Convert JSON to Bin (--expanded)
      const res1 = execSync(`node "${cliPath}" "${inputJsonPath}" "${outputBinPath}" --expanded`).toString();
      expect(res1).toContain("Conversion completed successfully!");
      expect(fs.existsSync(outputBinPath)).toBe(true);

      // 2. Convert Bin to JSON (--expanded)
      const res2 = execSync(`node "${cliPath}" "${outputBinPath}" "${outputJsonPath}" --expanded`).toString();
      expect(res2).toContain("Conversion completed successfully!");
      expect(fs.existsSync(outputJsonPath)).toBe(true);

      // 3. Verify content
      const finalJson = JSON.parse(fs.readFileSync(outputJsonPath, "utf8"));
      expect(finalJson.fileType).toBe(validMockData.fileType);
      expect(finalJson.metadata.players).toEqual(validMockData.metadata.players);
    } finally {
      deleteFileSync(inputJsonPath);
      deleteFileSync(outputBinPath);
      deleteFileSync(outputJsonPath);
      removeDirSync(tempDir);
    }
  });

  it("should write a stripped baseline EGN and preserve the requested output format", () => {
    const tempDir = path.resolve(__dirname, "../temp_cli_baseline_output_test");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const inputJsonPath = path.join(tempDir, "input.egn");
    const outputJsonPath = path.join(tempDir, "output.egn");
    const outputBinPath = path.join(tempDir, "output.bin");

    const egnWithAnnotations = {
      ...validMockData,
      deals: [
        {
          ...validMockData.deals[0],
          alternativeLines: [{ branchIndex: 1, phases: [{ phaseNumber: 0, type: "EUCHRE_BIDDING", calls: ["Pass", "Pass", "Order", "Pass"] }] }],
          phases: [
            {
              ...validMockData.deals[0].phases[0],
              callAnnotations: { 0: ["annotation"] },
            },
          ],
        },
      ],
    };

    fs.writeFileSync(inputJsonPath, JSON.stringify(egnWithAnnotations), "utf8");

    try {
      execSync(`node "${baselineEgnCliPath}" "${inputJsonPath}" "${outputJsonPath}"`).toString();
      const strippedJson = JSON.parse(fs.readFileSync(outputJsonPath, "utf8"));
      expect(strippedJson.deals[0].phases[0]).not.toHaveProperty("callAnnotations");
      expect(strippedJson.deals[0]).not.toHaveProperty("alternativeLines");

      execSync(`node "${baselineEgnCliPath}" "${inputJsonPath}" "${outputBinPath}"`).toString();
      const outputBuffer = fs.readFileSync(outputBinPath);
      expect(outputBuffer.length).toBeGreaterThan(0);
    } finally {
      deleteFileSync(inputJsonPath);
      deleteFileSync(outputJsonPath);
      deleteFileSync(outputBinPath);
      removeDirSync(tempDir);
    }
  });

  it("should hash a normalized baseline EGN from JSON, condensed binary, and expanded binary", () => {
    const tempDir = path.resolve(__dirname, "../temp_cli_baseline_hash_test");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const inputJsonPath = path.join(tempDir, "input.egn");
    const baselineJsonPath = path.join(tempDir, "baseline.egn");
    const condensedBinPath = path.join(tempDir, "condensed.bin");
    const expandedBinPath = path.join(tempDir, "expanded.bin");

    const baseEgn = {
      ...validMockData,
      deals: [
        {
          ...validMockData.deals[0],
          phases: [
            {
              ...validMockData.deals[0].phases[0],
            },
          ],
        },
      ],
    };

    const egnWithAnnotations = {
      ...baseEgn,
      deals: [
        {
          ...baseEgn.deals[0],
          alternativeLines: [
            {
              branchIndex: 1,
              phases: [
                {
                  phaseNumber: 0,
                  type: "EUCHRE_BIDDING",
                  calls: ["Pass", "Pass", "Order", "Pass"],
                  callAnnotations: { 1: ["annotated call"] },
                },
              ],
            },
          ],
          phases: [
            {
              ...baseEgn.deals[0].phases[0],
              callAnnotations: { 0: ["annotation"] },
            },
          ],
        },
      ],
    };

    fs.writeFileSync(inputJsonPath, JSON.stringify(egnWithAnnotations), "utf8");
    fs.writeFileSync(baselineJsonPath, JSON.stringify(baseEgn), "utf8");

    try {
      const jsonHash = execSync(`node "${baselineEgnCliPath}" "${inputJsonPath}" --hash`).toString().trim();
      expect(jsonHash).toMatch(/^[a-f0-9]{64}$/);

      execSync(`node "${cliPath}" "${baselineJsonPath}" "${condensedBinPath}"`).toString();
      const condensedHash = execSync(`node "${baselineEgnCliPath}" "${condensedBinPath}" --hash`).toString().trim();
      expect(condensedHash).toBe(jsonHash);

      execSync(`node "${cliPath}" "${baselineJsonPath}" "${expandedBinPath}" --expanded`).toString();
      const expandedHash = execSync(`node "${baselineEgnCliPath}" "${expandedBinPath}" --hash --expanded`).toString().trim();
      expect(expandedHash).toBe(jsonHash);
    } finally {
      deleteFileSync(inputJsonPath);
      deleteFileSync(baselineJsonPath);
      deleteFileSync(condensedBinPath);
      deleteFileSync(expandedBinPath);
      removeDirSync(tempDir);
    }
  });

  it("should hash VWEC Finals fixtures and their binary representations to the same baseline hash", () => {
    const tempDir = path.resolve(__dirname, "../temp_cli_baseline_vwec_test");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }

    const baseInputPath = path.resolve(__dirname, "../examples/VWEC Finals.egn");
    const annotatedInputPath = path.resolve(__dirname, "../examples/VWEC Finals Annotated.egn");
    const baseCondensedBinPath = path.join(tempDir, "vwec-condensed.bin");
    const baseExpandedBinPath = path.join(tempDir, "vwec-expanded.bin");
    const annotatedCondensedBinPath = path.join(tempDir, "vwec-annotated-condensed.bin");
    const annotatedExpandedBinPath = path.join(tempDir, "vwec-annotated-expanded.bin");

    try {
      execSync(`node "${cliPath}" "${baseInputPath}" "${baseCondensedBinPath}"`).toString();
      execSync(`node "${cliPath}" "${baseInputPath}" "${baseExpandedBinPath}" --expanded`).toString();
      execSync(`node "${cliPath}" "${annotatedInputPath}" "${annotatedCondensedBinPath}"`).toString();
      execSync(`node "${cliPath}" "${annotatedInputPath}" "${annotatedExpandedBinPath}" --expanded`).toString();

      const baseJsonHash = execSync(`node "${baselineEgnCliPath}" "${baseInputPath}" --hash`).toString().trim();
      const baseCondensedHash = execSync(`node "${baselineEgnCliPath}" "${baseCondensedBinPath}" --hash`).toString().trim();
      const baseExpandedHash = execSync(`node "${baselineEgnCliPath}" "${baseExpandedBinPath}" --hash --expanded`).toString().trim();
      const annotatedJsonHash = execSync(`node "${baselineEgnCliPath}" "${annotatedInputPath}" --hash`).toString().trim();
      const annotatedCondensedHash = execSync(`node "${baselineEgnCliPath}" "${annotatedCondensedBinPath}" --hash`).toString().trim();
      const annotatedExpandedHash = execSync(`node "${baselineEgnCliPath}" "${annotatedExpandedBinPath}" --hash --expanded`).toString().trim();

      expect(baseJsonHash).toMatch(/^[a-f0-9]{64}$/);
      expect(baseCondensedHash).toBe(baseJsonHash);
      expect(baseExpandedHash).toBe(baseJsonHash);
      expect(annotatedJsonHash).toBe(baseJsonHash);
      expect(annotatedCondensedHash).toBe(baseJsonHash);
      expect(annotatedExpandedHash).toBe(baseJsonHash);
    } finally {
      deleteFileSync(baseCondensedBinPath);
      deleteFileSync(baseExpandedBinPath);
      deleteFileSync(annotatedCondensedBinPath);
      deleteFileSync(annotatedExpandedBinPath);
      removeDirSync(tempDir);
    }
  });

  it("should fail and exit with code 1 when input JSON is malformed", () => {
    const tempDir = path.resolve(__dirname, "../temp_cli_test_malformed");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const inputJsonPath = path.join(tempDir, "input_malformed.egn");
    const outputBinPath = path.join(tempDir, "output_malformed.bin");

    // Write malformed JSON string (missing closing bracket/brace)
    fs.writeFileSync(inputJsonPath, '{"fileType": "Euchre Game Notation"', "utf8");

    let threw = false;
    let errOutput = "";
    try {
      execSync(`node "${cliPath}" "${inputJsonPath}" "${outputBinPath}"`, { stdio: "pipe" });
    } catch (err: any) {
      threw = true;
      expect(err.status).toBe(1);
      errOutput = err.stderr.toString();
    } finally {
      deleteFileSync(inputJsonPath);
      deleteFileSync(outputBinPath);
      removeDirSync(tempDir);
    }

    expect(threw).toBe(true);
    expect(errOutput).toContain("Error during conversion:");
  });

  it("should fail and exit with code 1 when input binary is corrupted", () => {
    const tempDir = path.resolve(__dirname, "../temp_cli_test_corrupted");
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
    const inputBinPath = path.join(tempDir, "input_corrupted.bin");
    const outputJsonPath = path.join(tempDir, "output_corrupted.egn");

    // Write garbage bytes
    fs.writeFileSync(inputBinPath, Buffer.from([0x00, 0x11, 0x22, 0x33, 0xff]));

    let threw = false;
    let errOutput = "";
    try {
      execSync(`node "${cliPath}" "${inputBinPath}" "${outputJsonPath}"`, { stdio: "pipe" });
    } catch (err: any) {
      threw = true;
      expect(err.status).toBe(1);
      errOutput = err.stderr.toString();
    } finally {
      deleteFileSync(inputBinPath);
      deleteFileSync(outputJsonPath);
      removeDirSync(tempDir);
    }

    expect(threw).toBe(true);
    expect(errOutput).toContain("Error during conversion:");
  });

  function testUpgradeValidation(filename: string) {
    const conversionExamplesDir = path.resolve(__dirname, "../examples/conversion examples");
    const testEgnPath = path.join(conversionExamplesDir, filename);
    const tempDir = path.resolve(__dirname, "../temp_upgrade_test");
    const upgradedPath = path.join(tempDir, `${filename}-upgraded.egn`);

    // Skip if file doesn't exist (development flexibility)
    if (!fs.existsSync(testEgnPath)) {
      console.log(`Skipping upgrade test: ${testEgnPath} not found`);
      return;
    }

    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }

    try {
      // 1. Verify that original v1.0.0 file does NOT validate
      const originalContent = fs.readFileSync(testEgnPath, "utf8");
      const originalJson = JSON.parse(originalContent);
      const originalValidation = validateEGN(originalJson);
      expect(originalValidation.isValid).toBe(false);
      expect(originalValidation.errors).toBeDefined();
      expect(originalValidation.errors).not.toBeNull();
      if (originalValidation.errors) {
        expect(originalValidation.errors.length).toBeGreaterThan(0);
        // Legacy files can fail either version-family checks or snake_case/camelCase schema mismatches.
        expect(originalValidation.errors[0].message).toMatch(/must match pattern|must NOT have additional properties|must have required property/);
      }

      // 2. Run upgrade tool to convert to v1.2 format
      execSync(`node "${upgradeCliPath}" "${testEgnPath}" "${upgradedPath}"`).toString();
      expect(fs.existsSync(upgradedPath)).toBe(true);

      // 3. Verify that upgraded file now DOES validate
      const upgradedContent = fs.readFileSync(upgradedPath, "utf8");
      const upgradedJson = JSON.parse(upgradedContent);
      expect(upgradedJson.version).toBe(VERSION);
      // Verify snake_case fields have been converted to camelCase
      expect(upgradedJson.deals[0].initialState).toBeDefined();
      expect(upgradedJson.deals[0].initialState.player_cards).toBeUndefined();
      // Verify kitty field was removed (should not exist)
      expect(upgradedJson.deals[0].initialState.kitty).toBeUndefined();
      // Verify validation now passes
      const upgradedValidation = validateEGN(upgradedJson);
      expect(upgradedValidation.isValid).toBe(true);
      expect(upgradedValidation.errors).toEqual(null);
    } finally {
      deleteFileSync(upgradedPath);
      removeDirSync(tempDir);
    }
  }

  it("should upgrade v1.0.0 test.egn from conversion examples (failing validation -> passing validation)", () => {
    testUpgradeValidation("test.egn");
  });

  it("should upgrade v1.0.0 test_annotated.egn from conversion examples (failing validation -> passing validation)", () => {
    testUpgradeValidation("test_annotated.egn");
  });

  it("should upgrade v1.0.0 test_timingsLayouts.egn from conversion examples (failing validation -> passing validation)", () => {
    testUpgradeValidation("test_timingsLayouts.egn");
  });
});

describe("EGN Deal Bitpacker CLI", () => {
  const tempDir = path.resolve(__dirname, "../temp_cli_bitpack_test");

  beforeAll(() => {
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir);
    }
  });

  afterAll(() => {
    removeDirSync(tempDir);
  });

  it("should show help when run with --help or -h", () => {
    const stdoutHelp = execSync(`node "${bitpackCliPath}" --help`).toString();
    expect(stdoutHelp).toContain("Usage:");
    expect(stdoutHelp).toContain("egn-bitpack-deal");

    const stdoutH = execSync(`node "${bitpackCliPath}" -h`).toString();
    expect(stdoutH).toContain("Usage:");
  });

  it("should fail when missing input file path", () => {
    let threw = false;
    let errOutput = "";
    try {
      execSync(`node "${bitpackCliPath}"`, { stdio: "pipe" });
    } catch (err: any) {
      threw = true;
      expect(err.status).toBe(1);
      errOutput = err.stderr.toString();
    }
    expect(threw).toBe(true);
    expect(errOutput).toContain("Error: Missing input EGN file path.");
  });

  it("should fail when input file does not exist", () => {
    let threw = false;
    let errOutput = "";
    try {
      execSync(`node "${bitpackCliPath}" non_existent_file_xyz.egn`, { stdio: "pipe" });
    } catch (err: any) {
      threw = true;
      expect(err.status).toBe(1);
      errOutput = err.stderr.toString();
    }
    expect(threw).toBe(true);
    expect(errOutput).toContain("Error: Input file not found");
  });

  it("should output all deals as base64url strings when --deals is not specified", () => {
    const testJsonPath = path.join(tempDir, "all_deals.egn");
    const testData = {
      fileType: "Euchre Game Notation",
      version: VERSION,
      deals: [
        validMockData.deals[0], // deal 0 is an object
        "AQAFA3dKZAABAgIDBAE"  // deal 1 is already a string
      ]
    };
    fs.writeFileSync(testJsonPath, JSON.stringify(testData), "utf8");

    try {
      const stdout = execSync(`node "${bitpackCliPath}" "${testJsonPath}"`).toString().trim();
      const lines = stdout.split(/\r?\n/);
      expect(lines.length).toBe(2);
      expect(lines[0]).toMatch(/^[A-Za-z0-9_-]+$/); // Should be base64url
      expect(lines[1]).toBe("AQAFA3dKZAABAgIDBAE"); // Already a string, output as-is
    } finally {
      deleteFileSync(testJsonPath);
    }
  });

  it("should output only specified deals when --deals is specified", () => {
    const testJsonPath = path.join(tempDir, "specific_deals.egn");
    const testData = {
      fileType: "Euchre Game Notation",
      version: VERSION,
      deals: [
        { ...validMockData.deals[0], dealNumber: 0 },
        "AQAFA3dKZAABAgIDBAE", // deal 1
        { ...validMockData.deals[0], dealNumber: 2 }
      ]
    };
    fs.writeFileSync(testJsonPath, JSON.stringify(testData), "utf8");

    try {
      // Test --deals 1
      const stdout1 = execSync(`node "${bitpackCliPath}" "${testJsonPath}" --deals 1`).toString().trim();
      expect(stdout1).toBe("AQAFA3dKZAABAgIDBAE");

      // Test --deals=0,2
      const stdout2 = execSync(`node "${bitpackCliPath}" "${testJsonPath}" --deals=0,2`).toString().trim();
      const lines2 = stdout2.split(/\r?\n/);
      expect(lines2.length).toBe(2);
      expect(lines2[0]).not.toBe("AQAFA3dKZAABAgIDBAE");
      expect(lines2[1]).not.toBe("AQAFA3dKZAABAgIDBAE");
    } finally {
      deleteFileSync(testJsonPath);
    }
  });
});

