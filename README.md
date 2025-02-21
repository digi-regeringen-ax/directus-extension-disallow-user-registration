# Directus Disable Public Registration Extension

## Overview

This extension disables public user registration. Public user registration can pose several risks, including:

- **Spam Accounts**: Automated bots can create numerous fake accounts, leading to spam and potential abuse.
- **Security Vulnerabilities**: Public registration can be exploited to gain unauthorized access to the system.
- **Resource Drain**: Managing and moderating a large number of user accounts can consume significant resources.

By disabling public registration, you can mitigate these risks and ensure that only authorized users can register.

Using this extension prevents you from accidently enabling public registration in the Directus settings. It provides an additional layer of security and control over user registration.

## Installation

To install this extension, use npm:

```sh
npm install disable-public-registration-extension
```
## Usage

To use this extension, you need to set the `PUBLIC_REGISTRATION_ENABLED` environment variable. If this variable is not
set, public registration will be disabled by default.

**Enabling Public Registration**

To be able to allow public registration, set the `PUBLIC_REGISTRATION_ALLOWED` environment variable to true (or disable this extension):

```sh
export PUBLIC_REGISTRATION_ALLOWED=true
```

**Disallowing Public Registration***

To disallow public registration, either do not set the PUBLIC_REGISTRATION_ALLOW environment variable or set it to
false:

```sh
export PUBLIC_REGISTRATION_ALLOWED=false
```

**Throwing an Error on Public Registration enabling**

If you want to throw an error when trying to allow public registration, set the `PUBLIC_REGISTRATION_THROW_ERROR` environment variable to true:

```shell
export PUBLIC_REGISTRATION_THROW_ERROR=true
```

If this variable is set to false, the extension will always override the public registration setting with "false", but will not throw an error.
