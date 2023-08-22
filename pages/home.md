# Node SDK
The official node sdk for interacting with all of our services and modules.

---

## Packages
- [infinitylist/sdk](../packages/sdk/README.md)
- [infinitylist/client](../packages/client/README.md)
- [infinitylist/emitter](../packages/emitter/README.md)
- [infinitylist/logger](../packages/logger/README.md)
- [infinitylist/ipm](../packages/ipm/README.md)

---

## Contributing
Contributing to our package may be intimidating but its actually quite simple
there is just a few commands you need to remember and you will be on your way!

> NOTE: the package cannot be published by anyone who does not have access to our npm org.

### Commands
- `npm run install` - install dependencies for all packages
- `npm run build` - build all packages
-  `npm run create` - create a new sub package
- `npm run docs:gen` - Generate the packages typedocs
- `npm run test` - Run tests on all packages to make sure things are working
- `npm run validate` - Check for valid formatting
- `npm run publish` - Publish package(s) to npm and update versions

## Versioning
Semantic versioning (often abbreviated as “semver”) is a convention used for software versioning in a standardized way. Using semantic versioning, each version number is comprised of three parts: major, minor, and patch, which are incremented when:
- `major version: there are significant changes`
- `minor version: a new feature is added in a backward-compatible way`
- `patch version: bugs or issues are fixed`

Here, semantic versioning is used to allow the manual selection of version numbers. However, Lerna also provides the option to automate the semantic version bump using conventional commits. Conventional commits is a formatting convention that provides a set of rules to formulate a consistent commit message. It specifies that each commit message should consist of a header, which includes a type, an optional scope and a description, an optional body, and a footer. Below is an example message with a description and breaking change footer:

```shell
feat: allow provided config object to extend other configs
BREAKING CHANGE: `extends` key in config file is now used for extending other config files
```

With lerna we can detect which package has been changed, infer the automatic semantic version bump if the commit message types fall into one of the following:
- `When the message type is fix, the patch version will be incremented (ie: 0.0.X)`
- `When the message type is feat, the minor version will be incremented (ie: 0.X.0)`
- `When a footer type is BREAKING CHANGE or ! after the type CHANGE, the major version will be incremented (ie: X.0.0)`

In addition to the auto version increment, Lerna will also create tags and generate change logs to reflect all changes made in that version.

### Other things to note
- All sub packages should respect our base `tsconfig.json` achieving this is pretty simple you can see an example of how to achieve this [here](./packages/client/tsconfig.json)
- All sub packages when initially created should have a version of `0.0.0` running commit with fix will push the patch version (ie: `git commit -m "fix(add): stuff and things"`)
- Documentation does not house anything majorly useful like examples but it does offer documentation for all of our constructors, clients, functions, typings and interfaces

---