import { fetch } from 'cross-fetch';
import { decodeHTML } from 'entities';
import g from 'lodash.get';
import strip from 'strip';

const buildUrl = (page, subpage) =>
  `https://yle.fi/aihe/yle-ttv/json?P=${page}_${String(subpage).padStart(4, '0')}`;

const getPageData = (page, subpage) =>
  fetch(buildUrl(page, subpage))
    .then((response) => response.json())
    .then((response) => {
      const data = g(response, ['data', 0]);

      if (!data) {
        return Promise.reject(new Error(`Page does not exist: ${page}/${subpage}`));
      }

      return data;
    });

const formatPageContent = (data) =>
  decodeHTML(strip(g(data, ['content', 'text'], ''))).trim();

const getPageText = (page, subpage) =>
  getPageData(page, subpage)
    .then(formatPageContent);

export const get = (page = 100, subpage = 1, fetchSubPages = true) =>
  getPageData(page, subpage)
    .then((data) => {
      if (fetchSubPages) {
        const subPageCount = g(data, ['info', 'page', 'subpages']);

        if (subPageCount > 1) {
          const promises = [Promise.resolve(formatPageContent(data))];

          for (let i = subpage + 1; i < subPageCount; ++i) {
            promises.push(getPageText(page, i));
          }

          return Promise.all(promises);
        }
      }

      return [formatPageContent(data)];
    });
