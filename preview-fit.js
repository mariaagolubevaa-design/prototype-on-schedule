(() => {
  const phone = document.querySelector('.phone');

  function fitPreview() {
    const {clientWidth, clientHeight} = document.documentElement;
    const viewport = window.visualViewport;
    const height = viewport && viewport.scale === 1
      ? Math.min(clientHeight, viewport.height)
      : clientHeight;
    const gutter = clientWidth >= 500 ? 24 : 0;
    const scale = Math.min(
      1,
      (clientWidth - gutter) / phone.offsetWidth,
      (height - gutter) / phone.offsetHeight
    );
    phone.style.setProperty('--preview-scale', String(scale));
  }

  fitPreview();
  window.addEventListener('resize', fitPreview);
  window.visualViewport?.addEventListener('resize', fitPreview);
})();
