import type { SpatialNode } from "../engine/types";
export interface PersonalLibraryItem {
    id: string;
    name: string;
    nodes: SpatialNode[];
    groupParent: [string, string][];
    createdAt: number;
}
export declare function getPersonalItems(): PersonalLibraryItem[];
export declare function addPersonalItem(name: string, nodes: SpatialNode[], groupParent: Map<string, string>): PersonalLibraryItem;
export declare function removePersonalItem(id: string): void;
