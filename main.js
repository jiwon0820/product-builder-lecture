// Teachable Machine Model URL
const URL = "https://teachablemachine.withgoogle.com/models/Rx1SjZ6vJ/";

let model, webcam, labelContainer, maxPredictions;

// Initialize the model and webcam
async function init() {
    const startBtn = document.getElementById("start-btn");
    startBtn.disabled = true;
    startBtn.querySelector(".btn-text").textContent = "모델 로딩 중...";

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    try {
        // Load the model and metadata
        model = await tmImage.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Setup webcam
        const flip = true; 
        webcam = new tmImage.Webcam(400, 400, flip); 
        await webcam.setup(); 
        await webcam.play();
        window.requestAnimationFrame(loop);

        // Update UI
        const container = document.getElementById("webcam-container");
        container.innerHTML = ""; // Remove placeholder
        container.appendChild(webcam.canvas);

        labelContainer = document.getElementById("label-container");
        labelContainer.innerHTML = ""; // Clear
        for (let i = 0; i < maxPredictions; i++) {
            const resultItem = document.createElement("div");
            resultItem.classList.add("result-item");
            resultItem.innerHTML = `
                <span class="class-name"></span>
                <div class="result-bar-bg">
                    <div class="result-bar-fill"></div>
                </div>
                <span class="probability"></span>
            `;
            labelContainer.appendChild(resultItem);
        }

        startBtn.style.display = "none"; // Hide button after start

    } catch (error) {
        console.error("Initialization failed:", error);
        alert("카메라 권한이 필요하거나 모델을 불러오는 데 실패했습니다.");
        startBtn.disabled = false;
        startBtn.querySelector(".btn-text").textContent = "다시 시도하기";
    }
}

async function loop() {
    webcam.update(); 
    await predict();
    window.requestAnimationFrame(loop);
}

// Predict using the webcam frame
async function predict() {
    const prediction = await model.predict(webcam.canvas);
    for (let i = 0; i < maxPredictions; i++) {
        const classItem = labelContainer.childNodes[i];
        const className = prediction[i].className;
        const probability = (prediction[i].probability * 100).toFixed(0);

        classItem.querySelector(".class-name").textContent = className;
        classItem.querySelector(".probability").textContent = `${probability}%`;
        classItem.querySelector(".result-bar-fill").style.width = `${probability}%`;
    }
}

// Event Listeners
document.getElementById("start-btn").addEventListener("click", init);
