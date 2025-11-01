// ================================================
// VOCALIZA BLOG - ENHANCEMENTS 2.0
// Novas funcionalidades e melhorias de UX
// ================================================

(function() {
  'use strict';

  // ================================================
  // 1. DARK MODE TOGGLE
  // ================================================
  function initDarkMode() {
    const toggle = document.getElementById('theme-toggle');
    if (!toggle) return;

    // Carregar preferência salva ou detectar do sistema
    const savedTheme = localStorage.getItem('theme');
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const currentTheme = savedTheme || systemPreference;

    // Aplicar tema inicial
    document.documentElement.setAttribute('data-theme', currentTheme);

    // Toggle ao clicar
    toggle.addEventListener('click', () => {
      const current = document.documentElement.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      
      // Animação no botão
      toggle.style.transform = 'rotate(360deg)';
      setTimeout(() => {
        toggle.style.transform = 'rotate(0deg)';
      }, 300);
    });
  }

  // ================================================
  // 2. BUSCA INTELIGENTE
  // ================================================
  function initSearch() {
    const searchToggle = document.getElementById('search-toggle');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchInput = document.getElementById('search-input');
    const searchResults = document.getElementById('search-results');

    if (!searchToggle || !searchDropdown) return;

    let searchIndex = [];

    // Carregar índice de busca
    fetch('/index.json')
      .then(res => res.json())
      .then(data => {
        searchIndex = data;
      })
      .catch(err => console.error('Erro ao carregar índice de busca:', err));

    // Toggle dropdown
    searchToggle.addEventListener('click', () => {
      searchDropdown.classList.toggle('active');
      if (searchDropdown.classList.contains('active')) {
        searchInput.focus();
      }
    });

    // Fechar ao clicar fora
    document.addEventListener('click', (e) => {
      if (!searchDropdown.contains(e.target) && e.target !== searchToggle) {
        searchDropdown.classList.remove('active');
      }
    });

    // Busca em tempo real
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
      clearTimeout(debounceTimer);
      const query = e.target.value.toLowerCase().trim();

      if (query.length < 2) {
        searchResults.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-tertiary);">Digite pelo menos 2 caracteres...</div>';
        return;
      }

      debounceTimer = setTimeout(() => {
        const results = searchIndex.filter(item => {
          return item.title.toLowerCase().includes(query) ||
                 item.content.toLowerCase().includes(query) ||
                 (item.summary && item.summary.toLowerCase().includes(query));
        }).slice(0, 5);

        if (results.length === 0) {
          searchResults.innerHTML = '<div style="padding: 1rem; text-align: center; color: var(--text-tertiary);">Nenhum resultado encontrado 😕</div>';
        } else {
          searchResults.innerHTML = results.map(result => `
            <a href="${result.permalink}" class="search-result-item">
              <div class="search-result-title">${highlightQuery(result.title, query)}</div>
              <div class="search-result-excerpt">${truncate(result.summary || result.content, 100)}</div>
            </a>
          `).join('');
        }
      }, 300);
    });

    // Atalho de teclado (Ctrl/Cmd + K)
    document.addEventListener('keydown', (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        searchToggle.click();
      }
    });
  }

  function highlightQuery(text, query) {
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark style="background: rgba(66, 133, 244, 0.2); padding: 0 2px;">$1</mark>');
  }

  function truncate(text, length) {
    if (text.length <= length) return text;
    return text.substr(0, length) + '...';
  }

  // ================================================
  // 3. FIXED CTA BOX (Scroll Triggered)
  // ================================================
  function initFixedCTA() {
    // Criar CTA fixo se estivermos em uma página de post
    if (!document.querySelector('.post-single')) return;

    const fixedCTA = document.createElement('div');
    fixedCTA.className = 'fixed-cta-box';
    fixedCTA.innerHTML = `
      <button class="fixed-cta-close" aria-label="Fechar">&times;</button>
      <h4>🚀 Teste a Vocaliza Grátis</h4>
      <p>Automatize seu atendimento com IA de voz em minutos</p>
      <a href="https://vocaliza.app" target="_blank" rel="noopener" class="cta-button">
        Começar Agora →
      </a>
    `;
    document.body.appendChild(fixedCTA);

    // Mostrar após scroll
    let shown = false;
    window.addEventListener('scroll', () => {
      const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      
      if (scrollPercent > 25 && !shown) {
        fixedCTA.classList.add('visible');
        shown = true;
      }
    }, { passive: true });

    // Fechar ao clicar no X
    fixedCTA.querySelector('.fixed-cta-close').addEventListener('click', () => {
      fixedCTA.remove();
    });
  }

  // ================================================
  // 4. SCROLL REVEAL ANIMATIONS
  // ================================================
  function initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    // Adicionar classe scroll-reveal aos elementos
    document.querySelectorAll('.post-entry, .first-entry, .use-case-card, .stat-item').forEach(el => {
      el.classList.add('scroll-reveal');
      observer.observe(el);
    });
  }

  // ================================================
  // 5. PREFETCH DE LINKS NO HOVER
  // ================================================
  function initLinkPrefetch() {
    const links = document.querySelectorAll('a[href^="/"]');
    const prefetched = new Set();

    links.forEach(link => {
      link.addEventListener('mouseenter', () => {
        const href = link.getAttribute('href');
        if (prefetched.has(href)) return;

        const prefetchLink = document.createElement('link');
        prefetchLink.rel = 'prefetch';
        prefetchLink.href = href;
        document.head.appendChild(prefetchLink);
        
        prefetched.add(href);
      }, { once: true });
    });
  }

  // ================================================
  // 6. WEB SHARE API (Mobile)
  // ================================================
  function initWebShare() {
    if (!navigator.share) return;

    const shareButtons = document.querySelectorAll('.share-button, [data-share]');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', async (e) => {
        e.preventDefault();
        
        try {
          await navigator.share({
            title: document.title,
            text: document.querySelector('meta[name="description"]')?.content || '',
            url: window.location.href
          });
        } catch (err) {
          console.log('Compartilhamento cancelado ou erro:', err);
        }
      });
    });

    // Adicionar botão de compartilhar nativo se não existir
    const postFooter = document.querySelector('.post-footer');
    if (postFooter && !postFooter.querySelector('[data-share]')) {
      const shareBtn = document.createElement('button');
      shareBtn.className = 'cta-button';
      shareBtn.setAttribute('data-share', 'true');
      shareBtn.innerHTML = '📤 Compartilhar';
      shareBtn.style.marginTop = '1rem';
      postFooter.appendChild(shareBtn);
      
      shareBtn.addEventListener('click', async () => {
        try {
          await navigator.share({
            title: document.title,
            url: window.location.href
          });
        } catch (err) {
          console.log('Compartilhamento cancelado');
        }
      });
    }
  }

  // ================================================
  // 7. SERVICE WORKER (PWA Light)
  // ================================================
  function initServiceWorker() {
    if ('serviceWorker' in navigator && location.hostname !== 'localhost') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(reg => console.log('Service Worker registrado:', reg))
          .catch(err => console.log('Erro ao registrar SW:', err));
      });
    }
  }

  // ================================================
  // 8. MOBILE MENU TOGGLE
  // ================================================
  function initMobileMenu() {
    const toggle = document.getElementById('mobile-menu-toggle');
    const nav = document.querySelector('.nav-enhanced');
    
    if (!toggle || !nav) return;

    toggle.addEventListener('click', () => {
      nav.classList.toggle('active');
      toggle.classList.toggle('active');
    });

    // Fechar ao clicar em um link
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('active');
        toggle.classList.remove('active');
      });
    });
  }

  // ================================================
  // 9. READING TIME CALCULATION
  // ================================================
  function addReadingTime() {
    const postContent = document.querySelector('.post-content');
    const postMeta = document.querySelector('.post-meta');
    
    if (!postContent || !postMeta) return;

    const text = postContent.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // 200 palavras por minuto

    const readingTimeEl = document.createElement('span');
    readingTimeEl.className = 'reading-time';
    readingTimeEl.textContent = `${readingTime} min de leitura`;
    
    postMeta.appendChild(readingTimeEl);
  }

  // ================================================
  // 10. COPY TO CLIPBOARD TOAST
  // ================================================
  function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: ${type === 'success' ? '#10b981' : '#ef4444'};
      color: white;
      padding: 0.875rem 1.5rem;
      border-radius: 12px;
      font-weight: 600;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      animation: slideUp 0.3s ease, fadeOut 0.3s ease 2.7s;
    `;

    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  }

  // ================================================
  // 11. ENGAGEMENT INDICATORS (Mock)
  // ================================================
  function addEngagementIndicators() {
    const posts = document.querySelectorAll('.post-entry, .first-entry');
    
    posts.forEach((post, index) => {
      const footer = post.querySelector('.entry-footer');
      if (!footer) return;

      const indicators = document.createElement('div');
      indicators.className = 'engagement-indicators';
      
      // Mock data (em produção, viria de analytics)
      const views = Math.floor(Math.random() * 5000) + 500;
      const isTrending = index === 0;
      const isPopular = views > 2000;

      let html = '';
      if (isTrending) {
        html += '<span class="engagement-item trending">🔥 Trending</span>';
      }
      if (isPopular) {
        html += '<span class="engagement-item popular">⭐ Popular</span>';
      }
      html += `<span class="engagement-item">👁️ ${views.toLocaleString('pt-BR')} visualizações</span>`;

      indicators.innerHTML = html;
      footer.appendChild(indicators);
    });
  }

  // ================================================
  // 12. CATEGORY BADGES COM ÍCONES
  // ================================================
  function enhanceCategoryBadges() {
    const categoryIcons = {
      'ia': '🤖',
      'voz': '🎙️',
      'tutorial': '📚',
      'case': '💼',
      'tecnologia': '⚙️',
      'negócios': '💰',
      'automação': '⚡'
    };

    document.querySelectorAll('.post-categories a, .post-tags a').forEach(badge => {
      const text = badge.textContent.toLowerCase();
      
      // Detectar categoria e adicionar ícone
      for (const [key, icon] of Object.entries(categoryIcons)) {
        if (text.includes(key)) {
          badge.innerHTML = `${icon} ${badge.textContent}`;
          
          // Adicionar classe de cor
          badge.classList.add(`category-badge`);
          if (text.includes('ia') || text.includes('voz')) {
            badge.classList.add('ia-voz');
          } else if (text.includes('tutorial')) {
            badge.classList.add('tutorial');
          } else if (text.includes('case')) {
            badge.classList.add('case');
          } else {
            badge.classList.add('tecnologia');
          }
          break;
        }
      }
    });
  }

  // ================================================
  // INICIALIZAÇÃO
  // ================================================
  function init() {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runAll);
    } else {
      runAll();
    }
  }

  function runAll() {
    initDarkMode();
    initSearch();
    initFixedCTA();
    initScrollReveal();
    initLinkPrefetch();
    initWebShare();
    initServiceWorker();
    initMobileMenu();
    addReadingTime();
    addEngagementIndicators();
    enhanceCategoryBadges();

    console.log('✨ Vocaliza Blog 2.0 - Todas as melhorias carregadas');
  }

  // Adicionar animações CSS necessárias
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideUp {
      from { transform: translate(-50%, 20px); opacity: 0; }
      to { transform: translate(-50%, 0); opacity: 1; }
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Iniciar
  init();

})();
