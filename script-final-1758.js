(() => {
  window.__bhyonnReady = true;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const reveals = Array.from(document.querySelectorAll(".reveal"));

  if (!("IntersectionObserver" in window) || reduceMotion.matches) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 }
    );

    reveals.forEach((el) => observer.observe(el));
  }

  const orbs = Array.from(document.querySelectorAll("[data-drift]"));
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");

  if (orbs.length && finePointer.matches && !reduceMotion.matches) {
    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let frame = 0;

    const paint = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;

      orbs.forEach((orb) => {
        const depth = Number(orb.dataset.drift) || 0.5;
        orb.style.transform =
          "translate3d(" +
          (-currentX * depth * 22).toFixed(1) +
          "px, " +
          (-currentY * depth * 22).toFixed(1) +
          "px, 0)";
      });

      if (Math.abs(targetX - currentX) > 0.001 || Math.abs(targetY - currentY) > 0.001) {
        frame = window.requestAnimationFrame(paint);
      } else {
        frame = 0;
      }
    };

    window.addEventListener(
      "pointermove",
      (event) => {
        targetX = event.clientX / window.innerWidth - 0.5;
        targetY = event.clientY / window.innerHeight - 0.5;

        if (!frame) {
          frame = window.requestAnimationFrame(paint);
        }
      },
      { passive: true }
    );
  }
})();
