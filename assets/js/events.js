// 活动数据 - JSON格式
const eventData = {
    // 进行中的活动
    doingEvents: [
        {
            id: 1,
            image: '../assets/images/event/doing_1_1.jpg',
            title: '全网最硬核的RAG教程 香港中文大学教授推荐',
            date: '2025-09-25 周三 00:00',
            location: '线上活动',
            status: '报名中',
            type: 'online'  // 线上活动
        },
        {
            id: 2,
            image: '../assets/images/event/doing_1_2.jpg',
            title: '鸿蒙领航者招募 加入领航者阵营，共享共建鸿蒙新世界',
            date: '2025-10-28 周日 14:00',
            location: '线上活动',
            status: '报名中',
            type: 'online'  // 线上活动
        },
        {
            id: 3,
            image: '../assets/images/event/doing_1_3.jpg',
            title: '基于RDS Supabase 服务高效构建轻量级应用，完成任务可获好礼',
            date: '2025-11-07 周五 00:00',
            location: '线上活动',
            status: '报名中',
            type: 'online'  // 线上活动
        },
        {
            id: 4,
            image: '../assets/images/event/doing_1_4.jpg',
            title: '【鸿蒙词海】技术关键词共建计划',
            date: '2025-11-10 周一 18:00',
            location: '站内活动',
            status: '报名中',
            type: 'online'  // 站内活动归类为线上
        },
        {
            id: 5,
            image: '../assets/images/event/doing_2_1.jpg',
            title: '【鸿蒙精选】开发者福利轻投票',
            date: '2025-11-10 周日 18:00',
            location: '站内活动',
            status: '报名中',
            type: 'online'  // 站内活动归类为线上
        },
        {
            id: 6,
            image: '../assets/images/event/doing_2_2.jpg',
            title: '【瓜分20万奖励】豆包·应用生成「一点都不技术」创作挑战',
            date: '2025-11-11 周二 01:00',
            location: '线上活动',
            status: '报名中',
            type: 'online'  // 线上活动
        },
        {
            id: 7,
            image: '../assets/images/event/doing_2_3.jpg',
            title: '2025深信服AI创新技术大赛 码上AI·CoStrict校园挑战赛',
            date: '2025-11-13 周四 09:00',
            location: '黑马马拉松',
            status: '报名中',
            type: 'offline'  // 线下活动
        },
        {
            id: 8,
            image: '../assets/images/event/doing_2_4.jpg',
            title: 'WeaveFox | AI艺术家 | 创意大赛等你来赛！千元豪礼',
            date: '2025-11-14 周五 00:00',
            location: '线上活动',
            status: '报名中',
            type: 'online'  // 线上活动
        },
        {
            id: 9,
            image: '../assets/images/event/doing_3_1.jpg',
            title: 'AI大模型应用开发实践 workshop',
            date: '2025-11-15 周六 10:00',
            location: '线下活动',
            status: '报名中',
            type: 'offline'  // 线下活动
        },
        {
            id: 10,
            image: '../assets/images/event/doing_3_2.jpg',
            title: '领航者说·鸿蒙问答挑战赛（第三期）',
            date: '2025-11-21 周五 14:00',
            location: '线下活动',
            status: '报名中',
            type: 'offline'  // 线下活动
        },
        {
            id: 11,
            image: '../assets/images/event/doing_3_3.jpg',
            title: '2025智能硬件创新大赛 决赛现场',
            date: '2025-11-16 周日 09:00',
            location: '线下活动',
            status: '报名中',
            type: 'offline'  // 线下活动
        },
        {
            id: 12,
            image: '../assets/images/event/doing_3_4.jpg',
            title: '云原生应用架构设计实战课程',
            date: '2025-11-17 周一 14:00',
            location: '线上活动',
            status: '报名中',
            type: 'online'  // 线上活动
        },
        {
            id: 13,
            image: '../assets/images/event/doing_4_1.jpg',
            title: '前端性能优化专题分享会',
            date: '2025-11-18 周二 19:00',
            location: '线上活动',
            status: '报名中',
            type: 'online'  // 线上活动
        },
        {
            id: 14,
            image: '../assets/images/event/doing_4_2.jpg',
            title: '开源项目贡献指南 workshop',
            date: '2025-11-19 周三 15:00',
            location: '线上活动',
            status: '报名中',
            type: 'online'  // 线上活动
        },
        {
            id: 15,
            image: '../assets/images/event/doing_4_3.jpg',
            title: '数据可视化设计与实现实战',
            date: '2025-11-20 周四 10:00',
            location: '线上活动',
            status: '报名中',
            type: 'online'  // 线上活动
        }
    ],
    
    // 过往活动
    pastEvents: [
        {
            id: 1,
            image: '../assets/images/event/past_1_1.jpg',
            title: '证券/医疗核心系统/卫健委/大药房/税务数据平台的TiDB大规模实践',
            date: '2025-11-05 周三 14:00',
            location: '线下活动 - 济南',
            type: 'offline'  // 线下活动
        },
        {
            id: 2,
            image: '../assets/images/event/past_1_2.jpg',
            title: 'Code New Era — AI驱动的研发效率与价值重塑',
            date: '2025-11-05 周三 16:30',
            location: '线下活动 - 杭州',
            type: 'offline'  // 线下活动
        },
        {
            id: 3,
            image: '../assets/images/event/past_1_3.jpg',
            title: '鸿蒙有约·问答实战：开发者高频问题解析',
            date: '2025-11-04 周二 20:00',
            location: '线上活动',
            type: 'online'  // 线上活动
        },
        {
            id: 4,
            image: '../assets/images/event/past_1_4.jpg',
            title: '腾讯云架构师技术沙龙「无数据不AI」',
            date: '2025-11-04 周二 14:00',
            location: '线下活动 - 成都',
            type: 'offline'  // 线下活动
        },
        {
            id: 5,
            image: '../assets/images/event/past_2_1.jpg',
            title: '创始人亲授！100%好评的禅道产品研发流程实战训练营',
            date: '2025-11-08 周六 14:00',
            location: '线下活动 - 深圳',
            type: 'offline'  // 线下活动
        },
        {
            id: 6,
            image: '../assets/images/event/past_2_2.jpg',
            title: '报名启动 | 隐语开源社区Meetup北京站×可信数据空间×隐私计算技术大会',
            date: '2025-11-08 周六 13:30',
            location: '线下活动 - 北京',
            type: 'offline'  // 线下活动
        },
        {
            id: 7,
            image: '../assets/images/event/past_2_3.jpg',
            title: 'AI技术发展论坛',
            date: '2025-11-05 周三 13:00',
            location: '线下活动 - 上海',
            type: 'offline'  // 线下活动
        },
        {
            id: 8,
            image: '../assets/images/event/past_2_4.jpg',
            title: 'The Fastest Analytics & Search Database in the AI Era',
            date: '2025-11-05 周三 09:30',
            location: '线上活动',
            type: 'online'  // 线上活动
        },
        {
            id: 9,
            image: '../assets/images/event/past_3_1.jpg',
            title: '云原生技术沙龙：微服务架构实践分享',
            date: '2025-11-03 周一 14:00',
            location: '线下活动 - 广州',
            type: 'offline'  // 线下活动
        },
        {
            id: 10,
            image: '../assets/images/event/past_3_2.jpg',
            title: '前端性能优化实战工作坊',
            date: '2025-11-03 周一 16:30',
            location: '线下活动 - 北京',
            type: 'offline'  // 线下活动
        },
        {
            id: 11,
            image: '../assets/images/event/past_3_3.jpg',
            title: '数据科学与机器学习应用案例分享',
            date: '2025-11-02 周日 10:00',
            location: '线上活动',
            type: 'online'  // 线上活动
        },
        {
            id: 12,
            image: '../assets/images/event/past_3_4.jpg',
            title: 'DevOps最佳实践与工具链搭建',
            date: '2025-11-02 周日 14:00',
            location: '线下活动 - 上海',
            type: 'offline'  // 线下活动
        },
        {
            id: 13,
            image: '../assets/images/event/past_4_1.jpg',
            title: '移动应用安全与隐私保护技术论坛',
            date: '2025-11-01 周六 13:30',
            location: '线下活动 - 深圳',
            type: 'offline'  // 线下活动
        },
        {
            id: 14,
            image: '../assets/images/event/past_4_2.jpg',
            title: '区块链技术在金融领域的应用实践',
            date: '2025-11-01 周六 10:00',
            location: '线下活动 - 杭州',
            type: 'offline'  // 线下活动
        },
        {
            id: 15,
            image: '../assets/images/event/past_4_3.jpg',
            title: '开源项目贡献指南与实践',
            date: '2025-10-31 周五 19:00',
            location: '线上活动',
            type: 'online'  // 线上活动
        },
        {
            id: 16,
            image: '../assets/images/event/past_4_4.jpg',
            title: '大前端技术趋势与未来展望',
            date: '2025-10-31 周五 14:00',
            location: '线下活动 - 成都',
            type: 'offline'  // 线下活动
        }
    ]
};

