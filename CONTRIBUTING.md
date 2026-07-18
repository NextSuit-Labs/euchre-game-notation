# Contributing to Euchre Game Notation (EGN)

First off, thank you for considering contributing to Euchre Game Notation! It's people like you that make EGN a robust, open-source standard.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please be respectful and constructive in your communications.

## How Can I Contribute?

### Reporting Bugs
If you find a bug in the specification or in how standard parsers should interpret the `.egn` files, please open an issue. Include:
* A clear and descriptive title.
* The exact version of the EGN specification you are referring to.
* A sample `.egn` snippet demonstrating the issue.
* What the expected behavior should be.

### Suggesting Enhancements
We welcome suggestions for new features or improvements to the EGN standard. Please open an issue and:
* Provide a clear description of the proposed enhancement.
* Explain why this enhancement would be useful to most users.
* Keep the core philosophy of "Deterministic Minimalism" in mind.

### Submitting Pull Requests
1. Fork the repository and create your branch from `main`.
2. If you've added or changed the specification, update the documentation accordingly.
3. Ensure your `.egn` JSON examples are valid and properly formatted.
4. Make sure your commit messages are clear and descriptive.
5. Submit your Pull Request!

## Generated Files

The protobuf schema source of truth lives in the `.proto` files under `schemas/`.

- Do not edit `src/proto-schemas.ts` by hand.
- After changing `schemas/egn-common.proto`, `schemas/egn.proto`, or `schemas/egn-expanded.proto`, run `npm run generate:proto-schemas`.
- `npm run build` and `npm test` both regenerate `src/proto-schemas.ts` automatically before compiling or running tests.

There is also a Jest sync test that will fail if `src/proto-schemas.ts` is out of date with the files in `schemas/`.

## Specification Guidelines

Because EGN operates on deterministic minimalism, any proposed additions to the standard should avoid duplicating game states that can be easily calculated (such as trick winners or score mutations).

## Licensing

By contributing to EGN, you agree that your contributions will be licensed under the Apache 2.0 License.

## Source File Header Policy

To keep licensing clear and consistent, this repository uses the following header policy for source files:

- Use the full Apache 2.0 header block in comment-friendly source files (`.ts`, `.js`, `.css`, `.html`).
- Keep shebang lines (`#!/usr/bin/env node`) as line 1; place the header immediately after.
- For HTML files, use an HTML comment form of the same header text.
- Do not add headers to generated files (for example `src/proto-schemas.ts`), since they are regenerated from source.
- Do not add headers to formats that do not support comments (for example JSON and binary artifacts).
- If a file already has a different required third-party notice, preserve that notice.

Standard copyright line for this repository:

`Copyright 2026 {your name / company name}`

Canonical full header text:

```ts
/*
 * Copyright 2026 {your name / company name}
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
```

Optional short form for files where the project chooses SPDX-style notices:

`SPDX-License-Identifier: Apache-2.0`