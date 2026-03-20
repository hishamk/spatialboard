import type { ReactNode } from "react";
import {
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignHorizontalSpaceBetween,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  AlignVerticalSpaceBetween,
} from "lucide-react";

const p = {
  size: 16,
  strokeWidth: 2,
  "aria-hidden": true as boolean,
};

/** Lucide icons for align / distribute rows in the canvas context menu. */
export const SB_ALIGN_MENU_ICONS: Record<string, ReactNode> = {
  alignHLeft: <AlignHorizontalJustifyStart {...p} />,
  alignHCenter: <AlignHorizontalJustifyCenter {...p} />,
  alignHRight: <AlignHorizontalJustifyEnd {...p} />,
  distributeH: <AlignHorizontalSpaceBetween {...p} />,
  alignVTop: <AlignVerticalJustifyStart {...p} />,
  alignVCenter: <AlignVerticalJustifyCenter {...p} />,
  alignVBottom: <AlignVerticalJustifyEnd {...p} />,
  distributeV: <AlignVerticalSpaceBetween {...p} />,
};
