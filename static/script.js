const dropZone = document.getElementById('dropZone');
const browseBtn = document.getElementById('browseBtn');
const fileInput = document.getElementById('fileInput');

const previewImage = document.getElementById('preview-image');
const previewVideo = document.getElementById('preview-video');
const previewContainer = document.getElementById('preview-container');
const analysisDetails = document.getElementById('analysisDetails');

// Hide preview and result on load
window.addEventListener('DOMContentLoaded', () => {
    previewImage.classList.add('hidden');
    previewVideo.classList.add('hidden');
    previewContainer.classList.add('hidden');
    analysisDetails.innerHTML = '';
});

dropZone.addEventListener('dragover', (e) => {
    e.preventDefault();
    dropZone.classList.add('dragover');
});

dropZone.addEventListener('dragleave', () => {
    dropZone.classList.remove('dragover');
});

dropZone.addEventListener('drop', (e) => {
    e.preventDefault();
    dropZone.classList.remove('dragover');

    const file = e.dataTransfer.files[0];
    if (file) {
        handleFile(file);
    }
});

browseBtn.addEventListener('click', () => {
    fileInput.click();
});

fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        handleFile(file);
    }
});

function handleFile(file) {
    const reader = new FileReader();

    reader.onload = (e) => {
        previewImage.classList.add('hidden');
        previewVideo.classList.add('hidden');

        if (file.type.startsWith('image/')) {
            previewImage.src = e.target.result;
            previewImage.classList.remove('hidden');
        } else if (file.type.startsWith('video/')) {
            previewVideo.src = e.target.result;
            previewVideo.classList.remove('hidden');
        } else {
            analysisDetails.innerHTML = '<p style="color: red;">Unsupported file type</p>';
            return;
        }

        previewContainer.classList.remove('hidden');
        analysisDetails.innerHTML = '<p>Analyzing...</p>';

        // Simulate analysis
        setTimeout(() => {
            startAnalysis();
        }, 1500);
    };

    reader.readAsDataURL(file);
}

function startAnalysis() {
    const fakeProb = Math.random() * 100;

    analysisDetails.innerHTML = `
        <div class="analysis-result ${fakeProb > 50 ? 'warning' : 'safe'}" style="width: 40rem; padding-left: 1rem; border-radius: 0.5rem; background: ${fakeProb > 50 ? '#ffe4e6' : '#ecfdf5'}; border: 1px solid ${fakeProb > 50 ? '#f87171' : '#34d399'};">
            <h3 style="color: ${fakeProb > 50 ? '#b91c1c' : '#065f46'};">
                ${fakeProb > 50 ? '⚠️ Potential Deepfake Detected' : '✅ Authentic Content'}
            </h3>
            <ul style="margin-top: 1rem; line-height: 1.6; padding-left: 2rem">
                <li><strong>Deepfake Probability:</strong> ${fakeProb.toFixed(2)}%</li>
                <li><strong>Facial Analysis:</strong> ${(100 - fakeProb / 2).toFixed(1)}%</li>
                <li><strong>Audio Sync:</strong> ${(100 - fakeProb / 3).toFixed(1)}%</li>
                <li><strong>Metadata Check:</strong> ${(100 - fakeProb / 4).toFixed(1)}%</li>
            </ul>
        </div>
    `;

    triggerParticles(fakeProb);
}

function triggerParticles(fakeProb) {
    const particleContainer = document.createElement('div');
    particleContainer.style.position = 'absolute';
    particleContainer.style.top = '0';
    particleContainer.style.left = '0';
    particleContainer.style.width = '100%';
    particleContainer.style.height = '100%';
    particleContainer.style.pointerEvents = 'none';
    particleContainer.style.zIndex = '50';

    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '8px';
        particle.style.height = '8px';
        particle.style.borderRadius = '50%';
        particle.style.backgroundColor = fakeProb > 50 ? '#ef4444' : '#10b981';
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.opacity = '0.8';
        particle.style.transform = `translateX(${Math.random() * 200 - 100}px) translateY(${Math.random() * 200 - 100}px)`;
        particle.style.transition = 'transform 2s ease-out, opacity 2s';
        particleContainer.appendChild(particle);
    }

    document.body.appendChild(particleContainer);

    setTimeout(() => {
        const particles = particleContainer.childNodes;
        particles.forEach(p => {
            p.style.transform = `translateX(${Math.random() * 200 - 100}px) translateY(${Math.random() * 200 - 100}px)`;
            p.style.opacity = '0';
        });
    }, 100);

    setTimeout(() => {
        document.body.removeChild(particleContainer);
    }, 2100);
}
