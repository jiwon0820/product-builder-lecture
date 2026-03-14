
class LottoNumbers extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --number-bg-light: linear-gradient(145deg, #e6e6e6, #ffffff);
                    --number-bg-dark: linear-gradient(145deg, #1e1e3b, #2a2a4a);
                    --number-shadow-light: 5px 5px 10px #d4d4d4, -5px -5px 10px #ffffff;
                    --number-shadow-dark: 5px 5px 10px #15152a, -5px -5px 10px #2f2f55;
                    --number-color-light: #3498db;
                    --number-color-dark: #e94560;
                }
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
                    font-size: 1.6rem;
                    font-weight: 700;
                    transition: all 0.3s ease;
                }
                body.dark-mode .lotto-number {
                    background: var(--number-bg-dark);
                    box-shadow: var(--number-shadow-dark);
                    color: var(--number-color-dark);
                } 
                body:not(.dark-mode) .lotto-number {
                     background: var(--number-bg-light);
                    box-shadow: var(--number-shadow-light);
                    color: var(--number-color-light);
                }

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
                element.textContent = numbers[index];
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
