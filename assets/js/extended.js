// ================================================
// VOCALIZA BLOG - INTERACTIVE ENHANCEMENTS
// Scripts para melhorar a experiência do usuário
// ================================================

(function() {
  'use strict';

  // ================================================
  // 1. READING PROGRESS BAR
  // ================================================
  function createReadingProgressBar() {
    // Verificar se estamos em uma página de post
    if (!document.querySelector('.post-single')) return;

    const progressBar = document.createElement('div');
    progressBar.className = 'reading-progress';
    document.body.prepend(progressBar);

    function updateProgressBar() {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = (scrolled / documentHeight) * 100;
      
      progressBar.style.width = `${Math.min(progress, 100)}%`;
    }

    window.addEventListener('scroll', updateProgressBar, { passive: true });
    updateProgressBar();
  }

  // ================================================
  // 2. SCROLL TO TOP BUTTON
  // ================================================
  function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>';
    button.setAttribute('aria-label', 'Voltar ao topo');
    document.body.appendChild(button);

    function toggleButtonVisibility() {
      if (window.scrollY > 300) {
        button.classList.add('visible');
      } else {
        button.classList.remove('visible');
      }
    }

    button.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });

    window.addEventListener('scroll', toggleButtonVisibility, { passive: true });
    toggleButtonVisibility();
  }

  // ================================================
  // 3. LAZY LOADING DE IMAGENS
  // ================================================
  function setupLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
              img.src = img.dataset.src;
              img.classList.add('loaded');
              observer.unobserve(img);
            }
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  // ================================================
  // 4. SMOOTH SCROLL PARA ÂNCORAS
  // ================================================
  function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Atualizar URL sem scroll
          history.pushState(null, null, targetId);
        }
      });
    });
  }

  // ================================================
  // 5. ANIMAÇÕES ON SCROLL
  // ================================================
  function setupScrollAnimations() {
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      }, {
        threshold: 0.1
      });

      document.querySelectorAll('.fade-in-on-scroll').forEach(el => {
        animationObserver.observe(el);
      });

      // Aplicar classe aos cards para animação escalonada
      document.querySelectorAll('.post-card').forEach((card, index) => {
        card.style.setProperty('--index', index);
      });
    }
  }

  // ================================================
  // 6. COPY CODE BUTTON
  // ================================================
  function setupCodeCopyButtons() {
    document.querySelectorAll('pre code').forEach((codeBlock) => {
      const pre = codeBlock.parentElement;
      
      // Criar botão de copiar
      const button = document.createElement('button');
      button.className = 'code-copy-button';
      button.textContent = 'Copiar';
      button.setAttribute('aria-label', 'Copiar código');
      
      pre.style.position = 'relative';
      pre.appendChild(button);

      button.addEventListener('click', async () => {
        const code = codeBlock.textContent;
        
        try {
          await navigator.clipboard.writeText(code);
          button.textContent = '✓ Copiado!';
          button.style.background = '#10b981';
          
          setTimeout(() => {
            button.textContent = 'Copiar';
            button.style.background = 'rgba(66, 133, 244, 0.8)';
          }, 2000);
        } catch (err) {
          button.textContent = 'Erro';
          setTimeout(() => {
            button.textContent = 'Copiar';
          }, 2000);
        }
      });
    });
  }

  // ================================================
  // 7. EXTERNAL LINKS (abrir em nova aba)
  // ================================================
  function setupExternalLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.href.includes(window.location.hostname)) {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }

  // ================================================
  // 8. TABLE OF CONTENTS HIGHLIGHT
  // ================================================
  function setupTOCHighlight() {
    const toc = document.querySelector('.toc');
    if (!toc) return;

    const headings = document.querySelectorAll('.post-content h2, .post-content h3');
    const tocLinks = toc.querySelectorAll('a');

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            tocLinks.forEach(link => {
              if (link.getAttribute('href') === `#${id}`) {
                tocLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
              }
            });
          }
        });
      }, {
        rootMargin: '-100px 0px -66%'
      });

      headings.forEach(heading => observer.observe(heading));
    }
  }

  // ================================================
  // 9. PERFORMANCE: DEFER IMAGES BELOW FOLD
  // ================================================
  function deferBelowFoldImages() {
    const images = document.querySelectorAll('img');
    images.forEach((img, index) => {
      if (index > 3) { // Primeiras 3 imagens carregam normalmente
        img.loading = 'lazy';
      }
    });
  }

  // ================================================
  // 10. DARK MODE TOGGLE (se implementado)
  // ================================================
  function setupDarkModeToggle() {
    const toggle = document.querySelector('#theme-toggle');
    if (!toggle) return;

    toggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });

    // Carregar preferência salva
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
  }

  // ================================================
  // 11. SHARE BUTTONS ENHANCEMENT
  // ================================================
  function setupShareButtons() {
    const shareButtons = document.querySelectorAll('.share-button');
    
    shareButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        const url = button.dataset.url || window.location.href;
        const title = button.dataset.title || document.title;
        const platform = button.dataset.platform;

        let shareUrl = '';
        
        switch(platform) {
          case 'twitter':
            shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`;
            break;
          case 'facebook':
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
            break;
          case 'linkedin':
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
            break;
          case 'whatsapp':
            shareUrl = `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`;
            break;
        }

        if (shareUrl) {
          window.open(shareUrl, '_blank', 'width=600,height=400');
        }
      });
    });
  }

  // ================================================
  // 12. ANALYTICS TRACKING (GA4, se configurado)
  // ================================================
  function trackOutboundLinks() {
    document.querySelectorAll('a[href^="http"]').forEach(link => {
      if (!link.href.includes(window.location.hostname)) {
        link.addEventListener('click', (e) => {
          if (typeof gtag !== 'undefined') {
            gtag('event', 'click', {
              event_category: 'outbound',
              event_label: link.href,
              transport_type: 'beacon'
            });
          }
        });
      }
    });
  }

  // ================================================
  // INICIALIZAÇÃO
  // ================================================
  function init() {
    // Executar quando DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', runInitializers);
    } else {
      runInitializers();
    }
  }

  function runInitializers() {
    createReadingProgressBar();
    createScrollToTopButton();
    setupLazyLoading();
    setupSmoothScrolling();
    setupScrollAnimations();
    setupCodeCopyButtons();
    setupExternalLinks();
    setupTOCHighlight();
    deferBelowFoldImages();
    setupDarkModeToggle();
    setupShareButtons();
    trackOutboundLinks();

    // Log de inicialização (remover em produção)
    console.log('✨ Vocaliza Blog - Interactive enhancements loaded');
  }

  // Iniciar
  init();

})();
