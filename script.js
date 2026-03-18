// 文章列表配置
const articles = [
    {
        title: "科技股/中概股分散配置建议",
        file: "articles/科技股中概股配置建议.html",
        date: "2026-03-14"
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
