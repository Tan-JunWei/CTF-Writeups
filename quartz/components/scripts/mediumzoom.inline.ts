const showOverlay = (overlay: HTMLDivElement) => {
    overlay.style.display = "block";
    requestAnimationFrame(() => {
        overlay.classList.add("zoom-active");
    });
};

const hideOverlay = (overlay: HTMLDivElement) => {
    overlay.classList.remove("zoom-active");
    overlay.addEventListener(
        "transitionend",
        () => {
            overlay.style.display = "none";
            overlay.innerHTML = '';
        },
        { once: true }
    );
};

const applyCustomZoom = () => {
    const images = document.querySelectorAll<HTMLImageElement>("article img");

    let overlay = document.querySelector(".zoom-overlay") as HTMLDivElement;
    if (!overlay) {
        overlay = document.createElement("div");
        overlay.classList.add("zoom-overlay");
        document.body.appendChild(overlay);

        overlay.addEventListener("click", () => {
            document.body.classList.remove("zoom-active");
            hideOverlay(overlay);
        });
    }

    images.forEach((img) => {
        if (!img.dataset.zoomListener) {
            img.addEventListener("click", () => toggleZoom(img, overlay));
            img.dataset.zoomListener = "true";
        }
    });

    window.addEventListener("scroll", () => removeZoomOnScroll());
};

const toggleZoom = (img: HTMLImageElement, overlay: HTMLDivElement) => {
    const isZoomed = img.classList.contains("zoomed");

    document.querySelectorAll(".zoomed").forEach((el) => el.classList.remove("zoomed"));

    if (!isZoomed) {
        const imgCopy = img.cloneNode(true) as HTMLImageElement;
        imgCopy.classList.add("zoomed-img");
        imgCopy.style.transition = "transform 0.3s ease";

        overlay.innerHTML = '';
        overlay.appendChild(imgCopy);

        const imgWidth = img.offsetWidth;
        const imgHeight = img.offsetHeight;
        const maxWidth = window.innerWidth * 0.8;
        const maxHeight = window.innerHeight * 0.8;

        let newWidth = imgWidth;
        let newHeight = imgHeight;

        if (newWidth < maxWidth && newHeight < maxHeight) {
            const widthScale = maxWidth / imgWidth;
            const heightScale = maxHeight / imgHeight;
            const scaleFactor = Math.min(widthScale, heightScale);
            newWidth = imgWidth * scaleFactor;
            newHeight = imgHeight * scaleFactor;
        }

        imgCopy.style.width = `${newWidth}px`;
        imgCopy.style.height = `${newHeight}px`;

        document.body.classList.add("zoom-active");
        showOverlay(overlay); 
    } else {
        document.body.classList.remove("zoom-active");
        hideOverlay(overlay); 
    }
};

const removeZoomOnScroll = () => {
    const overlay = document.querySelector(".zoom-overlay") as HTMLDivElement | null;
    const zoomedImage = overlay?.querySelector(".zoomed-img") as HTMLImageElement | null;

    if (zoomedImage && overlay) {
        document.body.classList.remove("zoom-active");
        hideOverlay(overlay); 
    }
};

document.addEventListener("nav", applyCustomZoom);