// 动态生成活动卡片函数 - 添加活动类型筛选功能
function renderEventCards(selectedType = 'all') {
    // 渲染进行中的活动卡片
    const doingEventsContainer = document.getElementById('doing-events-container');
    if (doingEventsContainer) {
        doingEventsContainer.innerHTML = '';
        // 根据选择的类型筛选活动
        const filteredDoingEvents = selectedType === 'all' 
            ? eventData.doingEvents 
            : eventData.doingEvents.filter(event => event.type === selectedType);
        
        filteredDoingEvents.forEach(event => {
            const cardHTML = `
                <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                    <div class="card h-100 shadow-sm card-hover-effect">
                        <div class="card-img-container">
                            <img src="${event.image}" class="card-img-top" alt="${event.title}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text text-muted">${event.date}</p>
                            <p class="card-text text-muted">${event.location}</p>
                        </div>
                        <div class="card-footer">
                            <span class="badge bg-primary">${event.status}</span>
                        </div>
                    </div>
                </div>
            `;
            doingEventsContainer.innerHTML += cardHTML;
        });
    }
    
    // 渲染过往活动卡片
    const pastEventsContainer = document.getElementById('past-events-container');
    if (pastEventsContainer) {
        pastEventsContainer.innerHTML = '';
        // 根据选择的类型筛选活动
        const filteredPastEvents = selectedType === 'all' 
            ? eventData.pastEvents 
            : eventData.pastEvents.filter(event => event.type === selectedType);
        
        filteredPastEvents.forEach(event => {
            const cardHTML = `
                <div class="col-lg-3 col-md-6 col-sm-12 mb-4">
                    <div class="card h-100 shadow-sm card-hover-effect">
                        <div class="card-img-container">
                            <img src="${event.image}" class="card-img-top" alt="${event.title}">
                        </div>
                        <div class="card-body">
                            <h5 class="card-title">${event.title}</h5>
                            <p class="card-text text-muted">${event.date}</p>
                            <p class="card-text text-muted">${event.location}</p>
                        </div>
                    </div>
                </div>
            `;
            pastEventsContainer.innerHTML += cardHTML;
        });
    }
}

