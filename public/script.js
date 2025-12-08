// 产品下拉菜单功能
document.addEventListener('DOMContentLoaded', function() {
    // 标签筛选功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    let originalOrders = {}; // 保存每页的原始顺序
    let currentFilter = 'popular'; // 当前筛选方式

    // 初始化：保存每页的原始顺序
    function initializeOriginalOrders() {
        const pages = document.querySelectorAll('.tags-page');
        pages.forEach((page, index) => {
            const pageId = page.id;
            const tagItems = page.querySelectorAll('.tag-item');
            originalOrders[pageId] = Array.from(tagItems);
        });
    }

    // 为每个筛选按钮添加点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // 给当前按钮添加active类
            this.classList.add('active');
            
            // 获取筛选类型
            const filterType = this.getAttribute('data-filter');
            currentFilter = filterType;
            
            // 根据筛选类型处理标签项
            filterTags(filterType);
        });
    });

    // 筛选标签的函数
    function filterTags(filterType) {
        const currentPage = document.querySelector('.tags-page.active');
        if (!currentPage) return;
        
        const pageId = currentPage.id;
        const currentTagItems = currentPage.querySelectorAll('.tag-item');
        const tagItemsArray = Array.from(currentTagItems);
        
        switch(filterType) {
            case 'popular':
                // 热门：恢复原始顺序
                restoreOriginalOrder(currentPage, pageId);
                break;
                
            case 'alphabetical':
                // 首字母：按字母顺序排序
                sortByAlphabet(tagItemsArray, currentPage);
                break;
                
            case 'latest':
                // 最新：倒置当前顺序
                reverseOrder(tagItemsArray, currentPage);
                break;
        }
    }

    // 恢复原始顺序
    function restoreOriginalOrder(pageContainer, pageId) {
        if (originalOrders[pageId]) {
            // 清空容器
            pageContainer.innerHTML = '';
            // 按原始顺序重新添加元素
            originalOrders[pageId].forEach(item => {
                pageContainer.appendChild(item);
            });
        }
    }

    // 按字母顺序排序
    function sortByAlphabet(tagItemsArray, pageContainer) {
        tagItemsArray.sort((a, b) => {
            const nameA = a.querySelector('.tag-name span').textContent.toLowerCase();
            const nameB = b.querySelector('.tag-name span').textContent.toLowerCase();
            return nameA.localeCompare(nameB);
        });
        
        // 重新排列DOM元素
        tagItemsArray.forEach(item => {
            pageContainer.appendChild(item);
        });
    }

    // 倒置顺序
    function reverseOrder(tagItemsArray, pageContainer) {
        tagItemsArray.reverse();
        
        // 重新排列DOM元素
        tagItemsArray.forEach(item => {
            pageContainer.appendChild(item);
        });
    }

    // 初始化标签筛选功能
    initializeOriginalOrders();
    
    // 获取登录模态框元素（提前定义以便在关注功能中使用）
    const loginModal = document.getElementById('login-modal');
    
    // 关注标签功能
    const followButtons = document.querySelectorAll('.follow-btn');
    
    followButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            const tagItem = this.closest('.tag-item');
            if (!tagItem) return;
            
            // 检查当前是否已关注
            const isFollowed = this.classList.contains('followed');
            
            if (!isFollowed) {
                // 未关注状态，点击后关注
                this.classList.add('followed');
                this.textContent = '已关注';
                tagItem.style.backgroundColor = '#FDFBF1';
                
                // 弹出登录模态框
                if (loginModal) {
                    loginModal.classList.add('show');
                    document.body.style.overflow = 'hidden';
                }
            } else {
                // 已关注状态，点击后取消关注
                this.classList.remove('followed');
                this.textContent = '关注标签';
                tagItem.style.backgroundColor = '';
            }
        });
    });
    
    // 获取所有下拉菜单触发器
    const productDropdownToggle = document.getElementById('product-dropdown-toggle');
    const productDropdown = document.getElementById('product-dropdown');
    
    if (productDropdownToggle && productDropdown) {
        productDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 切换产品下拉菜单显示状态
            const isProductVisible = productDropdown.classList.contains('show');
            
            // 关闭所有下拉菜单
            closeAllDropdowns();
            
            // 如果产品菜单之前是隐藏的，则显示它
            if (!isProductVisible) {
                productDropdown.classList.add('show');
            }
        });
    }

    // 社群下拉菜单功能
    const communityDropdownToggle = document.getElementById('community-dropdown-toggle');
    const communityDropdown = document.getElementById('community-dropdown');
    
    if (communityDropdownToggle && communityDropdown) {
        communityDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            // 切换社群下拉菜单显示状态
            const isCommunityVisible = communityDropdown.classList.contains('show');
            
            // 关闭所有下拉菜单
            closeAllDropdowns();
            
            // 如果社群菜单之前是隐藏的，则显示它
            if (!isCommunityVisible) {
                communityDropdown.classList.add('show');
            }
        });
    }

    // 搜索下拉菜单功能
    const searchInput = document.getElementById('search-input');
    const searchDropdown = document.getElementById('search-dropdown');
    const searchOptions = document.querySelectorAll('.search-option');
    
    if (searchInput && searchDropdown) {
        // 点击搜索框显示下拉菜单
        searchInput.addEventListener('focus', function() {
            closeAllDropdowns();
            searchDropdown.classList.add('show');
        });

        // 点击搜索选项
        searchOptions.forEach(option => {
            option.addEventListener('click', function() {
                // 移除所有选项的选中状态
                searchOptions.forEach(opt => opt.classList.remove('selected'));
                
                // 添加当前选项的选中状态
                this.classList.add('selected');
                
                // 获取搜索类型和URL
                const searchType = this.getAttribute('data-search-type');
                const baseUrl = this.getAttribute('data-url');
                const searchQuery = searchInput.value.trim();
                
                // 执行搜索跳转
                if (searchQuery) {
                    let searchUrl;
                    if (searchType === 'internal') {
                        // 站内搜索（这里可以替换为实际的站内搜索URL）
                        searchUrl = `/search?q=${encodeURIComponent(searchQuery)}`;
                    } else {
                        // 外部搜索引擎
                        searchUrl = baseUrl + encodeURIComponent(searchQuery);
                    }
                    
                    // 在新窗口打开搜索结果
                    window.open(searchUrl, '_blank');
                } else {
                    // 如果没有输入搜索内容，直接跳转到对应搜索引擎
                    if (searchType !== 'internal') {
                        window.open(baseUrl, '_blank');
                    }
                }
                
                // 关闭搜索下拉菜单
                searchDropdown.classList.remove('show');
            });
        });
    }

    // 注册登录模态框功能
    const loginBtn = document.querySelector('.btn-login');
    const modalClose = document.getElementById('modal-close');
    const getCodeBtn = document.getElementById('get-code-btn');
    const loginSubmitBtn = document.getElementById('login-btn');
    const phoneInput = document.getElementById('phone');
    const verificationInput = document.getElementById('verification-code');

    // 打开模态框
    if (loginBtn && loginModal) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            loginModal.classList.add('show');
            document.body.style.overflow = 'hidden'; // 防止背景滚动
        });
    }

    // 关闭模态框
    function closeModal() {
        if (loginModal) {
            loginModal.classList.remove('show');
            document.body.style.overflow = 'auto'; // 恢复背景滚动
        }
    }

    // 点击关闭按钮关闭模态框
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // 点击模态框外部关闭模态框
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                closeModal();
            }
        });
    }

    // ESC键关闭模态框
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal && loginModal.classList.contains('show')) {
            closeModal();
        }
    });

    // 获取验证码功能
    if (getCodeBtn && phoneInput) {
        getCodeBtn.addEventListener('click', function() {
            const phoneNumber = phoneInput.value.trim();
            
            // 验证手机号格式
            if (!phoneNumber) {
                showMessage('请输入手机号');
                return;
            }
            
            if (!/^1[3-9]\d{9}$/.test(phoneNumber)) {
                showMessage('请输入正确的手机号格式');
                return;
            }
            
            // 开始倒计时
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
            
            // 模拟发送验证码
            showMessage('验证码已发送到您的手机');
        });
    }

    // 登录按钮功能
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
            
            // 模拟登录成功
            showMessage('登录成功！');
            setTimeout(() => {
                closeModal();
                // 清空表单
                if (phoneInput) phoneInput.value = '';
                if (verificationInput) verificationInput.value = '';
            }, 1500);
        });
    }

    // 登录方式切换功能
    const loginModes = document.querySelectorAll('.login-mode');
    
    loginModes.forEach(mode => {
        mode.addEventListener('click', function() {
            // 移除所有按钮的active类
            loginModes.forEach(m => m.classList.remove('active'));
            
            // 给当前按钮添加active类
            this.classList.add('active');
            
            // 根据不同的登录方式显示不同的内容
            const loginMode = this.getAttribute('data-mode');
            updateLoginMode(loginMode);
        });
    });

    // 更新登录方式显示
