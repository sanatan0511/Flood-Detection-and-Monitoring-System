
import { useEffect, useState } from "react";
import WebsiteSkeleton from "../components/WebsiteSkeleton";
import ImageWithSkeleton from "../components/ImageWithSkeleton";
import { fetchHomePage } from "../services/homeService";

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    async function loadPage(signal) {
        setLoading(true);
        setError("");

        try {
            const result = await fetchHomePage({ signal });
            if (signal.aborted) return;
            setData(result);
        } catch (err) {
            if (err.name === "AbortError") return;

            setError(err.message || "Something went wrong");
        } finally {
            if (!signal.aborted) {
                setLoading(false);
            }
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        loadPage(controller.signal);

        return () => controller.abort();
    }, []);

    if (loading && !data) {
        return <WebsiteSkeleton />;
    }

    if (error && !data) {
        return (
            <main className="mx-auto max-w-3xl p-6 text-center">
                <h1 className="text-lg font-semibold">
                    Unable to load the page
                </h1>

                <p role="alert" className="mt-2 text-sm text-red-600">
                    {error}
                </p>

                <button
                    onClick={() => {
                        const controller = new AbortController();
                        loadPage(controller.signal);
                    }}
                    className="mt-4 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
                >
                    Try again
                </button>
            </main>
        );
    }

    const imagesById = Object.fromEntries(
        data.images.map((image) => [image.id, image])
    );

    const image1 = imagesById.image1;
    const image2 = imagesById.image2;
    const image3 = imagesById.image3;
    const image4 = imagesById.image4;

    return (
        <main
            aria-busy={loading}
            className="mx-auto w-full max-w-7xl px-3 py-4 sm:px-5"
        >
            {/* Header */}
            <header className="flex flex-wrap items-center gap-3 rounded-xl border border-gray-200 p-3 dark:border-gray-800 sm:flex-nowrap">
                <a href="/" className="shrink-0 font-bold">
                    {data.siteName}
                </a>

                <input
                    type="search"
                    aria-label="Search website"
                    placeholder={data.searchPlaceholder || "Search..."}
                    className="h-10 min-w-0 flex-1 rounded-lg border border-gray-200 px-3 outline-none focus:border-blue-500 dark:border-gray-700 dark:bg-gray-900"
                />

                <nav aria-label="Main navigation">
                    {/* Replace with your actual navigation links */}
                    <a href="/" className="text-sm font-medium">
                        Home
                    </a>
                </nav>
            </header>

            {/* Headlines */}
            <section
                aria-label="Headlines"
                className="mt-3 rounded-xl border border-gray-200 p-3 dark:border-gray-800"
            >
                <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2">
                    {data.headlines.map((headline) => (
                        <span key={headline.id} className="text-sm font-medium">
                            {headline.text}
                        </span>
                    ))}
                </div>
            </section>

            {/* Top row: Image 1 and Image 2 */}
            <section className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-5">
                {image1 && (
                    <ImageWithSkeleton
                        src={image1.src}
                        alt={image1.alt}
                        priority
                        className="aspect-[1.8/1] md:col-span-3 md:aspect-[1.65/1]"
                    />
                )}

                {image2 && (
                    <ImageWithSkeleton
                        src={image2.src}
                        alt={image2.alt}
                        className="aspect-[1.8/1] md:col-span-2 md:aspect-[1.65/1]"
                    />
                )}
            </section>

            {/* Bottom row: Image 4 (60%) and Image 3 (40%) */}
            <section className="mt-3 grid grid-cols-1 gap-3 md:grid-cols-5">
                {image4 && (
                    <ImageWithSkeleton
                        src={image4.src}
                        alt={image4.alt}
                        className="aspect-[1.8/1] md:col-span-3 md:aspect-[1.65/1]"
                    />
                )}

                {image3 && (
                    <ImageWithSkeleton
                        src={image3.src}
                        alt={image3.alt}
                        className="aspect-[1.8/1] md:col-span-2 md:aspect-[1.65/1]"
                    />
                )}
            </section>

            {/* Background refresh indicator */}
            {loading && (
                <p role="status" className="mt-3 text-sm text-gray-500">
                    Updating content…
                </p>
            )}

            {/* A refresh error should not erase content already on screen */}
            {error && (
                <p role="alert" className="mt-3 text-sm text-red-600">
                    Could not refresh the content. Showing the previous version.
                </p>
            )}
            <footer>
                <div className="bg-red-600 text-center mt-8 text-white font-semibold">
                    <p className="p-2 mt-3 bg-black rounded-sm">Flood-Detection-and-Monitoring-System</p><br></br>
                    <p className="p-2 mt-3">© 2026 Flood-Detection-and-Monitoring-System. All rights reserved.</p>
                    <p className="p-2 mt-3">Developed by: Ashish Bhardwaj, Deepanshi Gupta, Diksha Jha, Harsh Pathak</p>
                    <p className="p-2 mt-3">Contact: </p>
                    <option className="p-2 mt-2">
                        <p>Phone: +91 7260968719 </p><br></br>
                        <p>Phone: +91 7814607949 </p>
                    </option>
                    <p>Follow us on social media:</p>
                    <p>Facebook: <a href="https://www.facebook.com/flood-detection-and-monitoring-system">Flood-Detection-and-Monitoring-System</a></p>
                    <p>Twitter: <a href="https://www.twitter.com/flood-detection-and-monitoring-system">Flood-Detection-and-Monitoring-System</a></p>
                    <p>Instagram: <a href="https://www.instagram.com/flood-detection-and-monitoring-system">Flood-Detection-and-Monitoring-System</a></p>
                    <p>LinkedIn: <a href="https://www.linkedin.com/company/flood-detection-and-monitoring-system">Flood-Detection-and-Monitoring-System</a></p>
                    <p>GitHub: <a href="https://www.github.com/flood-detection-and-monitoring-system">Flood-Detection-and-Monitoring-System</a></p>
                    <p>YouTube: <a href="https://www.youtube.com/flood-detection-and-monitoring-system">Flood-Detection-and-Monitoring-System</a></p>
                    <p>Website: <a href="https://www.flood-detection-and-monitoring-system.com">Flood-Detection-and-Monitoring-System</a></p>
                </div>
            </footer>
        </main>
    );
}

