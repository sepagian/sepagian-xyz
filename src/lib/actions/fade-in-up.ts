interface FadeInUpParams {
  delay?: number;
  duration?: number;
  x?: number;
  y?: number;
}

export function fadeInUp(node: HTMLElement, params: FadeInUpParams = {}) {
  const delay = params.delay ?? 0;
  const duration = params.duration ?? 0.4;
  const y = params.y ?? 12;
  const x = params.x ?? 0;

  node.style.opacity = "0";
  if (x) {
    node.style.transform = `translateX(${x}px)`;
  } else if (y) {
    node.style.transform = `translateY(${y}px)`;
  }
  const anim = node.animate(
    [
      {
        opacity: 0,
        transform: x ? `translateX(${x}px)` : `translateY(${y}px)`,
      },
      { opacity: 1, transform: "translateX(0) translateY(0)" },
    ],
    {
      duration: duration * 1000,
      delay: delay * 500,
      easing: "ease-in-out",
      fill: "both",
    },
  );

  return {
    destroy() {
      anim.cancel();
    },
  };
}
