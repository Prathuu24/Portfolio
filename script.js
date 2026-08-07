// ---------- custom cursor ----------
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  const ghostC = document.getElementById('ghostC');
  const ghostM = document.getElementById('ghostM');
  let mx=0,my=0, rx=0, ry=0;
  window.addEventListener('mousemove', e=>{
    mx=e.clientX; my=e.clientY;
    dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`;
    ghostC.style.transform=`translate(${mx+4}px,${my-3}px) translate(-50%,-50%)`;
    ghostM.style.transform=`translate(${mx-4}px,${my+3}px) translate(-50%,-50%)`;
  });
  function ringLoop(){
    rx += (mx-rx)*0.18; ry += (my-ry)*0.18;
    ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`;
    requestAnimationFrame(ringLoop);
  }
  ringLoop();
  document.querySelectorAll('a, .proj-card, .btn').forEach(el=>{
    el.addEventListener('mouseenter', ()=>ring.classList.add('hover'));
    el.addEventListener('mouseleave', ()=>ring.classList.remove('hover'));
  });

  // ---------- random CRT flicker ----------
  const flickerBar = document.getElementById('flickerBar');
  setInterval(()=>{
    if(Math.random() > 0.85){
      flickerBar.style.top = Math.random()*100 + 'vh';
      flickerBar.classList.remove('active');
      void flickerBar.offsetWidth;
      flickerBar.classList.add('active');
    }
  }, 1400);

  // ---------- role line scramble typer ----------
  const roles = ["Engineering Student", "Frontend Designer (in progress)", "UI Tinkerer", "Detail Obsessed"];
  const roleEl = document.getElementById('roleLine');
  const chars = "!<>-_\\/[]{}—=+*^?#01";
  let roleIdx = 0;

  function scrambleTo(el, text, duration=600){
    const steps = 14;
    let frame = 0;
    const interval = setInterval(()=>{
      frame++;
      let out = "";
      for(let i=0;i<text.length;i++){
        const revealPoint = (i/text.length)*steps;
        if(frame >= revealPoint + (steps*0.4)){
          out += text[i];
        } else if(text[i] === " "){
          out += " ";
        } else {
          out += chars[Math.floor(Math.random()*chars.length)];
        }
      }
      el.textContent = out;
      if(frame >= steps){
        clearInterval(interval);
        el.textContent = text;
      }
    }, duration/steps);
  }

  function cycleRoles(){
    scrambleTo(roleEl, roles[roleIdx]);
    roleIdx = (roleIdx+1) % roles.length;
    setTimeout(cycleRoles, 3200);
  }
  cycleRoles();

  // ---------- scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, {threshold:0.15});
  revealEls.forEach(el=>io.observe(el));

  // ---------- skill bars ----------
  const skillRows = document.querySelectorAll('.skill-row');
  const skillIO = new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        const fill = entry.target.querySelector('.skill-bar-fill');
        const pct = entry.target.getAttribute('data-pct');
        fill.classList.add('animate');
        setTimeout(()=>{ fill.style.width = pct + '%'; }, 100);
        skillIO.unobserve(entry.target);
      }
    });
  }, {threshold:0.4});
  skillRows.forEach(el=>skillIO.observe(el));

  // ---------- hero periodic glitch pulse ----------
  const heroName = document.getElementById('heroName');
  setInterval(()=>{
    heroName.style.animation = 'none';
    void heroName.offsetWidth;
    const gc = heroName.querySelector('.g-c');
    const gm = heroName.querySelector('.g-m');
    gc.style.transition = 'none';
    gm.style.transition = 'none';
    gc.style.opacity = '0.8';
    gm.style.opacity = '0.8';
    gc.style.transform = 'translate(3px,-2px)';
    gm.style.transform = 'translate(-3px,2px)';
    setTimeout(()=>{
      gc.style.transition = 'opacity .3s, transform .3s';
      gm.style.transition = 'opacity .3s, transform .3s';
      gc.style.opacity = '0';
      gm.style.opacity = '0';
      gc.style.transform = 'translate(0,0)';
      gm.style.transform = 'translate(0,0)';
    }, 120);
  }, 4000);

  // ---------- reduced motion respect ----------
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    document.querySelectorAll('.reveal').forEach(el=>{
      el.style.transition = 'none';
      el.classList.add('in');
    });
  }

// =========================================================
// MULTI-PAGE ADDITIONS
// =========================================================

// ---------- page transition (glitch wipe) on internal nav ----------
(function(){
  const loader = document.getElementById('pageLoader');
  if(!loader) return;

  // reveal current page (loader slides up out of the way on load)
  requestAnimationFrame(()=>{
    loader.classList.add('hide');
  });

  document.querySelectorAll('a[data-transition]').forEach(link=>{
    link.addEventListener('click', (e)=>{
      const href = link.getAttribute('href');
      if(!href || href.startsWith('#') || link.target === '_blank') return;
      e.preventDefault();
      loader.classList.remove('hide');
      loader.classList.add('leaving');
      setTimeout(()=>{ window.location.href = href; }, 550);
    });
  });
})();

// ---------- active nav link ----------
(function(){
  const path = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navlinks a[data-page]').forEach(link=>{
    if(link.getAttribute('data-page') === path){
      link.classList.add('active');
    }
  });
})();

// ---------- mobile nav toggle ----------
(function(){
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if(!toggle || !links) return;
  toggle.addEventListener('click', ()=>{
    links.classList.toggle('open');
    toggle.textContent = links.classList.contains('open') ? '[ x ]' : '[ = ]';
  });
  links.querySelectorAll('a').forEach(a=>{
    a.addEventListener('click', ()=>{
      links.classList.remove('open');
      toggle.textContent = '[ = ]';
    });
  });
})();

// ---------- project filter tabs ----------
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
        if(cat === 'all' || cats.includes(cat)){
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();

// ---------- copy to clipboard ----------
(function(){
  document.querySelectorAll('.copy-btn').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const text = btn.getAttribute('data-copy');
      navigator.clipboard.writeText(text).then(()=>{
        const original = btn.textContent;
        btn.textContent = 'copied!';
        btn.classList.add('copied');
        setTimeout(()=>{
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1600);
      });
    });
  });
})();

// ---------- contact form (mailto handoff, no backend) ----------
(function(){
  const form = document.getElementById('contactForm');
  if(!form) return;
  const status = document.getElementById('formStatus');
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = form.querySelector('#fName').value.trim();
    const email = form.querySelector('#fEmail').value.trim();
    const message = form.querySelector('#fMessage').value.trim();
    if(!name || !email || !message){
      status.textContent = '> error: please fill in all fields';
      status.classList.remove('success');
      return;
    }
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    status.textContent = '> opening your email client...';
    status.classList.add('success');
    setTimeout(()=>{
      window.location.href = `mailto:youremail@example.com?subject=${subject}&body=${body}`;
    }, 500);
  });
})();

// ---------- timeline reveal (reuses IntersectionObserver pattern) ----------
(function(){
  const items = document.querySelectorAll('.timeline-item');
  if(!items.length) return;
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
})();
