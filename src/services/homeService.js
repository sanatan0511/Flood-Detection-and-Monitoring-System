const MOCK_HOMEPAGE_DATA = {
  siteName: "Capstone Studio",
  searchPlaceholder: "Search articles, projects, images...",
  headlines: [
    { id: 1, text: " Latest design trends for 2026" },
    { id: 2, text: " Tailwind CSS v4 in production" },
    { id: 3, text: " Optimized skeleton loading UX" },
  ],
  images: [
    {
      id: "image1",
      src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
      alt: "Abstract 3D curved shapes",
    },
    {
      id: "image2",
      src: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80",
      alt: "Artistic painting",
    },
    {
      id: "image4",
      src: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?auto=format&fit=crop&w=800&q=80",
      alt: "Neon gradient wave",
    },
    {
      id: "image3",
      src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
      alt: "Tropical turquoise beach",
    },
  ],
};

export async function fetchHomePage({ signal } = {}) {
  try {
    const response = await fetch("/api/homepage", {
      signal,
      headers: {
        Accept: "application/json",
      },
    });

    if (response.ok) {
      const data = await response.json();
      if (Array.isArray(data.images) && Array.isArray(data.headlines)) {
        return data;
      }
    }
  } catch (err) {
    if (err.name === "AbortError") throw err;
  }

  // Fallback to mock data with a 1.2s delay to showcase skeleton loading state
  await new Promise((resolve, reject) => {
    const timeout = setTimeout(resolve, 1200);
    if (signal) {
      signal.addEventListener("abort", () => {
        clearTimeout(timeout);
        reject(new DOMException("Aborted", "AbortError"));
      });
    }
  });

  return MOCK_HOMEPAGE_DATA;
}
