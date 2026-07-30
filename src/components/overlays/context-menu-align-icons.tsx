import type { ReactNode } from "react";
import {
  AlignBottom,
  AlignCenterHorizontal,
  AlignCenterVertical,
  AlignLeft,
  AlignRight,
  AlignTop,
  ArrowsOutLineHorizontal,
  ArrowsOutLineVertical,
} from "@phosphor-icons/react";

const p = {
  size: 16,
  weight: "duotone" as const,
  "aria-hidden": true as boolean,
};

/** Phosphor duotone icons for align / distribute rows in the canvas context menu. */
export const SB_ALIGN_MENU_ICONS: Record<string, ReactNode> = {
  alignHLeft: <AlignLeft {...p} />,
  alignHCenter: <AlignCenterHorizontal {...p} />,
  alignHRight: <AlignRight {...p} />,
  distributeH: <ArrowsOutLineHorizontal {...p} />,
  alignVTop: <AlignTop {...p} />,
  alignVCenter: <AlignCenterVertical {...p} />,
  alignVBottom: <AlignBottom {...p} />,
  distributeV: <ArrowsOutLineVertical {...p} />,
};
