/**
 * ConvertFileBox Web Components & Shared Logic
 * 120-point Architecture: Ensures absolute UI consistency and modularity.
 */

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
        const privacyPath = `${prefix}/privacy/`;

        this.innerHTML = `
        <header class="site-header">
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
        links.forEach(link => {
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
