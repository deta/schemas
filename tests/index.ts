import * as fs from "fs/promises";
import Ajv from "ajv";
import * as YAML from "yaml";

const ajv = new Ajv();
const verbose = process.argv.includes("--verbose") || process.argv.includes("-v");

type Test = {
  name: string;
  description?: string;
  valid: boolean;
  schema: string;
  version: number;
  data: Object;
};

async function getValidator(schemaName: string, version: number) {
  let validator = ajv.getSchema(`${schemaName}.v${version}`);
  if (!validator) {
    let schema;
    try {
      schema = JSON.parse(
        await fs.readFile(`../schemas/${schemaName}/${schemaName}.v${version}.schema.json`, { encoding: "utf-8" })
      );
    } catch (error) {
      if (verbose) {
        console.error(error);
      }
      return;
    }
    ajv.addSchema(schema, `${schemaName}.v${version}`);
    validator = ajv.getSchema(`${schemaName}.v${version}`);
  }
  return validator;
}

async function runTests() {
  const tests: Test[] = YAML.parse(await fs.readFile("./tests.yaml", { encoding: "utf-8" }));
  for (const test of tests) {
    const validator = await getValidator(test.schema, test.version);
    if (!validator) {
      console.error(`❌ Failed to load schema "${test.schema}" version ${test.version}`);
      continue;
    }
    const valid = validator(test.data);
    const details = verbose
      ? `\n\tDescription: ${test.description}\n` +
        `\tValid: ${test.valid}\n` +
        `\tSchema: ${test.schema}\n` +
        `\tVersion: ${test.version}\n` +
        `\tErrors: ${validator.errors?.map((error) => `\n\t\t${error.instancePath}: ${error.message}`).join("")}\n`
      : "";
    if (valid === test.valid) {
      console.log(`✅ ${test.valid ? "V" : "Inv"}alidated "${test.name}"` + details);
    } else {
      console.error(`❌ Failed to ${test.valid ? "v" : "inv"}alidate "${test.name}"` + details);
    }
  }
}

runTests();
