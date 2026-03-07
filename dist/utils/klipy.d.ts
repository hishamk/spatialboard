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
        hd: {
            gif: KlipyMediaFile;
            webp: KlipyMediaFile;
            jpg: KlipyMediaFile;
        };
        md: {
            gif: KlipyMediaFile;
            webp: KlipyMediaFile;
            jpg: KlipyMediaFile;
        };
        sm: {
            gif: KlipyMediaFile;
            webp: KlipyMediaFile;
            jpg: KlipyMediaFile;
        };
        xs: {
            gif: KlipyMediaFile;
            webp: KlipyMediaFile;
            jpg: KlipyMediaFile;
        };
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
export declare function searchGifs(baseUrl: string, query: string, page?: number, perPage?: number, signal?: AbortSignal): Promise<KlipyResponse>;
export declare function trendingGifs(baseUrl: string, page?: number, perPage?: number, signal?: AbortSignal): Promise<KlipyResponse>;
