import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF first, WebP second. On photographs AVIF is typically a third
    // smaller than WebP at matching quality; browsers that don't take it
    // fall through automatically, so there's no compatibility cost.
    formats: ["image/avif", "image/webp"],

    // Widths the site actually asks for, rather than the default ladder.
    // The arc panel requests 50vw above 768px and 100vw below, and the
    // logo is a fixed 32/28px — so the very large entries in the default
    // deviceSizes would only ever generate transforms nothing requests.
    deviceSizes: [480, 640, 828, 1080, 1280, 1920, 2560],
    imageSizes: [32, 64, 96, 128, 256],
  },
};

export default nextConfig;
