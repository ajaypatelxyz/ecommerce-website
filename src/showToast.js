// Create one container in the bottom‑right corner
let toastContainer = null;

function ensureToastContainer() {
    if (toastContainer) return;

    toastContainer = document.createElement("div");
    toastContainer.id = "toast-container";

    // Position: bottom‑right
    toastContainer.style.position = "fixed";
    toastContainer.style.right = "20px";
    toastContainer.style.bottom = "20px";
    toastContainer.style.zIndex = "9999";
    toastContainer.style.display = "flex";
    toastContainer.style.flexDirection = "column";
    toastContainer.style.gap = "8px";

    document.body.appendChild(toastContainer);
}

export function showToast(operation, id) {
    ensureToastContainer();

    const toast = document.createElement("div");
    toast.classList.add("toast");

    // Basic styling for each toast box
    toast.style.minWidth = "220px";
    toast.style.maxWidth = "320px";
    toast.style.padding = "10px 14px";
    toast.style.borderRadius = "6px";
    toast.style.backgroundColor = operation === "add" ? "#16a34a" : "#dc2626"; // green / red
    toast.style.color = "#ffffff";
    toast.style.fontFamily = 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif';
    toast.style.fontSize = "14px";
    toast.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.25)";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(10px)";
    toast.style.transition = "opacity 0.2s ease-out, transform 0.2s ease-out";

    // Set the text content based on the operation
    // NOTE: pass the PRODUCT NAME as "id" when you call showToast
    if (operation === "add") {
        toast.textContent = `Product "${id}" has been added to cart.`;
    } else {
        toast.textContent = `Product "${id}" has been removed from cart.`;
    }

    toastContainer.appendChild(toast);

    // Animate in
    requestAnimationFrame(() => {
        toast.style.opacity = "1";
        toast.style.transform = "translateY(0)";
    });

    // Automatically remove the toast after a few seconds
    setTimeout(() => {
        toast.style.opacity = "0";
        toast.style.transform = "translateY(10px)";
        toast.addEventListener(
            "transitionend",
            () => {
                toast.remove();
            },
            { once: true }
        );
    }, 2000);
}
