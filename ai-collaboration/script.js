const viewer = document.getElementById('viewer');
const viewerImage = document.getElementById('viewer-image');
const viewerTitle = document.getElementById('viewer-title');
const viewerOriginal = document.getElementById('viewer-original');
document.querySelectorAll('[data-image]').forEach(link => {
  link.addEventListener('click', event => {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    viewerImage.src = link.href;
    viewerImage.alt = link.querySelector('img').alt;
    viewerTitle.textContent = viewerImage.alt;
    viewerOriginal.href = link.href;
    viewer.showModal();
    document.body.classList.add('viewer-open');
  });
});
document.getElementById('viewer-close').addEventListener('click', () => viewer.close());
viewer.addEventListener('click', event => { if (event.target === viewer) viewer.close(); });
viewer.addEventListener('close', () => document.body.classList.remove('viewer-open'));
const links = [...document.querySelectorAll('.toc a')];
const observer = new IntersectionObserver(entries => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    let id = entry.target.id;
    if (id.startsWith('clarify-')) id = 'investigate';
    links.forEach(link => {
      const active = link.hash === '#' + id;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'step');
      else link.removeAttribute('aria-current');
    });
  }
}, {rootMargin: '-10% 0px -65% 0px'});
document.querySelectorAll('.chapter').forEach(section => observer.observe(section));
