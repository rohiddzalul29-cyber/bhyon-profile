(() => {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
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

  window.__bhyonnReady = true;

  if (!finePointer.matches || reduceMotion.matches) {
    return;
  }

  const orbs = Array.from(document.querySelectorAll("[data-drift]"));
  const magnetTargets = Array.from(document.querySelectorAll("[data-magnet]"));

  if (!orbs.length && !magnetTargets.length) {
    return;
  }

  const lerp = (from, to, amount) => from + (to - from) * amount;
  const settled = (from, to) => Math.abs(from - to) < 0.01;

  const drift = { x: 0, y: 0, toX: 0, toY: 0 };
  const magnets = [];
  let frame = 0;

  const paint = () => {
    let moving = false;

    drift.x = lerp(drift.x, drift.toX, 0.08);
    drift.y = lerp(drift.y, drift.toY, 0.08);

    if (!settled(drift.x, drift.toX) || !settled(drift.y, drift.toY)) {
      moving = true;
    }

    orbs.forEach((orb) => {
      const depth = Number(orb.dataset.drift) || 0.5;
      orb.style.transform =
        "translate3d(" +
        (-drift.x * depth * 28).toFixed(2) +
        "px, " +
        (-drift.y * depth * 28).toFixed(2) +
        "px, 0)";
    });

    magnets.forEach((item) => {
      item.x = lerp(item.x, item.toX, 0.16);
      item.y = lerp(item.y, item.toY, 0.16);
      item.rx = lerp(item.rx, item.toRx, 0.16);
      item.ry = lerp(item.ry, item.toRy, 0.16);

      if (
        !settled(item.x, item.toX) ||
        !settled(item.y, item.toY) ||
        !settled(item.rx, item.toRx) ||
        !settled(item.ry, item.toRy)
      ) {
        moving = true;
      }

      const style = item.el.style;
      style.setProperty("--tx", item.x.toFixed(2) + "px");
      style.setProperty("--ty", item.y.toFixed(2) + "px");
      style.setProperty("--rx", item.rx.toFixed(2) + "deg");
      style.setProperty("--ry", item.ry.toFixed(2) + "deg");
    });

    frame = moving ? window.requestAnimationFrame(paint) : 0;
  };

  const wake = () => {
    if (!frame) {
      frame = window.requestAnimationFrame(paint);
    }
  };

  window.addEventListener(
    "pointermove",
    (event) => {
      drift.toX = event.clientX / window.innerWidth - 0.5;
      drift.toY = event.clientY / window.innerHeight - 0.5;
      wake();
    },
    { passive: true }
  );

  document.documentElement.addEventListener("pointerleave", () => {
    drift.toX = 0;
    drift.toY = 0;

    magnets.forEach((item) => {
      item.toX = 0;
      item.toY = 0;
      item.toRx = 0;
      item.toRy = 0;
    });

    wake();
  });

  magnetTargets.forEach((el) => {
    const item = {
      el,
      pull: Number(el.dataset.magnet) || 0,
      tilt: Number(el.dataset.tilt) || 0,
      x: 0,
      y: 0,
      rx: 0,
      ry: 0,
      toX: 0,
      toY: 0,
      toRx: 0,
      toRy: 0,
    };

    el.addEventListener(
      "pointermove",
      (event) => {
        const rect = el.getBoundingClientRect();
        const nx = (event.clientX - rect.left) / rect.width - 0.5;
        const ny = (event.clientY - rect.top) / rect.height - 0.5;

        item.toX = nx * 2 * item.pull;
        item.toY = ny * 2 * item.pull;
        item.toRy = nx * 2 * item.tilt;
        item.toRx = ny * -2 * item.tilt;
        wake();
      },
      { passive: true }
    );

    el.addEventListener("pointerleave", () => {
      item.toX = 0;
      item.toY = 0;
      item.toRx = 0;
      item.toRy = 0;
      wake();
    });

    magnets.push(item);
  });
})();
