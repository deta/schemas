import * as fs from "fs/promises";
import Ajv from "ajv";
import * as YAML from "yaml";

const ajv = new Ajv();

type Test = {
  name: string;
  description?: string;
  valid: boolean;
  schema: string;
  version: number;
  data: Object;
};

async function getValidator(name: string, version: number) {
  let validate = ajv.getSchema(`${name}.v${version}`);
  if (!validate) {
    let schema;
    try {
      schema = JSON.parse(await fs.readFile(`../schemas/${name}/${name}.v${version}.schema.json`, { encoding: "utf-8" }));
    } catch (e) {
      console.error(`❌ Failed to load schema ${name} version ${version}`);
    }
    ajv.addSchema(schema, `${name}.v${version}`);
    validate = ajv.getSchema(`${name}.v${version}`);
  }
  if (!validate) {
    throw new Error(`Failed to load schema ${name} version ${version}`)
  }
  return validate;
}

async function runTests() {
  const tests: Test[] = YAML.parse(await fs.readFile("./tests.yaml", { encoding: "utf-8" }));
  for (const test of tests) {
    const validate = await getValidator(test.schema, test.version);
    const valid = validate(test.data);
    if (valid === test.valid) {
      console.log(`✅ ${test.valid ? "V" : "Inv"}alidated ${test.name}`);
    } else {
      console.error(
        `❌ Failed to ${test.valid ? "V" : "Inv"}alidate ${test.name}
          Description: ${test.description}
          Schema: ${test.schema}
          Version: ${test.version}
          Valid: ${test.valid}`
      );
    }
  }
}

runTests();
