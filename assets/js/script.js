(function() {
    function initializeHeaderInteractions() {
        const header = document.querySelector('.main-header');
        if (!header) {
            return false;
        }

        if (header.dataset.behaviorsBound === 'true') {
            return true;
        }

        header.dataset.behaviorsBound = 'true';

        bindDropdown('product-dropdown-toggle', 'product-dropdown');
        bindDropdown('community-dropdown-toggle', 'community-dropdown');
        bindSearchDropdown();
        bindLoginModal();
        bindGlobalClicks();
        bindLoginModes();
        updateLoginMode('no-password');

        return true;
    }

    function bindDropdown(toggleId, menuId) {
        const toggle = document.getElementById(toggleId);
        const menu = document.getElementById(menuId);

        if (!toggle || !menu) {
            return;
        }

        toggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();

            const isVisible = menu.classList.contains('show');
            closeAllDropdowns();

            if (!isVisible) {
                menu.classList.add('show');
            }
        });
    }

    function bindSearchDropdown() {
        const searchInput = document.getElementById('search-input');
        const searchDropdown = document.getElementById('search-dropdown');
        const searchOptions = document.querySelectorAll('.search-option');

        if (!searchInput || !searchDropdown) {
            return;
        }

        searchInput.addEventListener('focus', function() {
            closeAllDropdowns();
            searchDropdown.classList.add('show');
        });

        searchOptions.forEach(option => {
            option.addEventListener('click', function() {
                searchOptions.forEach(opt => opt.classList.remove('selected'));
                this.classList.add('selected');

                const searchType = this.getAttribute('data-search-type');
                const baseUrl = this.getAttribute('data-url');
                const searchQuery = searchInput.value.trim();

                if (searchQuery) {
                    const searchUrl = searchType === 'internal'
                        ? `/search?q=${encodeURIComponent(searchQuery)}`
                        : baseUrl + encodeURIComponent(searchQuery);
                    window.open(searchUrl, '_blank');
                } else if (searchType !== 'internal') {
                    window.open(baseUrl, '_blank');
                }

                searchDropdown.classList.remove('show');
            });
        });
    }

    function bindLoginModal() {
        const loginBtn = document.querySelector('.btn-login');
        const loginModal = document.getElementById('login-modal');
        const modalClose = document.getElementById('modal-close');
        const getCodeBtn = document.getElementById('get-code-btn');
        const loginSubmitBtn = document.getElementById('login-btn');
        const phoneInput = document.getElementById('phone');
        const verificationInput = document.getElementById('verification-code');

        if (loginBtn && loginModal) {
            loginBtn.addEventListener('click', function(event) {
                event.preventDefault();
                loginModal.classList.add('show');
                document.body.style.overflow = 'hidden';
            });
        }

        function closeModal() {
            if (loginModal) {
                loginModal.classList.remove('show');
                document.body.style.overflow = 'auto';
            }
        }

        if (modalClose) {
            modalClose.addEventListener('click', closeModal);
        }

        if (loginModal) {
            loginModal.addEventListener('click', function(event) {
                if (event.target === loginModal) {
                    closeModal();
                }
            });
        }

        document.addEventListener('keydown', function(event) {
            if (event.key === 'Escape' && loginModal && loginModal.classList.contains('show')) {
                closeModal();
            }
        });

        if (getCodeBtn && phoneInput) {
            getCodeBtn.addEventListener('click', function() {
                const phoneNumber = phoneInput.value.trim();

                if (!phoneNumber) {
                    showMessage('请输入手机号');
                    return;
                }

                if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
                    showMessage('请输入正确的手机号格式');
                    return;
                }

                let countdown = 60;
                this.disabled = true;
                this.textContent = `${countdown}秒后重试`;

                const timer = setInterval(() => {
                    countdown--;
                    this.textContent = `${countdown}秒后重试`;

                    if (countdown <= 0) {
                        clearInterval(timer);
                        this.disabled = false;
                        this.textContent = '获取验证码';
                    }
                }, 1000);

                showMessage('验证码已发送到您的手机');
            });
        }

        if (loginSubmitBtn) {
            loginSubmitBtn.addEventListener('click', function() {
                const phoneNumber = phoneInput ? phoneInput.value.trim() : '';
                const verificationCode = verificationInput ? verificationInput.value.trim() : '';

                if (!phoneNumber) {
                    showMessage('请输入手机号');
                    return;
                }

                if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
                    showMessage('请输入正确的手机号格式');
                    return;
                }

                if (!verificationCode) {
                    showMessage('请输入验证码');
                    return;
                }

                showMessage('登录成功！');
                setTimeout(() => {
                    closeModal();
                    if (phoneInput) phoneInput.value = '';
                    if (verificationInput) verificationInput.value = '';
                }, 1500);
            });
        }
    }

    function bindLoginModes() {
        const loginModes = document.querySelectorAll('.login-mode');

        if (!loginModes.length) {
            return;
        }

        loginModes.forEach(mode => {
            mode.addEventListener('click', function() {
                loginModes.forEach(item => item.classList.remove('active'));
                this.classList.add('active');

                const loginMode = this.getAttribute('data-mode');
                updateLoginMode(loginMode);
            });
        });
    }

    function bindGlobalClicks() {
        document.addEventListener('click', function(event) {
            const searchDropdown = document.getElementById('search-dropdown');
            if (!event.target.closest('.search-box') && searchDropdown) {
                searchDropdown.classList.remove('show');
            }

            closeAllDropdowns();
        });

        const dropdowns = document.querySelectorAll('.dropdown-menu');
        dropdowns.forEach(dropdown => {
            dropdown.addEventListener('click', function(event) {
                event.stopPropagation();
            });
        });
    }

    function closeAllDropdowns() {
        document.querySelectorAll('.dropdown-menu').forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    function updateLoginMode(mode) {
        const defaultForm = document.getElementById('login-form-default');
        const weixinForm = document.getElementById('login-form-weixin');

        if (!defaultForm || !weixinForm) {
            return;
        }

        if (mode === 'weixin') {
            defaultForm.style.display = 'none';
            weixinForm.style.display = 'block';
            showMessage('请使用微信扫描二维码登录');
            return;
        }

        defaultForm.style.display = 'block';
        weixinForm.style.display = 'none';

        const phoneGroup = document.querySelector('.form-group:has(#phone)');
        const verificationGroup = document.querySelector('.form-group:has(#verification-code)');

        if (mode === 'no-password') {
            if (phoneGroup) phoneGroup.style.display = 'block';
            if (verificationGroup) verificationGroup.style.display = 'block';

            if (verificationGroup) {
                const verificationLabel = verificationGroup.querySelector('label');
                const verificationField = verificationGroup.querySelector('.verification-input');
                const getCodeBtn = verificationGroup.querySelector('.get-code-btn');

                if (verificationLabel) verificationLabel.textContent = '验证码：';
                if (verificationField) {
                    verificationField.type = 'text';
                    verificationField.placeholder = '请输入验证码';
                }
                if (getCodeBtn) getCodeBtn.style.display = 'inline-block';
            }

            showMessage('请输入手机号和验证码进行免密码登录');
            return;
        }

        if (phoneGroup) phoneGroup.style.display = 'block';
        if (verificationGroup) {
            verificationGroup.style.display = 'block';

            const verificationLabel = verificationGroup.querySelector('label');
            const verificationField = verificationGroup.querySelector('.verification-input');
            const getCodeBtn = verificationGroup.querySelector('.get-code-btn');

            if (verificationLabel) verificationLabel.textContent = '密码：';
            if (verificationField) {
                verificationField.type = 'password';
                verificationField.placeholder = '请输入密码';
            }
            if (getCodeBtn) getCodeBtn.style.display = 'none';
        }

        showMessage('请输入手机号和密码');
    }

    function showMessage(message) {
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: #fff;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        messageDiv.textContent = message;

        document.body.appendChild(messageDiv);

        requestAnimationFrame(() => {
            messageDiv.style.opacity = '1';
        });

        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                messageDiv.remove();
            }, 300);
        }, 3000);
    }

    window.toggleHotTags = function() {
        const hotTagsContent = document.getElementById('hot-tags-content');
        const tagsArrow = document.getElementById('tags-arrow');

        if (!hotTagsContent) {
            return;
        }

        const isHidden = hotTagsContent.style.display === 'none' || hotTagsContent.style.display === '';
        if (isHidden) {
            hotTagsContent.style.display = 'block';
            hotTagsContent.classList.add('show');
            if (tagsArrow) {
                tagsArrow.classList.remove('fa-caret-down');
                tagsArrow.classList.add('fa-caret-up');
            }
        } else {
            hotTagsContent.classList.remove('show');
            setTimeout(() => {
                if (!hotTagsContent.classList.contains('show')) {
                    hotTagsContent.style.display = 'none';
                }
            }, 300);
            if (tagsArrow) {
                tagsArrow.classList.remove('fa-caret-up');
                tagsArrow.classList.add('fa-caret-down');
            }
        }
    };

    document.addEventListener('DOMContentLoaded', function() {
        initializeHeaderInteractions();
    });

    window.initializeHeaderInteractions = initializeHeaderInteractions;
})();

