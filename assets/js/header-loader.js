(function() {
    const HOST_SELECTOR = '[data-component="app-shell-host"]';
    const DEFAULT_LAYOUT_SRC = 'header-navigation.html';
    const DEFAULT_BEHAVIOR_SRC = '../assets/js/script.js';
    const DEFAULT_FRAGMENT_SELECTOR = '[data-page-fragment]';

    document.addEventListener('DOMContentLoaded', function() {
        const host = document.querySelector(HOST_SELECTOR);
        if (!host) {
            return;
        }

        const layoutSrc = host.getAttribute('data-src') || DEFAULT_LAYOUT_SRC;
        const behaviorSrc = host.getAttribute('data-behavior-src') || DEFAULT_BEHAVIOR_SRC;
        const fragmentSelector = host.getAttribute('data-page-fragment-selector') || DEFAULT_FRAGMENT_SELECTOR;
        const pageFragment = document.querySelector(fragmentSelector);

        fetch(layoutSrc)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`无法加载布局：${layoutSrc}`);
                }
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const shell = doc.querySelector('[data-component="app-shell"]');
                host.innerHTML = shell ? shell.innerHTML : html;

                injectPageContent(host, pageFragment);
                host.dispatchEvent(new CustomEvent('app-shell:loaded'));
                return ensureBehaviorScript(behaviorSrc);
            })
            .then(() => {
                if (typeof window.initializeHeaderInteractions === 'function') {
                    window.initializeHeaderInteractions();
                }
            })
            .catch(error => {
                console.error(error);
                host.innerHTML = '<div class="alert alert-danger">无法加载公共框架，请检查 data-src 或网络连接。</div>';
            });
    });

    function injectPageContent(host, pageFragment) {
        if (!pageFragment) {
            return;
        }

        const slot = host.querySelector('[data-slot="page-content"]');
        if (!slot) {
            return;
        }

        const fragment = cloneFragment(pageFragment);
        if (!fragment) {
            return;
        }

        slot.replaceChildren(fragment);

        const shouldPreserve = pageFragment.dataset && pageFragment.dataset.preserve === 'true';
        if (!shouldPreserve) {
            pageFragment.remove();
        }
    }

    function cloneFragment(source) {
        if (source.tagName === 'TEMPLATE') {
            return source.content.cloneNode(true);
        }

        const fragment = document.createDocumentFragment();
        Array.from(source.childNodes).forEach(node => {
            fragment.appendChild(node.cloneNode(true));
        });
        return fragment;
    }

    function ensureBehaviorScript(src) {
        if (typeof window.initializeHeaderInteractions === 'function') {
            return Promise.resolve();
        }

        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src || DEFAULT_BEHAVIOR_SRC;
            script.dataset.shellBehavior = 'true';
            script.onload = () => {
                if (typeof window.initializeHeaderInteractions === 'function') {
                    resolve();
                } else {
                    reject(new Error('布局脚本已加载，但未导出 initializeHeaderInteractions。'));
                }
            };
            script.onerror = () => reject(new Error(`无法加载脚本：${script.src}`));
            document.head.appendChild(script);
        });
    }
})();
