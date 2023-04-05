export type Test = {
  name: string;
  description: string;
  valid: boolean;
  schema: string;
  version: number;
  data: Object;
};

export const tests: Test[] = [
  {
    name: "Single Micro",
    description: "Tests a Spacefile configuration with a single Micro",
    valid: true,
    schema: "spacefile",
    version: 0,
    data: {
      v: 0,
      micros: [
        {
          name: "go-app",
          src: ".",
          engine: "custom",
          primary: true,
          commands: ["go get", "go build main.go"],
          include: ["main", "static"],
          run: "./main",
        },
      ],
    },
  },
  {
    name: "Multiple Micros",
    description: "Tests a Spacefile configuration with multiple Micros",
    valid: true,
    schema: "spacefile",
    version: 0,
    data: {
      v: 0,
      micros: [
        {
          name: "go-app",
          src: ".",
          engine: "custom",
          commands: ["go get", "go build main.go"],
          include: ["main", "static"],
          run: "./main",
        },
        {
          name: "python-app",
          src: ".",
          engine: "python3.9",
          primary: true,
        },
      ],
    },
  },
  {
    name: "Invalid version",
    description: "Tests invalid value for 'v' attribute",
    valid: false,
    schema: "spacefile",
    version: 0,
    data: {
      v: 1,
      micros: [
        {
          name: "micro-name",
          src: ".",
          engine: "custom",
          primary: true,
          path: "micro/url",
          run: "executable",
        },
      ],
    },
  },
  {
    name: "Serve property",
    description:
      "Tests a configuration with a static Micro and a 'serve' property",
    valid: true,
    schema: "spacefile",
    version: 0,
    data: {
      v: 0,
      micros: [
        {
          name: "static-micro",
          src: ".",
          engine: "static",
          serve: "dist",
        },
      ],
    },
  },
  {
    name: "Missing serve property",
    description:
      "Tests an invalid configuration with a static Micro and no 'serve' property",
    valid: false,
    schema: "spacefile",
    version: 0,
    data: {
      v: 0,
      micros: [
        {
          name: "static-micro",
          src: ".",
          engine: "static",
        },
      ],
    },
  },
  {
    name: "Unexpected serve property",
    description:
      "Tests an invalid configuration with a non-static Micro and a 'serve' property",
    valid: false,
    schema: "spacefile",
    version: 0,
    data: {
      v: 0,
      micros: [
        {
          name: "python-app",
          src: ".",
          engine: "python3.9",
          serve: "dist",
        },
      ],
    },
  },
  {
    name: "Static Micro without serve property",
    description:
      "Tests an invalid configuration with a static Micro and no 'serve' property",
    valid: false,
    schema: "spacefile",
    version: 0,
    data: {
      v: 0,
      micros: [
        {
          name: "static-micro",
          src: ".",
          engine: "static",
        },
      ],
    },
  },
  {
    name: "Static Micro with include property",
    description:
      "Tests an invalid configuration with a static Micro and an 'include' property",
    valid: false,
    schema: "spacefile",
    version: 0,
    data: {
      v: 0,
      micros: [
        {
          name: "static-micro",
          src: ".",
          engine: "react",
          include: ["dist"],
        },
      ],
    },
  },
  {
    name: "Dynamic Micro with serve property",
    description:
      "Tests an invalid configuration with a dynamic Micro and a 'serve' property",
    valid: false,
    schema: "spacefile",
    version: 0,
    data: {
      v: 0,
      micros: [
        {
          name: "python-app",
          src: ".",
          engine: "python3.9",
          serve: "dist",
        },
      ],
    },
  },

  // This test is currently not possible to validate because JSON Schema does not support unique item properties yet.
  // https://github.com/json-schema-org/json-schema-vocabularies/issues/22

  // {
  //   name: "Duplicate micros",
  //   description: "Tests an invalid configuration with duplicate Micro names",
  //   valid: false,
  //   schema: "spacefile",
  //   version: 0,
  //   data: {
  //     v: 0,
  //     micros: [
  //       {
  //         name: "go-app",
  //         src: ".",
  //         engine: "custom",
  //         commands: ["go get", "go build main.go"],
  //         include: ["main", "static"],
  //         run: "./main",
  //       },
  //       {
  //         name: "go-app",
  //         src: ".",
  //         engine: "python3.9",
  //         primary: true,
  //       },
  //     ],
  //   },
  // },

  // Tests for the 'primary' property are currently not possible to validate.

  // {
  //   name: "Multiple primary Micros",
  //   description: "Tests an invalid configuration with multiple primary Micros",
  //   valid: false,
  //   schema: "spacefile",
  //   version: 0,
  //   data: {
  //     v: 0,
  //     micros: [
  //       {
  //         name: "micro-1",
  //         src: ".",
  //         engine: "python3.9",
  //         primary: true,
  //       },
  //       {
  //         name: "micro-2",
  //         src: ".",
  //         engine: "python3.9",
  //         primary: true,
  //       },
  //     ],
  //   },
  // },

  // {
  //   name: "No primary Micro",
  //   description: "Tests an invalid configuration with multiple Micros and no primary Micro",
  //   valid: false,
  //   schema: "spacefile",
  //   version: 0,
  //   data: {
  //     v: 0,
  //     micros: [
  //       {
  //         name: "micro-1",
  //         src: ".",
  //         engine: "python3.9",
  //       },
  //       {
  //         name: "micro-2",
  //         src: ".",
  //         engine: "python3.9",
  //       },
  //     ],
  //   },
  // },
];
