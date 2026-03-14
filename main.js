
class MenuRecommendation extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
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
                .menu-name {
                    font-size: 2.5rem;
                    font-weight: 700;
                    color: #ff4757;
                    margin-bottom: 10px;
                }
                .menu-desc {
                    color: #747d8c;
                    font-size: 1.1rem;
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
                <div id="card" class="menu-card">
                    <span id="emoji" class="menu-emoji">🍽️</span>
                    <div id="name" class="menu-name">메뉴를 추천해드릴까요?</div>
                    <div id="desc" class="menu-desc">버튼을 눌러보세요!</div>
                </div>
            </div>
        `;
    }

    set menu(menuData) {
        const card = this.shadowRoot.getElementById('card');
        const emoji = this.shadowRoot.getElementById('emoji');
        const name = this.shadowRoot.getElementById('name');
        const desc = this.shadowRoot.getElementById('desc');

        card.classList.remove('active');
        
        setTimeout(() => {
            emoji.textContent = menuData.emoji;
            name.textContent = menuData.name;
            desc.textContent = menuData.desc;
            card.classList.add('active');
        }, 100);
    }
}

customElements.define('menu-recommendation', MenuRecommendation);

// --- 메뉴 리스트 --- //
const menuList = [
    { name: '김치찌개', emoji: '🥘', desc: '얼큰하고 뜨끈한 한국인의 소울푸드' },
    { name: '삼겹살', emoji: '🥓', desc: '오늘 하루 수고한 당신에게 주는 보상' },
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
];

// --- Theme Toggle --- //
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

function updateTheme(isDarkMode) {
    body.classList.toggle('dark-mode', isDarkMode);
    themeToggleBtn.textContent = isDarkMode ? '라이트 모드' : '다크 모드';
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
    const randomIndex = Math.floor(Math.random() * menuList.length);
    return menuList[randomIndex];
}

generateBtn.addEventListener('click', () => {
    const selectedMenu = getRandomMenu();
    menuRecommendationElement.menu = selectedMenu;
});
