/**
 * 智汇云库网创平台 - 主脚本文件
 * 功能：内容展示和交互逻辑
 */

// 内容数据
const mockContents = Object.freeze([
  {
    id: 1,
    title: "电商运营实战",
    category: "电商运营",
    price: 29.9,
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E7%94%B5%E5%95%86%E8%BF%90%E8%90%A5%E5%AE%9E%E6%88%98&sign=3725e3e174c27832b655282c768a40d0",
    isFree: false
  },
  {
    id: 2,
    title: "AI工具大全",
    category: "AI工具",
    price: 39.9,
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=AI%E5%B7%A5%E5%85%B7%E5%A4%A7%E5%85%A8&sign=faa6fc15f6d408cdee2c8dbf7cf4983d",
    isFree: false
  },
  {
    id: 3,
    title: "免费入门指南",
    category: "指南",
    imageUrl: "https://space.coze.cn/api/coze_space/gen_image?image_size=landscape_4_3&prompt=%E6%96%B0%E6%89%8B%E5%85%A5%E9%97%A8%E6%8C%87%E5%8D%97&sign=b11fe7aee644e05c6c89e0fbfb225c9b",
    isFree: true
  }
]);

// DOM加载完成后执行
document.addEventListener('DOMContentLoaded', () => {
  try {
    loadContents();
    initEventListeners();
  } catch (error) {
    console.error('初始化错误:', error);
    alert('系统初始化失败，请刷新页面重试');
  }
});

/**
 * 加载内容到页面
 */
function loadContents() {
  const container = document.getElementById('contentContainer');
  if (!container) return;

  // 清空容器
  container.innerHTML = '';
  
  // 创建内容卡片
  mockContents.forEach(content => {
    const card = document.createElement('div');
    card.className = 'content-card';
    
    card.innerHTML = `
      <img src="${content.imageUrl}" alt="${content.title}" loading="lazy">
      <div class="content-info">
        <h3>${content.title}</h3>
        <p>分类: ${content.category}</p>
        ${content.isFree ? 
          '<span class="free-badge">免费</span>' : 
          `<span class="price">${content.price}积分</span>`
        }
        <button class="btn-get" data-id="${content.id}" aria-label="获取内容">
          ${content.isFree ? '获取' : '打赏获取'}
        </button>
      </div>
    `;
    
    container.appendChild(card);
  });
}

/**
 * 初始化事件监听
 */
function initEventListeners() {
  // 获取按钮点击事件
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (target.classList.contains('btn-get')) {
      handleGetContent(target);
    }
  });
  
  // 登录/注册按钮事件
  document.querySelectorAll('.btn-login, .btn-register').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      alert('即将跳转到登录/注册页面');
    });
  });
}

/**
 * 处理获取内容逻辑
 */
function handleGetContent(button) {
  const contentId = button.getAttribute('data-id');
  const content = mockContents.find(c => c.id == contentId);
  
  if (!content) return;
  
  if (content.isFree) {
    alert(`成功获取免费内容: ${content.title}`);
  } else {
    alert(`感谢您的支持！打赏${content.price}积分获取"${content.title}"`);
  }
}