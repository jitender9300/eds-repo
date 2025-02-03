import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

function decorateFooterTop(block) {
  const footerTop = block.querySelector('.default-content-wrapper');
  if (!footerTop) return;

  const children = [...footerTop.children];
  let index = 0;

  while (index < children.length) {
    const topItem = document.createElement('div');
    topItem.classList.add('footer-top-item');

    // Append the current child (e.g., <h5>)
    topItem.appendChild(children[index]);
    index += 1;

    // Append subsequent children (e.g., <ul>) until the next <h5>
    while (index < children.length && children[index].tagName !== 'H5') {
      topItem.appendChild(children[index]);
      index += 1;
    }

    footerTop.appendChild(topItem);
  }
}

function decorateFooter(block) {
  decorateFooterTop(block);
  block.parentElement.classList.add('appear');
}

export default async function decorate(block) {
  // Load footer as fragment
  const footerMeta = getMetadata('footer');
  const footerPath = footerMeta ? new URL(footerMeta, window.location).pathname : '/footer';
  console.log('Loading footer from:', footerPath); // Debugging

  const fragment = await loadFragment(footerPath);
  if (!fragment) {
    console.error('Failed to load footer fragment');
    return;
  }

  // Decorate footer DOM
  block.textContent = '';
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
  decorateFooter(block);
}