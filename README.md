# Schemas

This repository contains JSON Schema definitions used by Deta software and services.

## List of schemas

|Name|Description|
|--|--|
|`spacefile`|Validation schema for the [Spacefile](https://deta.space/docs/en/reference/spacefile) configuration file.|

## Testing

This repository includes a utility to both validate schema files, and validate sample data (called "tests") to ensure schemas are valid and behave as intended.

To run the tests, run the following commands from the repository root:

```bash
npm install
npm test
```

Use `npm test -- --verbose` for verbose output.

To add a new test, create a new array item in the [`tests.ts`](./tests/tests.ts) file with the following structure:

```ts
{
  name: "Name of the test",
  description: "Description of what the test is testing",
  valid: "'true' if the validation should pass for the given data, 'false' otherwise",
  schema: "Name of the schema to test",
  version: "Version of the schema to test",
  data: "Sample data to use for testing",
},
```

## Adding a schema

Currently the minimum supported schema specification for running tests is draft-07.

To add a new schema, create a directory under [`schemas`](./schemas/) with the name of your schema, and put your JSON file in that directory. Add a version number to the filename in the format `<name>.v<version>.schema.json`. Add at least one test and run the tests to make sure everything is correct, see [Testing](#testing) for instructions.
