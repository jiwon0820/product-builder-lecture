
class MenuRecommendation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        const lang = document.documentElement.lang;
        const defaultTitle = lang === 'en' ? 'Shall I recommend a menu?' : '메뉴를 추천해드릴까요?';
        const defaultDesc = lang === 'en' ? 'Click the button!' : '버튼을 눌러보세요!';

        this.shadowRoot.innerHTML = `
            <style>
                .menu-container {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    min-height: 200px;
                    transition: all 0.5s ease;
                }
                .menu-card {
                    background: white;
                    border-radius: 20px;
                    padding: 30px;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.1);
                    text-align: center;
                    transform: translateY(20px);
                    opacity: 0;
                    transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    max-width: 350px;
                    width: 100%;
                }
                .menu-card.active {
                    transform: translateY(0);
                    opacity: 1;
                }
                .menu-emoji {
                    font-size: 4rem;
                    margin-bottom: 15px;
                    display: block;
                }
                .menu-image {
                    width: 100%;
                    max-width: 250px;
                    height: auto;
                    border-radius: 15px;
                    margin-bottom: 20px;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
                    display: none;
                }
                .menu-image.visible {
                    display: inline-block;
                }
                .menu-name {
                    font-size: 2.2rem;
                    font-weight: 700;
                    color: #ff4757;
                    margin-bottom: 10px;
                    word-break: keep-all;
                }
                .menu-desc {
                    color: #747d8c;
                    font-size: 1.1rem;
                    word-break: keep-all;
                }
                :host-context(.dark-mode) .menu-card {
                    background: #2f3542;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }
                :host-context(.dark-mode) .menu-name {
                    color: #ff6b81;
                }
                :host-context(.dark-mode) .menu-desc {
                    color: #a4b0be;
                }
            </style>
            <div class="menu-container">
                <div id="card" class="menu-card active">
                    <img id="image" class="menu-image" alt="menu image">
                    <span id="emoji" class="menu-emoji">🍽️</span>
                    <div id="name" class="menu-name">${defaultTitle}</div>
                    <div id="desc" class="menu-desc">${defaultDesc}</div>
                </div>
            </div>
        `;
    }

    set menu(menuData) {
        const card = this.shadowRoot.getElementById('card');
        const emoji = this.shadowRoot.getElementById('emoji');
        const image = this.shadowRoot.getElementById('image');
        const name = this.shadowRoot.getElementById('name');
        const desc = this.shadowRoot.getElementById('desc');

        card.classList.remove('active');
        
        setTimeout(() => {
            if (menuData.image) {
                image.src = menuData.image;
                image.classList.add('visible');
                emoji.style.display = 'none';
            } else {
                image.classList.remove('visible');
                emoji.style.display = 'block';
                emoji.textContent = menuData.emoji;
            }
            
            name.textContent = menuData.name;
            desc.textContent = menuData.desc;
            card.classList.add('active');
        }, 100);
    }
}

customElements.define('menu-recommendation', MenuRecommendation);

