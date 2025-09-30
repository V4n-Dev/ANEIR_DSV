(async function initShell(){
  const host = document.getElementById('app-shell');
  if(!host) return;

  // Carga parcial
  try{
    const res = await fetch('partials/shell.html', {cache:'no-store'});
    if(!res.ok) throw new Error('No se pudo cargar shell.html');
    const html = await res.text();
    host.innerHTML = html;
  }catch(err){
    console.error('[Shell]', err);
    return;
  }

  // Ruteo simple por path/archivo
  const routeMap = new Map([
    ['index','index.html'],
    ['marketplace','marketplace.html'],
    ['convocatorias','convocatorias.html'],
    ['academia','academia_mentoria.html'],
    ['tramites','tramites.html'],
    ['reportes','reportes.html'],
    ['portafolio','portafolio.html'],
    ['perfil','perfil.html'],
    ['evaluador','evaluador_lista.html'],
    ['ayuda','ayuda.html'],
  ]);

  const file = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  function markActive(container){
    const links = container.querySelectorAll('a[data-route]');
    links.forEach(a=>{
      const expected = (routeMap.get(a.dataset.route) || '').toLowerCase();
      const isActive = expected === file;
      a.classList.toggle('active', isActive);
      // En topbar usamos aria-current, en sidebar usamos .active
      if(container.classList.contains('topbar-nav')){
        if(isActive) a.setAttribute('aria-current','page');
        else a.removeAttribute('aria-current');
      }
    });
  }

  const topbarNav = document.querySelector('.topbar-nav');
  const sideNav   = document.querySelector('.sidebar-nav');
  if(topbarNav) markActive(topbarNav);
  if(sideNav)   markActive(sideNav);

  if(topbarNav){
    const currents = topbarNav.querySelectorAll('[aria-current="page"]');
    if(currents.length > 1){
      currents.forEach((el,i)=> i>0 && el.removeAttribute('aria-current'));
    }
  }
})();
