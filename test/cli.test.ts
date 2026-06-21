import { describe, it, expect, beforeAll } from "@jest/globals";
import { execSync } from "child_process";
import * as path from "path";
import * as fs from "fs";

const cliPath = path.resolve(__dirname, "../dist/src/cli.js");

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
      // Clean up
      if (fs.existsSync(inputJsonPath)) fs.unlinkSync(inputJsonPath);
      if (fs.existsSync(outputBinPath)) fs.unlinkSync(outputBinPath);
      if (fs.existsSync(outputJsonPath)) fs.unlinkSync(outputJsonPath);
      if (fs.existsSync(tempDir)) fs.rmdirSync(tempDir);
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
      // Clean up
      if (fs.existsSync(inputJsonPath)) fs.unlinkSync(inputJsonPath);
      if (fs.existsSync(outputBinPath)) fs.unlinkSync(outputBinPath);
      if (fs.existsSync(outputJsonPath)) fs.unlinkSync(outputJsonPath);
      if (fs.existsSync(tempDir)) fs.rmdirSync(tempDir);
    }
  });
});
