const URL = "https://teachablemachine.withgoogle.com/models/Rx1SjZ6vJ/";

let model, labelContainer, maxPredictions;

// 1. 모델 로드
async function loadModel() {
    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";
    model = await tmImage.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();
}

// 2. 파일 업로드 및 프리뷰 처리
const imageUpload = document.getElementById('image-upload');
const imagePreview = document.getElementById('preview-image');
const uploadLabel = document.getElementById('upload-label');
const previewArea = document.getElementById('image-preview-area');

previewArea.addEventListener('click', () => imageUpload.click());

imageUpload.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
            imagePreview.src = event.target.result;
            imagePreview.style.display = 'block';
            uploadLabel.style.display = 'none';
        };
        reader.readAsDataURL(file);
    }
});

// 3. 예측 실행
async function predict() {
    if (!imagePreview.src || imagePreview.style.display === 'none') {
        alert("사진을 먼저 업로드해주세요!");
        return;
    }

    const startBtn = document.getElementById('start-btn');
    startBtn.disabled = true;
    startBtn.textContent = "분석 중...";

    if (!model) await loadModel();

    const prediction = await model.predict(imagePreview);
    
    labelContainer = document.getElementById("label-container");
    labelContainer.innerHTML = "";

    for (let i = 0; i < maxPredictions; i++) {
        const className = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);

        const resultItem = document.createElement("div");
        resultItem.classList.add("result-item");
        resultItem.innerHTML = `
            <span style="min-width: 60px; font-weight: bold;">${className}</span>
            <div class="bar-container">
                <div class="bar-fill" style="width: ${probability}%"></div>
            </div>
            <span style="min-width: 40px; text-align: right;">${probability}%</span>
        `;
        labelContainer.appendChild(resultItem);
    }

    startBtn.disabled = false;
    startBtn.textContent = "다시 테스트하기";
}

// 4. 테마 토글
const themeToggle = document.getElementById('theme-toggle');
const html = document.documentElement;

themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', newTheme);
    themeToggle.querySelector('.mode-icon').textContent = newTheme === 'light' ? '🌙' : '☀️';
});

// Event Listeners
document.getElementById("start-btn").addEventListener("click", predict);

// 초기 모델 로드 (선택 사항: 성능을 위해 미리 로드)
loadModel();
