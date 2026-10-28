import { useCallback, type ReactElement } from "react";
import { blockHasType } from "@blocknote/core";
import {
  DeleteLinkButton,
  EditLinkButton,
  FormattingToolbar,
  getFormattingToolbarItems,
  LinkToolbar,
  useBlockNoteEditor,
  useComponentsContext,
  useDictionary,
  useEditorState,
  type FormattingToolbarProps,
  type LinkToolbarProps,
} from "@blocknote/react";
import { ArrowSquareOut, DownloadSimple } from "@phosphor-icons/react";
import { openLinkSafely } from "./safe-links";

/** The key of the file download button in `getFormattingToolbarItems()`. */
export const FILE_DOWNLOAD_ITEM_KEY = "fileDownloadButton";

/**
 * The default formatting toolbar items with the file download button replaced
 * by `safeButton`, matched by its key. Every other item keeps its place.
 */
export function withSafeFileDownload(items: ReactElement[], safeButton: ReactElement): ReactElement[] {
  return items.map((item) => (item.key === FILE_DOWNLOAD_ITEM_KEY ? safeButton : item));
}

/** Link toolbar Open button that opens the link through `openLinkSafely`. */
function SafeOpenLinkButton({ url }: Pick<LinkToolbarProps, "url">) {
  const Components = useComponentsContext()!;
  const dict = useDictionary();
  return (
    <Components.LinkToolbar.Button
      className="bn-button"
      mainTooltip={dict.link_toolbar.open.tooltip}
      label={dict.link_toolbar.open.tooltip}
      isSelected={false}
      onClick={() => {
        openLinkSafely(url);
      }}
      icon={<ArrowSquareOut size={16} aria-hidden />}
    />
  );
}

/**
 * The default link toolbar (Edit, Open, Remove) with an Open button that
 * keeps no opener. Use with `LinkToolbarController` and the view's own
 * `linkToolbar` turned off.
 */
export function SafeLinkToolbar(props: LinkToolbarProps) {
  return (
    <LinkToolbar {...props}>
      <EditLinkButton
        url={props.url}
        text={props.text}
        range={props.range}
        setToolbarOpen={props.setToolbarOpen}
        setToolbarPositionFrozen={props.setToolbarPositionFrozen}
      />
      <SafeOpenLinkButton url={props.url} />
      <DeleteLinkButton range={props.range} setToolbarOpen={props.setToolbarOpen} />
    </LinkToolbar>
  );
}

/**
 * File download button for image, video, audio and file blocks that opens
 * the block URL through `openLinkSafely`, after `resolveFileUrl` when the
 * editor has one. Shown under the same selection rule as the default button.
 */
function SafeFileDownloadButton() {
  const Components = useComponentsContext()!;
  const dict = useDictionary();
  const editor = useBlockNoteEditor();
  const block = useEditorState({
    editor,
    selector: ({ editor }) => {
      const selected = editor.getSelection()?.blocks || [editor.getTextCursorPosition().block];
      if (selected.length !== 1) return undefined;
      const [only] = selected;
      return blockHasType(only, editor, only.type, { url: "string" }) ? only : undefined;
    },
  });

  const onClick = useCallback(() => {
    if (!block) return;
    editor.focus();
    const url = block.props.url;
    if (!editor.resolveFileUrl) {
      openLinkSafely(url);
    } else {
      void editor.resolveFileUrl(url).then((resolved) => openLinkSafely(resolved));
    }
  }, [block, editor]);

  if (!block) return null;
  const label =
    dict.formatting_toolbar.file_download.tooltip[block.type] ||
    dict.formatting_toolbar.file_download.tooltip["file"];
  return (
    <Components.FormattingToolbar.Button
      className="bn-button"
      label={label}
      mainTooltip={label}
      icon={<DownloadSimple size={16} aria-hidden />}
      onClick={onClick}
    />
  );
}

/**
 * The default formatting toolbar with a file download button that keeps no
 * opener. Use with `FormattingToolbarController` and the view's own
 * `formattingToolbar` turned off.
 */
export function SafeFormattingToolbar(props: FormattingToolbarProps) {
  return (
    <FormattingToolbar {...props}>
      {withSafeFileDownload(
        getFormattingToolbarItems(props.blockTypeSelectItems),
        <SafeFileDownloadButton key={FILE_DOWNLOAD_ITEM_KEY} />,
      )}
    </FormattingToolbar>
  );
}
