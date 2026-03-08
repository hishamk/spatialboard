export interface KlipyMediaFile {
  url: string;
  width: number;
  height: number;
  size: number;
}

export interface KlipyItem {
  id: number;
  slug: string;
  title: string;
  file: {
    hd: { gif: KlipyMediaFile; webp: KlipyMediaFile; jpg: KlipyMediaFile };
    md: { gif: KlipyMediaFile; webp: KlipyMediaFile; jpg: KlipyMediaFile };
    sm: { gif: KlipyMediaFile; webp: KlipyMediaFile; jpg: KlipyMediaFile };
    xs: { gif: KlipyMediaFile; webp: KlipyMediaFile; jpg: KlipyMediaFile };
  };
  type: string;
  blur_preview?: string;
}

export interface KlipyResponse {
  result: boolean;
  data: {
    data: KlipyItem[];
    current_page: number;
    per_page: number;
    has_next: boolean;
  };
}

export async function searchGifs(
  baseUrl: string,
  query: string,
  page = 1,
  perPage = 20,
  signal?: AbortSignal,
): Promise<KlipyResponse> {
  const url = `${baseUrl}/search?q=${encodeURIComponent(query)}&page=${page}&per_page=${perPage}`;
  const res = await fetch(url, { signal, credentials: 'include' });
  return res.json();
}

export async function trendingGifs(
  baseUrl: string,
  page = 1,
  perPage = 20,
  signal?: AbortSignal,
): Promise<KlipyResponse> {
  const url = `${baseUrl}/trending?page=${page}&per_page=${perPage}`;
  const res = await fetch(url, { signal, credentials: 'include' });
  return res.json();
}
