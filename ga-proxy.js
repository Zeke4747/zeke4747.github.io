// 这是 Google Apps Script 代码，需要部署到 Google Apps Script
// 步骤：
// 1. 访问 https://script.google.com/
// 2. 创建新项目
// 3. 粘贴以下代码
// 4. 部署为 Web App（权限：任何人）
// 5. 复制部署 URL，填入下面的 script.js 中

function doGet(e) {
  // 设置 CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET',
    'Content-Type': 'application/json'
  };
  
  try {
    // 你的 GA4 Property ID
    const propertyId = '529178550'; // GA4 Property ID
    
    // 获取今天的日期
    const today = new Date();
    const startDate = '2026-03-01'; // 开始统计日期
    const endDate = Utilities.formatDate(today, 'GMT', 'yyyy-MM-dd');
    
    // 调用 GA4 Data API
    const response = AnalyticsData.Properties.runReport({
      property: 'properties/' + propertyId,
      dateRanges: [{
        startDate: startDate,
        endDate: endDate
      }],
      metrics: [
        { name: 'screenPageViews' },
        { name: 'totalUsers' }
      ],
      dimensions: [
        { name: 'pagePath' }
      ],
      orderBys: [
        { metric: { metricName: 'screenPageViews' }, desc: true }
      ]
    }, 'properties/' + propertyId);
    
    // 处理数据
    const data = {
      totalViews: 0,
      totalUsers: 0,
      articles: []
    };
    
    if (response.rows) {
      response.rows.forEach(row => {
        const pagePath = row.dimensionValues[0].value;
        const views = parseInt(row.metricValues[0].value);
        const users = parseInt(row.metricValues[1].value);
        
        data.totalViews += views;
        data.totalUsers += users;
        
        // 只统计文章页面
        if (pagePath.includes('/articles/')) {
          data.articles.push({
            path: pagePath,
            views: views,
            users: users
          });
        }
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify(data))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
      
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      error: error.message
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
  }
}
