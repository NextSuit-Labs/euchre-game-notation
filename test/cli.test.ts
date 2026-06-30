import { describe, it, expect, beforeAll, afterAll } from "@jest/globals";
import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

const cliPath = path.resolve(__dirname, "../dist/src/cli.js");
const bitpackCliPath = path.resolve(__dirname, "../dist/src/cli-bitpack.js");

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
  "version": "1.0.0",
  "metadata": {
    "players": ["Player0", "Player1", "Player2", "Player3"],
    "initialScore": [0, 0]
  },
  "deals": [
    {
      "dealNumber": 0,
      "initialState": {
        "dealer": 3,
        "upCard": "Jd",
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
      version: "1.0.0",
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
      version: "1.0.0",
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

