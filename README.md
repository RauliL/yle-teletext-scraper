# Yle teletext scraper

Scrapes [teletext] pages from [Finnish Broadcasting Company] and returns their
contents as plain text.

Can be used as a command line utility, [Node.js] library or in a browser.

[teletext]: https://en.wikipedia.org/wiki/Teletext
[Finnish Broadcasting Company]: https://en.wikipedia.org/wiki/Yle
[Node.js]: https://nodejs.org

## Installation

```
$ npm install --save yle-teletext-scraper
```

## Usage

### Command line utility

If you install this package [globally] you can use command `yle-teletext` to
retrieve pages and display them in your console.

```bash
$ yle-teletext [page = 100] [subpage = 1]
```

[globally]: https://docs.npmjs.com/downloading-and-installing-packages-globally

### Library

The library exports a single function called `get`, which retrieves an teletext
page, it's subpages (optionally) and so on. It's TypeScript type declaration
looks like this:

```typescript
get(
  page: number = 100,
  subpage: number = 1,
  fetchSubPages: boolean = true,
) => Promise<string[]>;
```

It returns an array of subpages which each containing text only version of the
page contents. If the page does not exist, or some other network related error
occurs, the promise will fail.

And this is how you can use it:

```javascript
import { get } from 'yle-teletext-scraper';

get(100, 1)
  .then((pages) => {
    pages.forEach((page) => {
      console.log(page);
    });
  })
  .catch((error) => {
    console.error(error);
  });
```