function updateLoginMode(mode) {
    const defaultForm = document.getElementById('login-form-default');
    const weixinForm = document.getElementById('login-form-weixin');
    
    if (mode === 'weixin') {
        // 微信登录 - 显示微信登录表单，隐藏默认表单
        defaultForm.style.display = 'none';
        weixinForm.style.display = 'block';
        showMessage('请使用微信扫描二维码登录');
    } else {
        // 其他登录方式 - 显示默认表单，隐藏微信登录表单
        defaultForm.style.display = 'block';
        weixinForm.style.display = 'none';
        
        const phoneGroup = document.querySelector('.form-group:has(#phone)');
        const verificationGroup = document.querySelector('.form-group:has(#verification-code)');
        
        if (mode === 'no-password') {
            // 免密码登录 - 显示手机号和验证码（验证码登录页面）
            if (phoneGroup) phoneGroup.style.display = 'block';
            if (verificationGroup) verificationGroup.style.display = 'block';
            // 确保验证码输入框是正确的状态
            const verificationLabel = verificationGroup.querySelector('label');
            const verificationInput = verificationGroup.querySelector('.verification-input');
            const getCodeBtn = verificationGroup.querySelector('.get-code-btn');
            if (verificationLabel) verificationLabel.textContent = '验证码：';
            if (verificationInput) {
                verificationInput.type = 'text';
                verificationInput.placeholder = '请输入验证码';
            }
            if (getCodeBtn) getCodeBtn.style.display = 'inline-block';
            showMessage('请输入手机号和验证码进行免密码登录');
        } else if (mode === 'password') {
            // 密码登录 - 显示手机号和密码输入框
            if (phoneGroup) phoneGroup.style.display = 'block';
            if (verificationGroup) {
                verificationGroup.style.display = 'block';
                // 将验证码输入框改为密码输入框
                const verificationLabel = verificationGroup.querySelector('label');
                const verificationInput = verificationGroup.querySelector('.verification-input');
                const getCodeBtn = verificationGroup.querySelector('.get-code-btn');
                
                if (verificationLabel) verificationLabel.textContent = '密码：';
                if (verificationInput) {
                    verificationInput.type = 'password';
                    verificationInput.placeholder = '请输入密码';
                }
                if (getCodeBtn) getCodeBtn.style.display = 'none';
            }
            showMessage('请输入手机号和密码');
        }
    }
}

    // 页面加载完成后，初始化为免密码登录
    // 设置默认为免密码登录
    updateLoginMode('no-password');

    // 显示消息提示
    function showMessage(message) {
        // 创建消息元素
        const messageDiv = document.createElement('div');
        messageDiv.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background-color: rgba(0, 0, 0, 0.8);
            color: white;
            padding: 12px 24px;
            border-radius: 6px;
            font-size: 14px;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        messageDiv.textContent = message;
        
        document.body.appendChild(messageDiv);
        
        // 显示消息
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 10);
        
        // 3秒后移除消息
        setTimeout(() => {
            messageDiv.style.opacity = '0';
            setTimeout(() => {
                if (messageDiv.parentNode) {
                    messageDiv.parentNode.removeChild(messageDiv);
                }
            }, 300);
        }, 3000);
    }

    // 点击页面其他地方关闭所有下拉菜单
    document.addEventListener('click', function(e) {
        // 如果点击的不是搜索框或搜索下拉菜单，则关闭搜索下拉菜单
        if (!e.target.closest('.search-box')) {
            if (searchDropdown) {
                searchDropdown.classList.remove('show');
            }
        }
        
        // 关闭其他下拉菜单
        closeAllDropdowns();
    });

    // 阻止下拉菜单内部点击事件冒泡
    const dropdowns = document.querySelectorAll('.dropdown-menu');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.stopPropagation();
        });
    });

    // 关闭所有下拉菜单的函数
    function closeAllDropdowns() {
        const allDropdowns = document.querySelectorAll('.dropdown-menu');
        allDropdowns.forEach(dropdown => {
            dropdown.classList.remove('show');
        });
    }

    // 热门标签展开/收起功能
