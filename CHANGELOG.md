# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased] -

### Added
### Changed
### Deprecated
### Removed
### Fixed
### Security

## [2.0.1] - 2022-07-08

### Changed
- updated dependencies
- package.json now also contains exports


## [2.0.0] - 2021-11-30

**BREAKING** This is a breaking release, a lot of function flags/types have been explicitly added and changed. Please refer to [the `@konfirm/stringify` mappings](https://www.npmjs.com/package/@konfirm/stringify#mappings) for the various types.

### Added
- **BREAKING** - Added a lot of function flags: `Async`, `Generator`, `Shorthand` (as object member)

### Changed
- **BREAKING** - `<empty string>` > `EmptyString`
- **BREAKING** - `undefined` > `Undefined`
- **BREAKING** - `class <name>` > `Class <name>`
- **BREAKING** - `anonymous class` > `AnonymousClass`
- **BREAKING** - `arrow function` > `ArrowFunction`
- **BREAKING** - `anonymous function` > `AnonymousFunction`

### Removed
- **BREAKING** `Stringifier`, is now replaced by the [`@konfirm/stringify`](https://github.com/konfirm/stringify) package


## [1.2.0] - 2021-11-29

### Added
- `assertion` - creates a Guard which will throw an AssertionError if it (or any nested assertion) fails
- `assert` - assert the given value
- `AssertionError` - the extend of `Error` thrown by `assertion` and `assert`
- `Stringifier` - simple mapper class which maps any value into a string representation

## [1.1.0] - 2021-11-28


### Added
- `isStrictStucture` - validating the structure with excess properties


## [1.0.4] - 2021-11-17

A couple of iterations figuring out the correct course of Github Actions


## [1.0.0] - 2021-11-17

_Initial release_

[Unreleased]: https://github.com/konfirm/guards/compare/v2.0.1...HEAD
[2.0.1]: https://github.com/konfirm/guards/compare/v2.0.0...v2.0.1
[2.0.0]: https://github.com/konfirm/guards/compare/v1.2.0...v2.0.0
[1.2.0]: https://github.com/konfirm/guards/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/konfirm/guards/compare/v1.0.4...v1.1.0
[1.0.4]: https://github.com/konfirm/guards/compare/v1.0.0...v1.0.4
[1.0.0]: https://github.com/konfirm/guards/releases/tag/v1.0.0
