function showLoading(element) {
  element.setAttribute('aria-busy', 'true');
}

function removeLoading(element) {
  element.removeAttribute('aria-busy');
}

export { showLoading, removeLoading };
