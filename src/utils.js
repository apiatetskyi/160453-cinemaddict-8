/**
 * Returns random number from range
 * @param  {number} min
 * @param  {number} max
 * @return {number}
 */
const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

/**
 * Returns fragment with nodes, created from valid HTML string
 * @param {string} htmlString
 * @param {Function} [appendedNodesCallback]
 * @return {Node}
 */
const getNode = (htmlString, appendedNodesCallback) => {
  const parser = new DOMParser();
  const html = parser.parseFromString(htmlString, `text/html`);
  const fragment = document.createDocumentFragment();

  html.body.childNodes.forEach((node) => {
    if (typeof appendedNodesCallback === `function`) {
      appendedNodesCallback(node);
    }

    fragment.appendChild(node);
  });

  return fragment;
};

export default {getNode, getRandom};
