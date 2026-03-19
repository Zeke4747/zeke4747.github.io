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
            <span class="date">${article.date}</span>
        </li>
    `).join('');
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', loadArticles);