// 初始化活动类型筛选功能
function initEventTypeFilter() {
    // 查找活动类型选择器
    const eventTypeSelect = document.getElementById('event-type-select');
    
    if (eventTypeSelect) {
        // 添加选择事件监听器
        eventTypeSelect.addEventListener('change', function() {
            let selectedType = 'all';
            
            // 根据选择的值确定筛选类型
            if (this.value === '线上活动') {
                selectedType = 'online';
            } else if (this.value === '线下活动') {
                selectedType = 'offline';
            }
            
            // 根据选择的类型重新渲染活动卡片
            renderEventCards(selectedType);
        });
    }
    
    // 备用选择器检查 - 查找页面中可能存在的其他活动类型选择器
    const alternateSelectors = document.querySelectorAll('select');
    alternateSelectors.forEach(selector => {
        // 检查是否是活动类型选择器（通过选项内容判断）
        const options = Array.from(selector.options).map(option => option.textContent);
        if (options.includes('线上活动') && options.includes('线下活动')) {
            // 避免重复添加监听器
            if (!selector.hasAttribute('data-filter-initiated')) {
                selector.setAttribute('data-filter-initiated', 'true');
                selector.addEventListener('change', function() {
                    let selectedType = 'all';
                    
                    // 根据选择的值确定筛选类型
                    if (this.value === '线上活动') {
                        selectedType = 'online';
                    } else if (this.value === '线下活动') {
                        selectedType = 'offline';
                    }
                    
                    // 根据选择的类型重新渲染活动卡片
                    renderEventCards(selectedType);
                });
            }
        }
    });
}

// 当页面加载完成后执行卡片渲染和筛选初始化
function initEventCards() {
    // 先尝试直接渲染和初始化筛选器
    renderEventCards();
    initEventTypeFilter();
    
    // 如果容器不存在（可能在template中），设置定时器定期检查
    const checkInterval = setInterval(() => {
        const doingContainer = document.getElementById('doing-events-container');
        const pastContainer = document.getElementById('past-events-container');
        
        if (doingContainer && pastContainer) {
            renderEventCards();
            initEventTypeFilter();
            clearInterval(checkInterval); // 找到容器后清除定时器
        }
    }, 100); // 每100毫秒检查一次
    
    // 设置3秒超时，避免无限循环
    setTimeout(() => {
        clearInterval(checkInterval);
    }, 3000);
}

// 当页面加载完成后初始化
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEventCards);
} else {
    initEventCards();
}

// 添加自定义事件监听，当header-loader完成加载后重新渲染
window.addEventListener('header-loaded', renderEventCards);
window.addEventListener('content-loaded', renderEventCards);
