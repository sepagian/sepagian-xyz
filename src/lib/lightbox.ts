import PhotoSwipe from "photoswipe";
import "photoswipe/dist/photoswipe.css";

interface LightboxImage {
  src: string;
  width?: number;
  height?: number;
  alt?: string;
  title?: string;
}

export function openLightbox(images: LightboxImage[], index = 0) {
  const pswp = new PhotoSwipe({
    dataSource: images.map((img) => ({
      ...img,
      width: img.width ?? 1200,
      height: img.height ?? 800,
    })),
    index,
    showHideAnimationType: "zoom",
    bgOpacity: 0.9,
    loop: false,
    closeOnVerticalDrag: true,
    padding: { top: 40, bottom: 60, left: 40, right: 40 },
  });

  pswp.init();
  return pswp;
}