// --- 메뉴 리스트 (KO & EN) --- //
const menus = {
    ko: [
        { name: '김치찌개', emoji: '🥘', desc: '얼큰하고 뜨끈한 한국인의 소울푸드' },
        { name: '삼겹살', emoji: '🥓', desc: '오늘 하루 수고한 당신에게 주는 보상', image: '삼겹살짤.jpg' },
        { name: '치킨', emoji: '🍗', desc: '오늘 저녁은 치맥 어때요?' },
        { name: '초밥', emoji: '🍣', desc: '깔끔하고 신선한 한 끼' },
        { name: '스테이크', emoji: '🥩', desc: '분위기 내고 싶은 오늘 추천드려요' },
        { name: '마라탕', emoji: '🍜', desc: '스트레스 풀리는 알싸한 매운맛' },
        { name: '햄버거', emoji: '🍔', desc: '빠르고 든든하게 즐기는 한 끼' },
        { name: '파스타', emoji: '🍝', desc: '로맨틱하고 맛있는 이탈리안 스타일' },
        { name: '돈가스', emoji: '🍱', desc: '바삭바삭한 식감이 일품인 메뉴' },
        { name: '피자', emoji: '🍕', desc: '친구들과 가족들과 함께 즐기기 좋아요' },
        { name: '떡볶이', emoji: '🍡', desc: '매콤달콤 국민 간식 겸 식사' },
        { name: '제육볶음', emoji: '🍛', desc: '밥 한 공기 뚝딱할 수 있는 밥도둑' }
    ],
    en: [
        { name: 'Kimchi Stew', emoji: '🥘', desc: 'Spicy and comforting Korean soul food' },
        { name: 'K-BBQ', emoji: '🥓', desc: 'The ultimate reward after a long day', image: '삼겹살짤.jpg' },
        { name: 'Fried Chicken', emoji: '🍗', desc: 'How about some chicken and beer tonight?' },
        { name: 'Sushi', emoji: '🍣', desc: 'A clean and fresh meal for a light evening' },
        { name: 'Steak', emoji: '🥩', desc: 'Perfect for a fancy and special dinner' },
        { name: 'Malatang', emoji: '🍜', desc: 'Spicy and numbing flavors to relieve stress' },
        { name: 'Hamburger', emoji: '🍔', desc: 'A quick and satisfying classic meal' },
        { name: 'Pasta', emoji: '🍝', desc: 'Romantic and delicious Italian style' },
        { name: 'Tonkatsu', emoji: '🍱', desc: 'Crunchy and crispy pork cutlet' },
        { name: 'Pizza', emoji: '🍕', desc: 'Great to share with friends and family' },
        { name: 'Tteokbokki', emoji: '🍡', desc: 'Korea\'s favorite sweet and spicy snack' },
        { name: 'Bulgogi', emoji: '🍛', desc: 'Sweet and savory marinated beef' }
    ]
};

// --- Theme Toggle --- //
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;
const lang = document.documentElement.lang;

function updateTheme(isDarkMode) {
    body.classList.toggle('dark-mode', isDarkMode);
    if (lang === 'en') {
        themeToggleBtn.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    } else {
        themeToggleBtn.textContent = isDarkMode ? '라이트 모드' : '다크 모드';
    }
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

const savedTheme = localStorage.getItem('theme');
const isDarkMode = savedTheme === 'dark';
updateTheme(isDarkMode);

themeToggleBtn.addEventListener('click', () => {
    const currentIsDarkMode = body.classList.contains('dark-mode');
    updateTheme(!currentIsDarkMode);
});

// --- Menu Recommender Logic --- //
const generateBtn = document.getElementById('generate-btn');
const menuRecommendationElement = document.querySelector('menu-recommendation');

function getRandomMenu() {
    const currentMenus = menus[lang] || menus.ko;
    const randomIndex = Math.floor(Math.random() * currentMenus.length);
    return currentMenus[randomIndex];
}

generateBtn.addEventListener('click', () => {
    const selectedMenu = getRandomMenu();
    menuRecommendationElement.menu = selectedMenu;
});

// --- Partnership Modal Logic --- //
const modal = document.getElementById('partnership-modal');
const partnershipBtn = document.getElementById('partnership-btn');
const closeBtn = document.querySelector('.close-btn');

if (partnershipBtn) {
    partnershipBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'flex';
    });
}

if (closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });
}

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// --- Disqus Count Formatter --- //
const formatDisqusCount = () => {
    const countElements = document.querySelectorAll('.disqus-comment-count');
    const lang = document.documentElement.lang;

    countElements.forEach(el => {
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'childList') {
                    const text = el.textContent;
                    // 숫자만 추출
                    const count = text.replace(/[^0-9]/g, '');
                    
                    if (count === '' || isNaN(count)) {
                        el.textContent = lang === 'en' ? '0 Comments' : '댓글 0건';
                    } else {
                        el.textContent = lang === 'en' ? `${count} Comments` : `댓글 ${count}건`;
                    }
                    // 변경 후 감지 중지 (무한 루프 방지)
                    observer.disconnect();
                }
            });
        });

        observer.observe(el, { childList: true });
    });
};

formatDisqusCount();
