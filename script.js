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

// Google Apps Script 部署 URL（需要替换为你自己的）
const GA_API_URL = 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec';

// 文章浏览量缓存
let articleViews = {};

// 加载文章列表
function loadArticles() {
    const listElement = document.getElementById('article-list');
    
    if (articles.length === 0) {
        listElement.innerHTML = '<li style="text-align: center; color: #7f8c8d;">暂无文章，请在 script.js 中添加文章配置</li>';
        return;
    }
    
    // 按日期排序（最新的在前）
    const sortedArticles = articles.sort((a, b) => new Date(b.date) - new Date(a.date));
    
    listElement.innerHTML = sortedArticles.map(article => {
        const views = articleViews[article.file] || 0;
        const viewsHtml = views > 0 ? `<span class="article-views">👁 ${views}</span>` : '';
        return `
        <li data-file="${article.file}">
            <a href="${article.file}">${article.title}</a>${viewsHtml}
            <span class="date">${article.date}</span>
        </li>
    `}).join('');
}

// 从 Google Analytics 获取访问数据
async function loadAnalyticsData() {
    // 如果还没有配置 API，显示提示
    if (GA_API_URL.includes('YOUR_DEPLOYMENT_ID')) {
        document.getElementById('stats-loading').textContent = '💡 访问统计配置中...';
        document.getElementById('total-views').textContent = '👁 总访问量: 配置中';
        document.getElementById('total-users').textContent = '👤 访客数: 配置中';
        return;
    }
    
    try {
        const response = await fetch(GA_API_URL);
        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }
        
        // 更新总访问量
        document.getElementById('total-views').textContent = `👁 总访问量: ${data.totalViews.toLocaleString()}`;
        document.getElementById('total-users').textContent = `👤 访客数: ${data.totalUsers.toLocaleString()}`;
        document.getElementById('stats-loading').style.display = 'none';
        
        // 更新文章浏览量
        if (data.articles) {
            data.articles.forEach(article => {
                const fileName = article.path.split('/').pop();
                const filePath = 'articles/' + fileName;
                articleViews[filePath] = article.views;
            });
            
            // 重新渲染文章列表
            loadArticles();
        }
        
    } catch (error) {
        console.error('加载访问数据失败:', error);
        document.getElementById('stats-loading').textContent = '⚠️ 访问数据加载失败';
        document.getElementById('total-views').textContent = '👁 总访问量: --';
        document.getElementById('total-users').textContent = '👤 访客数: --';
    }
}

// 页面加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
    loadArticles();
    loadAnalyticsData();
});
