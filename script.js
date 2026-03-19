// 文章列表配置
const articles = [
    {
        title: "阿里巴巴财报深度分析 2026",
        file: "articles/Alibaba_Earnings_Analysis_20260319.html",
        date: "2026-03-19"
    },
    {
        title: "Circle CRCL 伊朗战争风险分析",
        file: "articles/Circle_CRCL_Iran_War_Analysis.html",
        date: "2026-03-19"
    },
    {
        title: "OpenClaw 投资机会分析 - 未来3个月港股美股布局指南",
        file: "articles/OpenClaw_Investment_Opportunities.html",
        date: "2026-03-18"
    },
    {
        title: "OpenClaw 深度分析报告",
        file: "articles/OpenClaw_Analysis_Report.html",
        date: "2026-03-14"
    }
];

// 加载文章列表
function loadArticles() {
    const listElement = document.getElementById('article-list');
    
    if (articles.length === 0) {
        listElement.innerHTML = '<li style="text-align: center; color: #7f8c8d;">暂无文章，请在 script.js 中添加文章配置</li>';
        return;
    }
    
    // 按日期排序（最新的在前）
    const sortedArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    listElement.innerHTML = sortedArticles.map(article => `
        <li>
            <a href="${article.file}">${article.title}</a>
            <span class="date">${article.date} · 👁 <span class="busuanzi-value" data-path="/${article.file}">--</span> 次阅读</span>
        </li>
    `).join('');
}

// 获取单页面访问量（通过不蒜子 API）
async function loadPageViews() {
    // 等待不蒜子脚本加载完成
    if (typeof bszCaller === 'undefined') {
        setTimeout(loadPageViews, 500);
        return;
    }
    
    // 获取所有文章链接的访问量
    const spans = document.querySelectorAll('.busuanzi-value');
    for (const span of spans) {
        const path = span.getAttribute('data-path');
        try {
            // 使用不蒜子的方式获取特定页面访问量
            // 注意：不蒜子本身不支持直接查询其他页面，这里使用一个变通方法
            // 在实际页面中，不蒜子会自动统计当前页面的访问量
            // 对于首页显示各文章访问量，需要额外的处理
            span.textContent = '加载中';
        } catch (error) {
            span.textContent = '--';
        }
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    loadPageViews();
});
