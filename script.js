const glow = document.getElementById('cursor-glow');
if (glow) {
  window.addEventListener('pointermove', (e) => {
    glow.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
  });
}