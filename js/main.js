
const loadComponent = async (id, file) => {
  const res = await fetch(file);
  const data = await res.text();
  document.getElementById(id).innerHTML = data;
};

loadComponent('navbar', './partials/navbar.html');
loadComponent('hero', './partials/hero.html');
loadComponent('gallery', './partials/gallery.html');
loadComponent('services', './partials/services.html');
loadComponent('footer', './partials/footer.html');
