# Contributing

## Introduction

First of all, thank you for your interest to contribute to the NFT Manager project.

When contributing to this repository, please first discuss the change you wish to make via issue, email, discord or any other method with us before making a change.

Please read Pull Request Process and Code of Conduct before contributing.

There are many ways to contribute! Our documentation surely has room for improvement, bug hunting, bug fixing, writing better walkthrough tutorials for our users, and even feature implementations. In this doc, we had written a few ways on contributing to NFT Manager.

- adding new contracts to the code base
- contributing with development
- transalation [WIP]

## Pull Request Process

- Fix linting issue with `yarn lint --fix`.
- Make sure all test pass with `yarn test:unit`.
- Submit a PR on our github.
- Wait for Reviewer to approve for the PR.

# Method 1: Adding new Contract (or Modify old Contract)

Contributings can be as simple as create a `contract.json` in `src/contracts`

## General steps on contributing

- Follow installation in Method 2.
- Scaffold contract from [templates folder](templates/contracts/contract) into `src/contracts/contract` or use following command (presume Makefile installed). Below are a sample contract.json.

```
$ make contract CONTRACT=gods-unchained
creating contract gods-unchained
```

- Setup `contract.json` file with necessary data

```json
{
  "name": "CoinGecko Xmas 2018 NFToken",
  "slug": "coingecko",
  "description": "CoinGecko first NFT.",
  "official_site": "https://xmas2018.coingecko.com/",
  "abi": "openzeppelin.abi.json",
  "image": {
    "thumb": "img/contract/coingecko/thumb.png",
    "small": "img/contract/coingecko/small.png",
    "large": "img/contract/coingecko/large.png"
  },
  "contract": {
    "contract_address": "0xfd98724f1c8a36c7be155cddce51b456eb1eb08d",
    "standard": "openzeppelin"
  }
}
```

- For abi json is located at `src/contracts/assets/abi` (can get abi.json from [Etherscan](https://etherscan.io)).

- For images, is located at `src/contracts/assets/img`. The convention is using `thumb`, `small` and `large` for the name.

- If the contracts does not have a way to get images without calling the json rpc, leave `contract.js` alone. The app will call the rpc to get the image. Otherwise, write custom script with function name `genImge`. Below is a sample for MyCryptoHeroes.

```js
export const genImg = ({ id }) => {
  const formattedId = `${id}`.slice(0, 4);
  return {
    imgAddr: `https://www.mycryptoheroes.net/images/extensions/2000/${formattedId}.png`,
    shortcut: true
  };
};
```

- It would be a good idea to write test for that `genImg` function as well. The test is located at `test/jest/__tests__/contracts/contract`.

- Since we implemented CI, the CI will automatically check for the correct structure of `contract.json` and correct abi.json file.

# Method 2: Contributing with development

## Requirement:

- Yarn and NPM installed
- Experience with developing NPM/Yarn project
- Makefile installed (optional)

## Installation:

We had made contribution to be easy in Linux/Mac environment by using Makefile. For Windows user, please refer to the next section.

### Mac / Linux

```sh
# Install all dependencies
# Choose Yarn or NPM for global installation for quasar (MODE=yarn/MODE=npm) (npm by default)
$ make init MODE=yarn
# Start a dev server
$ make dev
```

### Windows

Make sure npm or yarn is installed.

```sh
# Install quasar cli
$ npm i -g @quasar/cli
# Install dependencies in the repo
$ npm i # yarn
# Start a dev server
$ quasar dev
```

## Development

In quasar framework, there is a lot of scaffolding tools available, just try `quasar new --help` to see what you can do with it.

### File Structure

#### boot (`src/boot`)

boot file is meant for code to be run before Vue lifecycle kicks in. You can generate boot file with quasar framework command (`quasar new boot <NAME>`), and it need to be declared in [quasar config file](quasar.conf.js).

```js
    boot: ["i18n", "polyfill", "sync"],
```

**In [quasar.conf.js]**

The code will be executed in ascending order.

### Vue Component

#### Component

Using quasar scaffold tools, you can easily create component.

```sh
$ quasar new component your_component
```

The practise we use is to store smaller component of a page or shared component.

#### Page

Using quasar scaffold tools, you can easily create page.

```sh
$ quasar new page your_page
```

Once page is created, the route need to be added into [router/routes.js](src/router/routes.js)

#### Layout

Layout usually are theme for a particular theme. Right now, we are using only 1 layout. ([MainLayout.vue](src/layouts/MainLayout.vue))

### Router

In [router/routes.js](src/router/routes.js), we lazy load all the routes with `import("pages/Index.vue")`.

```js
const routes = [
  {
    path: "/",
    component: () => import("src/layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Index.vue") },
      { path: "/nft", component: () => import("pages/AvailableNFT.vue") },
      { path: "/nft/:slug", component: () => import("pages/NFT.vue") },
      { path: "/settings", component: () => import("pages/Settings.vue") }
    ]
  }
```

### Vuex (`src/store`)

Vuex is a bit complex in this app. Here's a general step on working with Vuex. (For template can refer to [templates/store](templates/store))

- Create the state and names.

```js
export default {
  /** @type {number} */
  id: 1
};
```

**state.js**

```js
const IdActionName = {};
const IdMutationName = {};
const IdGetterName = {};
```

**names.js**

- Create Action, Getter, Mutation

#### Good place to check for reference

- https://blog.usejournal.com/type-vue-without-typescript-b2b49210f0b
- https://itnext.io/type-vuex-without-typescript-4f183b83a907

#### Testing Vuex

- located at [test/jest/**tests**/store](test/jest/__tests__/store)

#### Testing

Currently we only use jest for unit testing. (Cypress e2e testing are still WIP)

- We are using BDD for testing (with `describe` and `it`).
- Check [jest.setup.js](test/jest/jest.setup.js), since we are using both jest and chai for testing.
- SnapShot testing still WIP.

### Audit

Currently we only audit a few categories

- Lighthouse
- Yarn audit
- Jest coverage report

## Translation

WIP
