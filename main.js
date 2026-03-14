
class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                .lotto-numbers-container {
                    display: flex;
                    justify-content: center;
                    flex-wrap: wrap;
                    gap: 15px;
                }
                .lotto-number {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    font-size: 1.4rem;
                    font-weight: 700;
                    color: white;
                    text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
                    box-shadow: inset -5px -5px 10px rgba(0,0,0,0.2), 3px 3px 10px rgba(0,0,0,0.2);
                    transition: transform 0.3s ease, background 0.3s ease;
                }
                .lotto-number:hover {
                    transform: scale(1.1);
                }
                /* 공 색상 정의 */
                .ball-1-10 { background: radial-gradient(circle at 30% 30%, #fbc531, #e1b12c); }
                .ball-11-20 { background: radial-gradient(circle at 30% 30%, #487eb0, #40739e); }
                .ball-21-30 { background: radial-gradient(circle at 30% 30%, #e84118, #c23616); }
                .ball-31-40 { background: radial-gradient(circle at 30% 30%, #7f8c8d, #718093); }
                .ball-41-45 { background: radial-gradient(circle at 30% 30%, #4cd137, #44bd32); }
            </style>
            <div class="lotto-numbers-container">
                <div class="lotto-number"></div>
                <div class="lotto-number"></div>
                <div class="lotto-number"></div>
                <div class="lotto-number"></div>
                <div class="lotto-number"></div>
                <div class="lotto-number"></div>
            </div>
        `;
    }

    set numbers(numbers) {
        const numberElements = this.shadowRoot.querySelectorAll('.lotto-number');
        if (numbers && numbers.length === 6) {
            numberElements.forEach((element, index) => {
                const num = numbers[index];
                element.textContent = num;
                
                // 기존 클래스 제거 후 숫자에 맞는 클래스 추가
                element.className = 'lotto-number';
                if (num <= 10) element.classList.add('ball-1-10');
                else if (num <= 20) element.classList.add('ball-11-20');
                else if (num <= 30) element.classList.add('ball-21-30');
                else if (num <= 40) element.classList.add('ball-31-40');
                else element.classList.add('ball-41-45');
            });
        }
    }
}

customElements.define('lotto-numbers', LottoNumbers);

// --- Theme Toggle --- //
const themeToggleBtn = document.getElementById('theme-toggle-btn');
const body = document.body;

function updateTheme(isDarkMode) {
    body.classList.toggle('dark-mode', isDarkMode);
    themeToggleBtn.textContent = isDarkMode ? 'Light Mode' : 'Dark Mode';
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
}

// Load saved theme from localStorage
const savedTheme = localStorage.getItem('theme');
const isDarkMode = savedTheme === 'dark';
updateTheme(isDarkMode);

themeToggleBtn.addEventListener('click', () => {
    const currentIsDarkMode = body.classList.contains('dark-mode');
    updateTheme(!currentIsDarkMode);
});


// --- Lotto Generator --- //
const generateBtn = document.getElementById('generate-btn');
const lottoNumbersElement = document.querySelector('lotto-numbers');

function generateLottoNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
        const randomNumber = Math.floor(Math.random() * 45) + 1;
        numbers.add(randomNumber);
    }
    return Array.from(numbers).sort((a, b) => a - b); // Sort numbers
}

generateBtn.addEventListener('click', () => {
    const newNumbers = generateLottoNumbers();
    lottoNumbersElement.numbers = newNumbers;
});

// Initial generation to populate the page on load
const initialNumbers = generateLottoNumbers();
lottoNumbersElement.numbers = initialNumbers;
