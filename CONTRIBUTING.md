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

## Specification Guidelines

Because EGN operates on deterministic minimalism, any proposed additions to the standard should avoid duplicating game states that can be easily calculated (such as trick winners or score mutations).

## Licensing

By contributing to EGN, you agree that your contributions will be licensed under the Apache 2.0 License.