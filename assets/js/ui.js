/**
 * ConvertFileBox Web Components & Shared Logic
 * 120-point Architecture: Ensures absolute UI consistency and modularity.
 */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.error('ServiceWorker registration failed: ', err);
    });
  });
}

class SiteHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const lang = document.documentElement.lang || 'ja-jp';
    const isEn = lang.startsWith('en');
    const prefix = isEn ? '/en-us' : '/ja-jp';

    const homePath = `${prefix}/`;
    const toolsPath = `${prefix}/tools/`;
    const aboutPath = `${prefix}/about/`;

    this.innerHTML = `
        <header class="site-header sticky top-0 z-50 bg-surface/80 backdrop-blur-md border-b border-outline-variant transition-colors duration-300">
            <div class="container flex items-center justify-between" style="height: 100%;">
                <a href="${homePath}" class="brand">
                    <div class="brand-logo" aria-hidden="true">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
                            <polyline points="14 2 14 8 20 8" />
                            <path d="M8 13h8" />
                            <path d="M8 17h8" />
                            <path d="M10 9h4" />
                        </svg>
                    </div>
                    <div>
                        ConvertFileBox
                        <span class="text-xs text-muted" style="display:block; font-weight:400; line-height:1;">
                            ${isEn ? 'Free Tool Collection' : '無料ツール集'}
                        </span>
                    </div>
                </a>

                <div class="flex items-center gap-4">
                    <nav id="nav-links" class="nav-links">
                        <a href="${homePath}" class="nav-link">${isEn ? 'Home' : 'ホーム'}</a>
                        <a href="${toolsPath}" class="nav-link">${isEn ? 'Tools' : 'ツール一覧'}</a>
                        <a href="${aboutPath}" class="nav-link">${isEn ? 'About' : 'このサイトについて'}</a>
                    </nav>

                    <div class="lang-switcher">
                        <a href="${this.getSwitchUrl('ja-jp')}" class="lang-link ${!isEn ? 'active' : ''}">JP</a>
                        <span class="text-light">|</span>
                        <a href="${this.getSwitchUrl('en-us')}" class="lang-link ${isEn ? 'active' : ''}">EN</a>
                    </div>
                    
                    <button id="themeToggle" class="theme-toggle-btn" aria-label="Toggle Dark Mode" style="background:none; border:none; cursor:pointer; color:inherit; display:flex; align-items:center;">
                        <!-- Sun icon (for dark mode active) -->
                        <svg class="icon-sun" style="display:none;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <circle cx="12" cy="12" r="5"></circle>
                            <line x1="12" y1="1" x2="12" y2="3"></line>
                            <line x1="12" y1="21" x2="12" y2="23"></line>
                            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                            <line x1="1" y1="12" x2="3" y2="12"></line>
                            <line x1="21" y1="12" x2="23" y2="12"></line>
                            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                        </svg>
                        <!-- Moon icon (for light mode active) -->
                        <svg class="icon-moon" style="display:block;" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                        </svg>
                    </button>

                    <button id="mobile-menu-btn" class="mobile-menu-btn" aria-label="Menu">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="3" y1="12" x2="21" y2="12"></line>
                            <line x1="3" y1="6" x2="21" y2="6"></line>
                            <line x1="3" y1="18" x2="21" y2="18"></line>
                        </svg>
                    </button>
                </div>
            </div>
        </header>
        `;

    this.initMobileMenu();
    this.setActiveLink();
    this.initThemeToggle();
  }

  initThemeToggle() {
    const btn = this.querySelector('#themeToggle');
    if (!btn) return;

    const iconSun = btn.querySelector('.icon-sun');
    const iconMoon = btn.querySelector('.icon-moon');

    // Check initial preference from localStorage or OS
    const savedTheme = localStorage.getItem('theme');
    const prefersDark =
      window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      document.documentElement.classList.add('dark');
      iconSun.style.display = 'block';
      iconMoon.style.display = 'none';
    } else {
      document.documentElement.classList.remove('dark');
      iconSun.style.display = 'none';
      iconMoon.style.display = 'block';
    }

    btn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');

      if (isDark) {
        iconSun.style.display = 'block';
        iconMoon.style.display = 'none';
      } else {
        iconSun.style.display = 'none';
        iconMoon.style.display = 'block';
      }
    });
  }

  getSwitchUrl(targetLang) {
    const currentPath = window.location.pathname;
    if (targetLang === 'en-us') {
      if (currentPath.includes('/en-us/')) return currentPath;
      return currentPath.replace('/ja-jp/', '/en-us/');
    } else {
      if (currentPath.includes('/ja-jp/')) return currentPath;
      return currentPath.replace('/en-us/', '/ja-jp/');
    }
  }

  initMobileMenu() {
    const btn = this.querySelector('#mobile-menu-btn');
    const nav = this.querySelector('#nav-links');
    if (btn && nav) {
      btn.addEventListener('click', () => {
        nav.classList.toggle('open');
      });
    }
  }

  setActiveLink() {
    const currentPath = window.location.pathname;
    const links = this.querySelectorAll('.nav-link');
    links.forEach((link) => {
      if (link.getAttribute('href') === currentPath) {
        link.classList.add('active');
      }
    });
  }
}

class SiteFooter extends HTMLElement {
  connectedCallback() {
    const lang = document.documentElement.lang || 'ja-jp';
    const isEn = lang.startsWith('en');
    const prefix = isEn ? '/en-us' : '/ja-jp';

    const toolsPath = `${prefix}/tools/`;
    const aboutPath = `${prefix}/about/`;
    const privacyPath = `${prefix}/privacy/`;

    this.innerHTML = `
        <footer class="site-footer">
            <div class="container text-center">
                <div class="flex justify-center gap-4 mb-4 text-sm text-muted">
                    <a href="${toolsPath}">${isEn ? 'Tools' : 'ツール一覧'}</a>
                    <a href="${aboutPath}">${isEn ? 'About' : 'このサイトについて'}</a>
                    <a href="${privacyPath}">${isEn ? 'Privacy' : 'プライバシーポリシー'}</a>
                </div>
                <div class="text-xs text-muted">
                    &copy; ${new Date().getFullYear()} ConvertFileBox. <br>
                    ${isEn ? 'Accuracy not guaranteed (Use at your own risk).' : '変換結果の正確性は保証しません（自己責任でご利用ください）。'}
                </div>
            </div>
        </footer>
        `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
