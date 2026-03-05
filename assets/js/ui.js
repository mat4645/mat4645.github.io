/**
 * ConvertFileBox Web Components & Shared Logic
 * 120-point Architecture: Ensures absolute UI consistency and modularity.
 */

if (
  'serviceWorker' in navigator &&
  location.hostname !== 'localhost' &&
  location.hostname !== '127.0.0.1'
) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch((err) => {
      console.error('ServiceWorker registration failed: ', err);
    });
  });
} else if ('serviceWorker' in navigator) {
  // on localhost, unregister existing service workers to avoid stale cache
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
    }
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

    const homePath = `${prefix}/tools/`;
    const toolsPath = `${prefix}/tools/`;
    const aboutPath = `${prefix}/about/`;

    this.innerHTML = `
        <header class="bg-[#1e3a8a] text-white">
            <div class="max-w-4xl mx-auto px-6 h-16 flex items-center justify-between">
                <a href="${homePath}" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
                    <svg class="w-8 h-8" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.5 7.5h-.75A2.25 2.25 0 0 0 4.5 9.75v7.5a2.25 2.25 0 0 0 2.25 2.25h7.5a2.25 2.25 0 0 0 2.25-2.25v-7.5a2.25 2.25 0 0 0-2.25-2.25h-.75m-6 3.75 3 3m0 0 3-3m-3 3V1.5m6 9h.75a2.25 2.25 0 0 1 2.25 2.25v7.5a2.25 2.25 0 0 1-2.25 2.25h-7.5a2.25 2.25 0 0 1-2.25-2.25v-.75" stroke-linecap="round" stroke-linejoin="round"></path>
                    </svg>
                    <span class="text-xl font-bold tracking-tight">ConvertFileBox</span>
                </a>
                <div class="flex items-center gap-4">
                    <nav id="nav-links" class="hidden sm:flex gap-6 text-sm font-medium">
                        <a href="${toolsPath}" class="nav-link hover:text-[#059669] transition-colors">${isEn ? 'Tools' : 'ツール'}</a>
                        <a href="${aboutPath}" class="nav-link hover:text-[#059669] transition-colors">${isEn ? 'Document' : 'ドキュメント'}</a>
                    </nav>
                    <div class="lang-switcher text-sm flex gap-2 border-l border-white/20 pl-4">
                        <a href="${this.getSwitchUrl('ja-jp')}" class="${!isEn ? 'font-bold' : 'text-white/60'} hover:text-white transition-colors">JP</a>
                        <a href="${this.getSwitchUrl('en-us')}" class="${isEn ? 'font-bold' : 'text-white/60'} hover:text-white transition-colors">EN</a>
                    </div>
                    <button id="themeToggle" class="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded hover:bg-white/10 transition-colors" aria-label="Toggle Dark Mode">
                        <svg class="icon-sun w-6 h-6 hidden" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <svg class="icon-moon w-6 h-6" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" stroke-linecap="round" stroke-linejoin="round"></path>
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
        <footer class="max-w-4xl mx-auto w-full px-6 py-10 border-t border-slate-200 dark:border-slate-800 text-center text-slate-400 text-sm mt-16 transition-colors duration-200">
            <p>&copy; ${new Date().getFullYear()} ConvertFileBox. All rights reserved.</p>
            <div class="mt-2 text-xs opacity-80 mb-4">
                ${isEn ? 'Accuracy not guaranteed (Use at your own risk).' : '変換結果の正確性は保証しません（自己責任でご利用ください）。'}
            </div>
            <div class="flex justify-center flex-wrap gap-4">
                <a class="hover:underline hover:text-slate-600 dark:hover:text-slate-300 transition-colors" href="${toolsPath}">${isEn ? 'Tools' : 'ツール一覧'}</a>
                <a class="hover:underline hover:text-slate-600 dark:hover:text-slate-300 transition-colors" href="${aboutPath}">${isEn ? 'About' : 'このサイトについて'}</a>
                <a class="hover:underline hover:text-slate-600 dark:hover:text-slate-300 transition-colors" href="${privacyPath}">${isEn ? 'Privacy' : 'プライバシーポリシー'}</a>
            </div>
        </footer>
        `;
  }
}

customElements.define('site-header', SiteHeader);
customElements.define('site-footer', SiteFooter);
