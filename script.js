const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

const frameCount = 240;
const images = [];
let loadedImages = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  const index = String(i).padStart(3, "0");
  img.src = `image/ezgif-frame-${index}.jpg`;
  img.onload = () => loadedImages++;
  images.push(img);
}

function drawFrame(index) {
  if (!images[index]) return;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const img = images[index];
  const scale = Math.max(
    canvas.width / img.width,
    canvas.height / img.height
  );

  const x = canvas.width / 2 - (img.width * scale) / 2;
  const y = canvas.height / 2 - (img.height * scale) / 2;

  ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
}

// Scroll animation control
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScroll;

  const frameIndex = Math.min(
    frameCount - 1,
    Math.floor(scrollFraction * frameCount)
  );

  if (loadedImages === frameCount) {
    drawFrame(frameIndex);
  }
});
