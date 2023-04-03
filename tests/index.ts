import * as fs from "fs/promises";
import Ajv from "ajv-draft-04";
import * as YAML from "yaml";

const ajv = new Ajv();

async function getSchema(filename: string): Promise<JSON> {
  const name = filename.split(".")[0];
  const contents = await fs.readFile(
    `../schemas/${name}/${filename}`,
    { encoding: "utf-8" },
  );
  try {
    return JSON.parse(contents);
  } catch (e) {
    throw new Error(`Failed to load schema ${filename}`);
  }
}

async function getTest(schema: string, version: string, name: string, positive: boolean = true) {
  const contents = await fs.readFile(
    `./${positive ? "positive" : "negative"}/${schema}/${version}/${name}`,
    { encoding: "utf-8" },
  );
  try {
    return JSON.parse(contents);
  } catch (e) {
    try {
      return YAML.parse(contents);
    } catch (e) {
      throw new Error(`Failed to load test ${schema}/${version}/${name}`);
    }
  }
}

async function runTests() {
  const schemas = await fs.readdir("../schemas");
  for (const schema of schemas) {
    const schemaFiles = await fs.readdir(`../schemas/${schema}`);
    for (const filename of schemaFiles) {
      const version = filename.split(".")[1];
      const positiveTests = await fs.readdir(`./positive/${schema}/${version}`);
      for (const test of positiveTests) {
        const data = await getTest(schema, version, test);
        if (!ajv.validate(await getSchema(filename), data)) {
          console.error(`❌ Failed to validate ${test} using schema ${schema} version ${version}`);
        } else {
          console.log(`✅ Validated ${test} using schema ${schema} version ${version}`);
        }
      }

      const negativeTests = await fs.readdir(`./negative/${schema}/${version}`);
      for (const test of negativeTests) {
        const data = await getTest(schema, version, test, false);
        if (ajv.validate(await getSchema(filename), data)) {
          console.error(`❌ Failed to invalidate ${test} using schema ${schema} version ${version}`);
        } else {
          console.log(`✅ Invalidated ${test} using schema ${schema} version ${version}`);
        }
      }
    }
  }
}

runTests();
