// =========================================================
// PAGE TRANSITION
// =========================================================
(function(){
  const loader = document.getElementById('pageLoader');
  if(!loader) return;
  requestAnimationFrame(()=>{ loader.classList.add('hide'); });

  document.querySelectorAll('a[data-transition]').forEach(link=>{
    link.addEventListener('click', (e)=>{
      const href = link.getAttribute('href');
      if(!href || href.startsWith('#') || link.target === '_blank') return;
      e.preventDefault();
      loader.classList.remove('hide');
      setTimeout(()=>{ window.location.href = href; }, 400);
    });
  });
})();

// =========================================================
// ACTIVE NAV LINK
// =========================================================
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a[data-page]').forEach(link=>{
    if(link.getAttribute('data-page') === path) link.classList.add('active');
  });
})();

// =========================================================
// MOBILE NAV TOGGLE
// =========================================================
(function(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(!toggle || !links) return;
  toggle.addEventListener('click', ()=>{
    links.classList.toggle('open');
  });
  links.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=> links.classList.remove('open'));
  });
})();

// =========================================================
// SCROLL REVEAL (with safety-net fallback)
// =========================================================
(function(){
  const revealEls = document.querySelectorAll('.reveal');
  if(!revealEls.length) return;

  function revealAll(){ revealEls.forEach(el=>el.classList.add('in')); }

  if(!('IntersectionObserver' in window)){ revealAll(); return; }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el=>io.observe(el));

  setTimeout(revealAll, 2500);
})();

// =========================================================
// SKILL BARS
// =========================================================
(function(){
  const skillRows = document.querySelectorAll('.skill-row');
  if(!skillRows.length) return;

  function fillAll(){
    skillRows.forEach(row=>{
      const fill = row.querySelector('.skill-bar-fill');
      const pct = row.getAttribute('data-pct');
      if(!fill || !pct) return;
      fill.classList.add('animate');
      fill.style.width = pct + '%';
    });
  }

  if(!('IntersectionObserver' in window)){ fillAll(); return; }

  const skillIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const fill = entry.target.querySelector('.skill-bar-fill');
        const pct = entry.target.getAttribute('data-pct');
        if(fill && pct){
          fill.classList.add('animate');
          setTimeout(()=>{ fill.style.width = pct + '%'; }, 100);
        }
        skillIO.unobserve(entry.target);
      }
    });
  }, {threshold:0.4});
  skillRows.forEach(el=>skillIO.observe(el));

  setTimeout(fillAll, 2500);
})();

// =========================================================
// TIMELINE REVEAL (with safety-net fallback)
// =========================================================
(function(){
  const items = document.querySelectorAll('.timeline-item');
  if(!items.length) return;

  function showAll(){
    items.forEach(item=>{
      item.style.opacity = '1';
      item.style.transform = 'translateX(0)';
    });
  }

  if(!('IntersectionObserver' in window)){ showAll(); return; }

  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateX(0)';
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.3});
  items.forEach(item=>{
    item.style.opacity = '0';
    item.style.transform = 'translateX(-16px)';
    item.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1)';
    io.observe(item);
  });

  setTimeout(showAll, 2500);
})();

// =========================================================
// PROJECT FILTER TABS
// =========================================================
(function(){
  const tabs = document.querySelectorAll('.filter-tab');
  if(!tabs.length) return;
  const cards = document.querySelectorAll('.proj-card[data-cat]');
  tabs.forEach(tab=>{
    tab.addEventListener('click', ()=>{
      tabs.forEach(t=>t.classList.remove('active'));
      tab.classList.add('active');
      const cat = tab.getAttribute('data-filter');
      cards.forEach(card=>{
        const cats = card.getAttribute('data-cat').split(' ');
        if(cat === 'all' || cats.includes(cat)) card.classList.remove('hidden');
        else card.classList.add('hidden');
      });
    });
  });
})();

// =========================================================
// COPY TO CLIPBOARD
// =========================================================
(function(){
  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const text = btn.getAttribute('data-copy');
      if(!text) return;
      function showCopied(){
        const original = btn.textContent;
        btn.textContent = 'copied!';
        btn.classList.add('copied');
        setTimeout(()=>{ btn.textContent = original; btn.classList.remove('copied'); }, 1600);
      }
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(showCopied).catch(()=>{});
      }
    });
  });
})();

// =========================================================
// CONTACT FORM (mailto handoff, no backend)
// =========================================================
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const status = document.getElementById('formStatus');

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const nameField = form.querySelector('#fName');
    const emailField = form.querySelector('#fEmail');
    const messageField = form.querySelector('#fMessage');
    const name = nameField ? nameField.value.trim() : '';
    const email = emailField ? emailField.value.trim() : '';
    const message = messageField ? messageField.value.trim() : '';

    if(!name || !email || !message){
      if(status){ status.textContent = 'Please fill in all fields.'; status.classList.remove('success'); }
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    if(status){ status.textContent = 'Opening your email client...'; status.classList.add('success'); }
    setTimeout(()=>{
      window.location.href = `mailto:saiprateethp31@gmail.com?subject=${subject}&body=${body}`;
    }, 500);
  });
})();

