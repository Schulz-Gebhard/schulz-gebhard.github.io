document.addEventListener('DOMContentLoaded',()=>{
  const cards=[...document.querySelectorAll('.paper-card')];
  let theme='all', group='all';
  const applyResearch=()=>{
    cards.forEach(c=>{
      const themes=(c.dataset.themes||'').split(/\s+/);
      const themeOK=theme==='all'||themes.includes(theme);
      const groupOK=group==='all'||c.dataset.group===group;
      c.classList.toggle('hidden-card',!(themeOK&&groupOK));
    });
    document.querySelectorAll('.research-section').forEach(s=>{
      const visible=[...s.querySelectorAll('.paper-card')].some(c=>!c.classList.contains('hidden-card'));
      s.style.display=visible?'':'none';
    });
  };
  document.querySelectorAll('[data-filter-type]').forEach(b=>b.addEventListener('click',()=>{
    const type=b.dataset.filterType;
    document.querySelectorAll(`[data-filter-type="${type}"]`).forEach(x=>x.classList.remove('active'));
    b.classList.add('active');
    if(type==='theme') theme=b.dataset.filter; else group=b.dataset.filter;
    applyResearch();
  }));
  const q=new URLSearchParams(location.search).get('theme');
  if(q && ['inequality','macro','complexity','history'].includes(q)){
    theme=q; const b=document.querySelector(`[data-filter-type="theme"][data-filter="${q}"]`);
    if(b){document.querySelectorAll('[data-filter-type="theme"]').forEach(x=>x.classList.remove('active'));b.classList.add('active');}
    applyResearch();
  }
  const pbuttons=[...document.querySelectorAll('[data-project-filter]')];
  const projects=[...document.querySelectorAll('.project-feature[data-project-themes]')];
  pbuttons.forEach(b=>b.addEventListener('click',()=>{
    pbuttons.forEach(x=>x.classList.remove('active')); b.classList.add('active');
    const f=b.dataset.projectFilter;
    projects.forEach(p=>p.classList.toggle('hidden-card',f!=='all' && !(p.dataset.projectThemes||'').split(/\s+/).includes(f)));
  }));
});
