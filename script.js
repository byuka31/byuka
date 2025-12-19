// Autoplay fix (Chrome butuh interaksi)
document.addEventListener('click', () => {
    document.getElementById('music').play();
});

// Generate hearts
setInterval(() => {
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";
    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = Math.random() * 20 + 15 + "px";

    document.body.appendChild(heart);

    setTimeout(() => {
        heart.remove();
    }, 5000);
}, 300);

const items = [
    ...document.querySelectorAll(".photo img"),
    ...document.querySelectorAll(".media")
];

const lightbox = document.getElementById("lightbox");
const imgBox = document.getElementById("lightboxImg");
const videoBox = document.getElementById("lightboxVideo");

const closeBtn = document.querySelector(".close");
const nextBtn = document.querySelector(".right");
const prevBtn = document.querySelector(".left");

let index = 0;

items.forEach((item, i) => {
    item.addEventListener("click", () => {
        index = i;
        openItem();
    });
});

function openItem() {
    lightbox.style.display = "flex";
    imgBox.style.display = "none";
    videoBox.style.display = "none";
    videoBox.pause();

    const current = items[index];

    if (current.tagName === "IMG") {
        imgBox.src = current.src;
        imgBox.style.display = "block";
    } else {
        videoBox.src = current.querySelector("source").src;
        videoBox.style.display = "block";
        videoBox.play();
    }
}

nextBtn.onclick = () => {
    index = (index + 1) % items.length;
    openItem();
};

prevBtn.onclick = () => {
    index = (index - 1 + items.length) % items.length;
    openItem();
};

closeBtn.onclick = () => {
    lightbox.style.display = "none";
    videoBox.pause();
};

lightbox.onclick = (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = "none";
        videoBox.pause();
    }
};
