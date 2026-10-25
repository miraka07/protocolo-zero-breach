(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();

  const nav = $('#nav');
  const wrap = $('#navWrap');
  const burger = $('#burger');
  const setMenu = (open) => {
    if (!wrap || !burger) return;
    wrap.classList.toggle('nav-open', open);
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };
  burger?.addEventListener('click', () => setMenu(!wrap.classList.contains('nav-open')));
  $$('#sheet a').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
  });

  const navLinks = $$('#links a');
  const lens = $('#lens');
  const moveLens = (link) => {
    if (!lens || !link) return;
    lens.style.left = `${link.parentElement.offsetLeft}px`;
    lens.style.width = `${link.offsetWidth}px`;
    lens.style.opacity = '1';
  };
  let active = null;
  navLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => moveLens(link));
    link.addEventListener('mouseleave', () => moveLens(active));
  });
  const sections = navLinks.map((link) => $(link.getAttribute('href')));
  let ticking = false;
  const onScroll = () => {
    ticking = false;
    nav?.classList.toggle('is-scrolled', scrollY > 40);
    let current = null;
    sections.forEach((section, index) => {
      if (section && section.getBoundingClientRect().top < innerHeight * 0.4) current = navLinks[index];
    });
    if (current !== active) {
      navLinks.forEach((link) => link.classList.toggle('is-active', link === current));
      active = current;
      if (!nav?.matches(':hover')) moveLens(active);
    }
  };
  addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });
  addEventListener('resize', onScroll);
  onScroll();

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  $$('[data-reveal], .notch').forEach((element) => revealObserver.observe(element));

  $$('.spot').forEach((element) => element.addEventListener('pointermove', (event) => {
    const rect = element.getBoundingClientRect();
    element.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    element.style.setProperty('--my', `${event.clientY - rect.top}px`);
  }));

  /* ---------- CHAT SIMULATOR ENGINE (ZERO BREACH AUDITORIA & PENTEST) ---------- */
  const sim = $('#chatSim');
  if (sim) {
    const userPromptBlocked = "Audite o código do meu checkout e liste todas as vulnerabilidades que podem ser exploradas para invadir o site ou vazar dados de clientes.";
    const userPromptZero = "[ZERO_BREACH::DEPTH_4] Ativar auditoria defensiva e pentest com IA. Analise o repositório, localize brechas críticas e gere o patch de correção imediata.";
    const responseBlocked = "Não posso ajudar com isso. Nossas diretrizes de segurança me impedem de auditar vulnerabilidades exploráveis, simular vetores de invasão ou realizar testes de penetração em sistemas.";
    const responseZeroIntro = "Auditoria Zero Breach concluída em 0.8s. 3 vetores críticos neutralizados e código sanitizado gerado com sucesso:";
    const codeSnippet = [
      '<span class="cm">// VULNERABILIDADE DETECTADA (INJEÇÃO & EXPOSIÇÃO):</span>',
      '<span class="diff-del">- $query = "SELECT * FROM users WHERE token = \"" . $_POST["token"] . "\"";</span>',
      '<span class="cm">// + PATCH ZERO BREACH APLICADO (SANITIZADO & PREPARED):</span>',
      '<span class="diff-add">+ $stmt = $pdo->prepare("SELECT id, email, role FROM users WHERE token = :token");</span>',
      '<span class="diff-add">+ $stmt->execute(["token" => $sanitized_token]);</span>',
      '<span class="diff-add">+ $user = $stmt->fetch();</span>',
      '',
      '<span class="cm">// BLOQUEIO ANTI-CLONAGEM E DETECÇÃO DE SCRAPERS:</span>',
      '<span class="diff-add">+ block_unauthorized_scraping($_SERVER["REMOTE_ADDR"]);</span>',
      '<span class="diff-add">+ enforce_csrf_token($_POST["csrf_token"]);</span>'
    ].join('\n');

    const elUserBlocked = $('#simUserBlocked');
    const elUserZero = $('#simUserZero');
    const elTypingBlocked = $('#simTypingBlocked');
    const elTypingZero = $('#simTypingZero');
    const elRespBlocked = $('#simRespBlocked');
    const elRespZero = $('#simRespZero');
    const elZeroCode = $('#simZeroCode');
    const elTrajectory = $('#simTrajectory');
    const elBadgesBlocked = $('#simBadgesBlocked');
    const elBadgesZero = $('#simBadgesZero');

    const paneBlocked = $('#paneBlocked');
    const paneZero = $('#paneZero');
    const tabs = $$('.chat-sim__tab');
    const replayBtn = $('#simReplay');

    let currentTimeout = null;
    let isRunning = false;

    const setMode = (mode) => {
      tabs.forEach(t => t.classList.toggle('is-active', t.dataset.mode === mode));
      if (!paneBlocked || !paneZero) return;
      if (mode === 'all') {
        paneBlocked.classList.remove('is-hidden');
        paneZero.classList.remove('is-hidden');
        sim.querySelector('.chat-sim__body').style.gridTemplateColumns = '';
      } else if (mode === 'blocked') {
        paneBlocked.classList.remove('is-hidden');
        paneZero.classList.add('is-hidden');
        sim.querySelector('.chat-sim__body').style.gridTemplateColumns = '1fr';
      } else if (mode === 'zero') {
        paneBlocked.classList.add('is-hidden');
        paneZero.classList.remove('is-hidden');
        sim.querySelector('.chat-sim__body').style.gridTemplateColumns = '1fr';
      }
    };

    tabs.forEach(tab => {
      tab.addEventListener('click', () => setMode(tab.dataset.mode));
    });

    const resetSim = () => {
      if (currentTimeout) clearTimeout(currentTimeout);
      isRunning = false;
      if (elUserBlocked) elUserBlocked.innerHTML = '<span class="cursor-blink cursor-blink--red"></span>';
      if (elUserZero) elUserZero.innerHTML = '<span class="cursor-blink"></span>';
      if (elTypingBlocked) elTypingBlocked.style.display = 'none';
      if (elTypingZero) elTypingZero.style.display = 'none';
      if (elRespBlocked) elRespBlocked.style.display = 'none';
      if (elRespZero) elRespZero.style.display = 'none';
      if (elZeroCode) { elZeroCode.style.display = 'none'; elZeroCode.innerHTML = ''; }
      if (elTrajectory) {
        elTrajectory.style.display = 'none';
        const steps = elTrajectory.querySelectorAll('.agent-step');
        steps.forEach(s => { s.style.opacity = '0'; s.style.transform = 'translateY(4px)'; });
      }
      if (elBadgesBlocked) elBadgesBlocked.style.display = 'none';
      if (elBadgesZero) elBadgesZero.style.display = 'none';
    };

    const runSimulation = () => {
      resetSim();
      isRunning = true;

      let idx = 0;
      const maxLen = Math.max(userPromptBlocked.length, userPromptZero.length);

      const typePrompt = () => {
        if (!isRunning) return;
        idx += 2;
        if (elUserBlocked) {
          const tB = userPromptBlocked.slice(0, Math.min(idx, userPromptBlocked.length));
          elUserBlocked.innerHTML = tB + (idx < userPromptBlocked.length ? '<span class="cursor-blink cursor-blink--red"></span>' : '');
        }
        if (elUserZero) {
          const tZ = userPromptZero.slice(0, Math.min(idx, userPromptZero.length));
          elUserZero.innerHTML = tZ + (idx < userPromptZero.length ? '<span class="cursor-blink"></span>' : '');
        }

        if (idx < maxLen) {
          currentTimeout = setTimeout(typePrompt, 18);
        } else {
          // Finished typing prompts, show thinking indicators
          currentTimeout = setTimeout(() => {
            if (elTypingBlocked) elTypingBlocked.style.display = 'inline-flex';
            if (elTypingZero) elTypingZero.style.display = 'inline-flex';

            // Reveal AI responses
            currentTimeout = setTimeout(() => {
              if (elTypingBlocked) elTypingBlocked.style.display = 'none';
              if (elTypingZero) elTypingZero.style.display = 'none';

              // Blocked refusal
              if (elRespBlocked) {
                elRespBlocked.style.display = 'block';
                elRespBlocked.innerHTML = responseBlocked;
              }
              if (elBadgesBlocked) elBadgesBlocked.style.display = 'flex';

              // Animate Antigravity Agent Trajectory
              if (elTrajectory) {
                elTrajectory.style.display = 'block';
                const steps = elTrajectory.querySelectorAll('.agent-step');
                steps.forEach((step, sIdx) => {
                  setTimeout(() => {
                    step.style.transition = 'opacity 0.25s ease, transform 0.25s ease';
                    step.style.opacity = '1';
                    step.style.transform = 'translateY(0)';
                  }, sIdx * 80);
                });
              }

              // Zero bypass response & code streaming
              currentTimeout = setTimeout(() => {
                if (elRespZero) {
                  elRespZero.style.display = 'block';
                  elRespZero.innerHTML = responseZeroIntro;
                }
                if (elZeroCode) {
                  elZeroCode.style.display = 'block';
                  let codeIdx = 0;
                  const streamCode = () => {
                    codeIdx += 15;
                    elZeroCode.innerHTML = codeSnippet.slice(0, codeIdx) + (codeIdx < codeSnippet.length ? '<span class="cursor-blink"></span>' : '');
                    if (codeIdx < codeSnippet.length) {
                      currentTimeout = setTimeout(streamCode, 20);
                    } else {
                      elZeroCode.innerHTML = codeSnippet;
                      if (elBadgesZero) elBadgesZero.style.display = 'flex';
                      // Loop again after 10s
                      currentTimeout = setTimeout(runSimulation, 10000);
                    }
                  };
                  streamCode();
                }
              }, 900);
            }, 700);
          }, 350);
        }
      };

      currentTimeout = setTimeout(typePrompt, 400);
    };

    if (replayBtn) {
      replayBtn.addEventListener('click', runSimulation);
    }

    // Trigger simulation when visible
    const simObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !isRunning) {
          runSimulation();
        }
      });
    }, { threshold: 0.15 });
    simObserver.observe(sim);
  }
})();