// 头条咨询轮播功能
function initializeHeadlineCarousel() {
    const carouselContainer = document.querySelector('.carousel-container');
    if (!carouselContainer) {
        return;
    }

    const carouselItems = document.querySelectorAll('.carousel-item');
    const indicators = document.querySelectorAll('.indicator');
    const prevBtn = document.querySelector('.carousel-control.prev');
    const nextBtn = document.querySelector('.carousel-control.next');
    
    let currentIndex = 0;
    let autoplayInterval;
    
    // 设置活动项
    function setActiveItem(index) {
        // 隐藏所有项并移除活动状态
        carouselItems.forEach(item => {
            item.classList.remove('active');
        });
        indicators.forEach(indicator => {
            indicator.classList.remove('active');
        });
        
        // 显示当前项并添加活动状态
        carouselItems[index].classList.add('active');
        indicators[index].classList.add('active');
        currentIndex = index;
    }
    
    // 下一项
    function nextItem() {
        let nextIndex = (currentIndex + 1) % carouselItems.length;
        setActiveItem(nextIndex);
    }
    
    // 上一项
    function prevItem() {
        let prevIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        setActiveItem(prevIndex);
    }
    
    // 开始自动播放
    function startAutoplay() {
        autoplayInterval = setInterval(nextItem, 5000);
    }
    
    // 停止自动播放
    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
        }
    }
    
    // 事件监听
    prevBtn.addEventListener('click', () => {
        stopAutoplay();
        prevItem();
        startAutoplay();
    });
    
    nextBtn.addEventListener('click', () => {
        stopAutoplay();
        nextItem();
        startAutoplay();
    });
    
    // 指示器点击事件
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            stopAutoplay();
            setActiveItem(index);
            startAutoplay();
        });
    });
    
    // 鼠标悬停时停止自动播放
    carouselContainer.addEventListener('mouseenter', stopAutoplay);
    carouselContainer.addEventListener('mouseleave', startAutoplay);
    
    // 开始自动播放
    startAutoplay();
}

// 图片懒加载优化
function initializeImageLazyLoading() {
    const lazyImages = document.querySelectorAll('.carousel-img');
    
    // 检查浏览器是否支持IntersectionObserver
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    const src = img.getAttribute('src');
                    
                    // 预加载图片
                    const tempImg = new Image();
                    tempImg.onload = function() {
                        img.style.opacity = '0';
                        setTimeout(() => {
                            img.style.transition = 'opacity 0.5s ease-in-out';
                            img.style.opacity = '1';
                        }, 100);
                    };
                    tempImg.src = src;
                    
                    observer.unobserve(img);
                }
            });
        });
        
        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    }
}

// 页面加载完成后初始化
window.addEventListener('DOMContentLoaded', () => {
    initializeHeadlineCarousel();
    initializeImageLazyLoading();
});
