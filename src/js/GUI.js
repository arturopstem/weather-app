function showLoading(element) {
  element.setAttribute('aria-busy', 'true');
}

function removeLoading(element) {
  element.removeAttribute('aria-busy');
}

function colorDegreeBtn(degree) {
  const degreeBtns = document.querySelectorAll('button[data-degree]');
  degreeBtns.forEach((btn) => {
    if (btn.dataset.degree === degree) {
      btn.classList.remove('secondary', 'outline');
      btn.classList.add('primary');
    } else {
      btn.classList.remove('primary');
      btn.classList.add('secondary', 'outline');
    }
  });
}

function initDegreeBtns(degree = 'C') {
  const storedDegree = localStorage.getItem('degree');
  if (storedDegree) {
    colorDegreeBtn(storedDegree);
  } else {
    localStorage.setItem('degree', degree);
    colorDegreeBtn(degree);
  }
}

function degreeBtnsEventHandler(e) {
  if (e.target.nodeName === 'BUTTON') {
    const button = e.target;
    const { degree } = button.dataset;
    localStorage.setItem('degree', degree);
    colorDegreeBtn(degree);
    // TODO: display format and display location info
  }
}

export { showLoading, removeLoading, degreeBtnsEventHandler, initDegreeBtns };