window.toggleHotTags = function() {
    const hotTagsContent = document.getElementById('hot-tags-content');
    const tagsArrow = document.getElementById('tags-arrow');
    
    if (hotTagsContent) {
        if (hotTagsContent.style.display === 'none' || hotTagsContent.style.display === '') {
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
    }
};

    // 翻页功能
    const paginationItems = document.querySelectorAll('.pagination-item');
    const pages = document.querySelectorAll('.tags-page');

    if (paginationItems.length > 0 && pages.length > 0) {
        // 初始化第一页为激活状态
        showPage(1);
        
        // 为每个翻页项添加点击事件
        paginationItems.forEach((item, index) => {
            item.addEventListener('click', function() {
                const linkText = this.querySelector('.pagination-link').textContent.trim();
                
                // 处理"下一页"特殊情况
                if (linkText === '下一页') {
                    const activeItem = document.querySelector('.pagination-item.active');
                    const activeIndex = Array.from(paginationItems).indexOf(activeItem);
                    if (activeIndex < paginationItems.length - 2) { // -2 因为排除"下一页"和当前项
                        showPage(activeIndex + 2);
                    }
                } else {
                    // 处理数字页码
                    const pageNum = parseInt(linkText);
                    if (pageNum && !this.classList.contains('disabled')) {
                        showPage(pageNum);
                    }
                }
            });
        });
    }

    // 显示指定页面的函数
    function showPage(pageNum) {
        // 隐藏所有页面
        pages.forEach(page => {
            page.classList.remove('active');
        });
        
        // 移除所有翻页项的激活状态
        paginationItems.forEach(item => {
            item.classList.remove('active');
            item.classList.remove('disabled');
        });
        
        // 显示指定页面
        const targetPage = document.getElementById(`page-${pageNum}`);
        if (targetPage) {
            targetPage.classList.add('active');
            
            // 如果是第一次访问该页面，初始化原始顺序
            if (!originalOrders[targetPage.id]) {
                const tagItems = targetPage.querySelectorAll('.tag-item');
                originalOrders[targetPage.id] = Array.from(tagItems);
            }
            
            // 应用当前筛选方式到新页面
            filterTags(currentFilter);
        }
        
        // 激活对应的翻页项
        const activeItem = Array.from(paginationItems).find(item => {
            const linkText = item.querySelector('.pagination-link').textContent.trim();
            return linkText === pageNum.toString();
        });
        
        if (activeItem) {
            activeItem.classList.add('active');
        }
        
        // 更新"下一页"状态
        const nextPageItem = Array.from(paginationItems).find(item => {
            const linkText = item.querySelector('.pagination-link').textContent.trim();
            return linkText === '下一页';
        });
        
        if (nextPageItem) {
            const totalPages = pages.length;
            if (pageNum >= totalPages) {
                nextPageItem.classList.add('disabled');
            } else {
                nextPageItem.classList.remove('disabled');
            }
        }
        
        // 滚动到标签列表顶部
        const tagsList = document.querySelector('.tags-list');
        if (tagsList) {
            tagsList.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // 键盘导航支持
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') {
            // 左箭头键 - 上一页
            const activeItem = document.querySelector('.pagination-item.active');
            if (activeItem) {
                const linkText = activeItem.querySelector('.pagination-link').textContent.trim();
                const currentPage = parseInt(linkText);
                if (currentPage > 1) {
                    showPage(currentPage - 1);
                }
            }
        } else if (e.key === 'ArrowRight') {
            // 右箭头键 - 下一页
            const activeItem = document.querySelector('.pagination-item.active');
            if (activeItem) {
                const linkText = activeItem.querySelector('.pagination-link').textContent.trim();
                const currentPage = parseInt(linkText);
                const totalPages = pages.length;
                if (currentPage < totalPages) {
                    showPage(currentPage + 1);
                }
            }
        }
    });
});