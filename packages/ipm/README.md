# Infinity Package Manager

> [npm-shrinkwrap](https://docs.npmjs.com/cli/v9/commands/npm-shrinkwrap) based npm package manager
for installing modules while offline or experiencing issues with npm.

---

## What

`@infinitylist/installer` uses `npm-shrinkwrap` and points your `package-lock.json` at [npm](https://www.npmjs.com/)
tarballs checked into your project's source control, so you can install while offline, during a registry outage, or 
during the next [left-pad incident](https://blog.npmjs.org/post/141577284765/kik-left-pad-and-npm.html).

## How

1. Read `package-lock.json` or `npm-shrinkwrap.json`.
1. Download the exact same .tgz files that `npm install` fetches from
   [registry.npmjs.org](https://registry.npmjs.org).
1. Decompress the .tgz files into .tar files. This avoids storing binary files
   in Git and removes the cost of decompression during `npm install`.
1. Store the .tar files in your project at `node_infinity/*.tar`.
1. Rewrite `package-lock.json` to point at those instead of the registry.

Now your project can be installed while completely offline:

```diff
- npm install
+ npm ci --offline
```

The rest of the npm installation process is exactly the same. The only
difference is that no network activity is necessary when installing and building
your project. The `node_infinity` directory can be ignored in your editor
(much like is done with the `node_modules` directory), but is instead checked
into source control.

--- 

## Installation

> Requires npm@7 or higher.

### Install Base Module
```
npm install --global @infinitylist/installer
```

### Generate npm-shrinkwrap.json
```
npm shrinkwrap
```

## Usage

Run `infinity` every time you have modified and installed your dependencies to
produce a new `package-lock.json`.

```
Usage: infinity [options] [directory]

Options:
  -V, --version  output the version number
  -h, --help     display help for command
```