import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

type MockMediaFile = {
  url: string;
  width: number;
  height: number;
  size: number;
};

type MockKlipyItem = {
  id: number;
  slug: string;
  title: string;
  file: {
    hd: { gif: MockMediaFile; webp: MockMediaFile; jpg: MockMediaFile };
    md: { gif: MockMediaFile; webp: MockMediaFile; jpg: MockMediaFile };
    sm: { gif: MockMediaFile; webp: MockMediaFile; jpg: MockMediaFile };
    xs: { gif: MockMediaFile; webp: MockMediaFile; jpg: MockMediaFile };
  };
  type: string;
};

function makeMedia(url: string, width: number, height: number): MockMediaFile {
  return { url, width, height, size: width * height };
}

function makeItem(id: number, title: string, slug: string, url: string, width: number, height: number): MockKlipyItem {
  const hd = makeMedia(url, width, height);
  const md = makeMedia(url, Math.round(width * 0.75), Math.round(height * 0.75));
  const sm = makeMedia(url, Math.round(width * 0.5), Math.round(height * 0.5));
  const xs = makeMedia(url, Math.round(width * 0.33), Math.round(height * 0.33));
  return {
    id,
    slug,
    title,
    type: "gif",
    file: {
      hd: { gif: hd, webp: hd, jpg: hd },
      md: { gif: md, webp: md, jpg: md },
      sm: { gif: sm, webp: sm, jpg: sm },
      xs: { gif: xs, webp: xs, jpg: xs },
    },
  };
}

const MOCK_KLIPY_ITEMS: MockKlipyItem[] = [
  makeItem(101, "Golden retriever running", "golden-retriever-running", "https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&w=900&h=600&q=80", 900, 600),
  makeItem(102, "Misty mountain sunrise", "misty-mountain-sunrise", "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&h=600&q=80", 900, 600),
  makeItem(103, "Neon city night street", "neon-city-night", "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=900&h=600&q=80", 900, 600),
  makeItem(104, "Orange cat close up", "orange-cat-close-up", "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=800&h=1000&q=80", 800, 1000),
  makeItem(105, "Ocean wave curl", "ocean-wave-curl", "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1000&h=600&q=80", 1000, 600),
  makeItem(106, "Retro computer desk", "retro-computer-desk", "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&h=600&q=80", 900, 600),
  makeItem(107, "Coffee and notebook", "coffee-and-notebook", "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=900&h=600&q=80", 900, 600),
  makeItem(108, "Forest road fog", "forest-road-fog", "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=900&h=600&q=80", 900, 600),
  makeItem(109, "Vinyl records stack", "vinyl-records-stack", "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=900&h=600&q=80", 900, 600),
  makeItem(110, "Colorful abstract paint", "colorful-abstract-paint", "https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=900&h=600&q=80", 900, 600),
  makeItem(111, "Runner on city bridge", "runner-on-city-bridge", "https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&w=900&h=600&q=80", 900, 600),
  makeItem(112, "Desert dunes texture", "desert-dunes-texture", "https://images.unsplash.com/photo-1509316785289-025f5b846b35?auto=format&fit=crop&w=900&h=600&q=80", 900, 600),
];

function paginate<T>(items: T[], page: number, perPage: number) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    data: items.slice(start, end),
    hasNext: end < items.length,
  };
}

export default defineConfig({
  plugins: [
    react(),
    {
      name: "mock-klipy-gifs",
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if (!req.url) return next();
          const { pathname, searchParams } = new URL(req.url, "http://localhost");
          if (pathname !== "/mock-gifs/search" && pathname !== "/mock-gifs/trending") {
            return next();
          }

          const page = Math.max(1, Number(searchParams.get("page") ?? "1") || 1);
          const perPage = Math.max(1, Math.min(50, Number(searchParams.get("per_page") ?? "20") || 20));

          let items = MOCK_KLIPY_ITEMS;
          if (pathname === "/mock-gifs/search") {
            const query = (searchParams.get("q") ?? "").trim().toLowerCase();
            items = query
              ? MOCK_KLIPY_ITEMS.filter(
                  (item) =>
                    item.title.toLowerCase().includes(query) || item.slug.toLowerCase().includes(query),
                )
              : [];
          }

          const paged = paginate(items, page, perPage);
          const payload = {
            result: true,
            data: {
              data: paged.data,
              current_page: page,
              per_page: perPage,
              has_next: paged.hasNext,
            },
          };

          res.setHeader("Content-Type", "application/json");
          res.statusCode = 200;
          res.end(JSON.stringify(payload));
        });
      },
    },
  ],
  resolve: {
    alias: {
      // Resolve library imports to source for HMR during development
      "spatialboard/style.css": resolve(__dirname, "../../src/styles/index.css"),
      spatialboard: resolve(__dirname, "../../src/index.ts"),
      "@spatialboard-exemplars": resolve(
        __dirname,
        "../../../llm-guidance/spatialboard-exemplars/loaders",
      ),
    },
  },
});
