/**
 * Lightweight "fly to cart" effect — no dependencies.
 *
 * Clones a small circular thumbnail of the product and animates it from the
 * source element to the cart icon in the navbar (marked with `data-cart-icon`).
 * Colors/border use the Apni Dukan brand theme so it matches the rest of the UI.
 */
export function flyToCart(sourceEl: HTMLElement | null, imageUrl?: string) {
  if (typeof window === "undefined" || !sourceEl) return;

  // Respect users who prefer reduced motion.
  if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;

  const target = document.querySelector<HTMLElement>("[data-cart-icon]");
  if (!target) return;

  const start = sourceEl.getBoundingClientRect();
  const end = target.getBoundingClientRect();
  if (start.width === 0 || end.width === 0) return;

  const size = 64;
  const flyer = document.createElement("div");
  flyer.setAttribute("aria-hidden", "true");
  Object.assign(flyer.style, {
    position: "fixed",
    left: `${start.left + start.width / 2 - size / 2}px`,
    top: `${start.top + start.height / 2 - size / 2}px`,
    width: `${size}px`,
    height: `${size}px`,
    borderRadius: "9999px",
    overflow: "hidden",
    zIndex: "100",
    pointerEvents: "none",
    background: "#1a1a1a",
    border: "2px solid #cc0000",
    boxShadow: "0 12px 30px -8px rgba(204,0,0,0.6)",
    transition:
      "transform 0.9s cubic-bezier(0.5,-0.2,0.25,1), opacity 0.9s ease-in",
    willChange: "transform, opacity",
  } as Partial<CSSStyleDeclaration>);

  if (imageUrl) {
    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = "";
    Object.assign(img.style, {
      width: "100%",
      height: "100%",
      objectFit: "cover",
    } as Partial<CSSStyleDeclaration>);
    flyer.appendChild(img);
  }

  document.body.appendChild(flyer);

  const dx = end.left + end.width / 2 - (start.left + start.width / 2);
  const dy = end.top + end.height / 2 - (start.top + start.height / 2);

  // Force a reflow so the initial position is committed before transitioning.
  void flyer.offsetWidth;

  requestAnimationFrame(() => {
    flyer.style.transform = `translate(${dx}px, ${dy}px) scale(0.15)`;
    flyer.style.opacity = "0.2";
  });

  const cleanup = () => {
    flyer.removeEventListener("transitionend", cleanup);
    if (flyer.isConnected) flyer.remove();
  };
  flyer.addEventListener("transitionend", cleanup);
  // Safety net in case transitionend doesn't fire.
  window.setTimeout(cleanup, 1100);
}