// =========================================================
// HANGING ID CARD — free multi-axis drag + spring-back
// =========================================================
(function(){
  const rigs = document.querySelectorAll('.idcard-rig');
  if(!rigs.length) return;

  rigs.forEach(rig=>{
    let dragging = false;
    let startX = 0, startY = 0;
    const maxRotZ = 35;
    const maxRotX = 14;
    const maxDriftY = 26;

    function point(e){
      const p = e.touches ? e.touches[0] : e;
      return {x:p.clientX, y:p.clientY};
    }

    function onDown(e){
      dragging = true;
      rig.classList.remove('snap');
      rig.classList.add('dragging');
      const p = point(e);
      startX = p.x; startY = p.y;
    }

    function onMove(e){
      if(!dragging) return;
      const p = point(e);
      const dx = p.x - startX;
      const dy = p.y - startY;

      // Horizontal drag -> sideways swing. Sign inverted: for a top-pivoted
      // hanging object, clockwise CSS rotation swings the bottom LEFT, so we
      // negate to match the direction the cursor actually moves.
      const rotZ = Math.max(-maxRotZ, Math.min(maxRotZ, -dx / 3));

      // Vertical drag -> the badge lifts/drops slightly and tilts in 3D,
      // so the motion isn't locked to a single sideways axis.
      const driftY = Math.max(-maxDriftY, Math.min(maxDriftY, dy / 4));
      const rotX = Math.max(-maxRotX, Math.min(maxRotX, dy / 8));

      rig.style.transform = `translateY(${driftY}px) rotateZ(${rotZ}deg) rotateX(${rotX}deg)`;
    }

    function onUp(){
      if(!dragging) return;
      dragging = false;
      rig.classList.remove('dragging');
      rig.classList.add('snap');
      rig.style.transform = 'translateY(0) rotateZ(0deg) rotateX(0deg)';
      setTimeout(()=>{
        rig.classList.remove('snap');
        rig.style.transform = '';
      }, 650);
    }

    rig.addEventListener('mousedown', onDown);
    rig.addEventListener('touchstart', onDown, {passive:true});
    window.addEventListener('mousemove', onMove);
    window.addEventListener('touchmove', onMove, {passive:true});
    window.addEventListener('mouseup', onUp);
    window.addEventListener('touchend', onUp);

    rig.addEventListener('click', ()=>{
      if(dragging) return;
      rig.classList.remove('snap');
      rig.style.animation = 'none';
      void rig.offsetWidth;
      const dir = (Math.random()>0.5?1:-1);
      rig.style.transform = `translateY(${-10}px) rotateZ(${dir*14}deg) rotateX(${dir*6}deg)`;
      rig.classList.add('snap');
      setTimeout(()=>{
        rig.style.transform = 'translateY(0) rotateZ(0deg) rotateX(0deg)';
        setTimeout(()=>{
          rig.classList.remove('snap');
          rig.style.transform = '';
          rig.style.animation = '';
        }, 650);
      }, 20);
    });
  });

  // random barcode bars, generated once per card on load
  document.querySelectorAll('.idcard-barcode').forEach(barcode=>{
    let bars = '';
    for(let i=0;i<28;i++){
      const h = 8 + Math.floor(Math.random()*18);
      bars += `<span style="height:${h}px;"></span>`;
    }
    barcode.innerHTML = bars;
  });
})();

// =========================================================
// ID SCANNER — click to reveal contact/status details
// =========================================================
(function(){
  document.querySelectorAll('.scanner-btn').forEach(btn=>{
    const combo = btn.closest('.idcard-combo');
    if(!combo) return;
    const body = combo.querySelector('.idcard-body');
    const light = combo.querySelector('.scanner-light');
    const screen = combo.querySelector('.scanner-screen');
    const result = combo.querySelector('.scan-result');
    if(!body || !light || !screen || !result) return;

    let busy = false;

    btn.addEventListener('click', ()=>{
      // if a result is already showing, clicking again resets it
      if(result.classList.contains('show')){
        result.classList.remove('show');
        light.className = 'scanner-light ready';
        screen.textContent = 'READY';
        return;
      }
      if(busy) return;
      busy = true;
      btn.disabled = true;

      light.className = 'scanner-light scanning';
      screen.textContent = 'SCANNING...';
      body.classList.remove('scanning');
      void body.offsetWidth;
      body.classList.add('scanning');

      setTimeout(()=>{
        light.className = 'scanner-light verified';
        screen.textContent = 'VERIFIED';
        result.classList.add('show');
        body.classList.remove('scanning');
        btn.disabled = false;
        busy = false;
      }, 900);
    });
  });
})();


// =========================================================
// REDUCED MOTION
// =========================================================
(function(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.reveal').forEach(el=>{
      el.style.transition = 'none';
      el.classList.add('in');
    });
  }
})();