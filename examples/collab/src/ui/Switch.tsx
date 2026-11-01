/** A labelled on/off switch. The label text can change with the state. */
export function Switch({
  checked,
  onChange,
  label,
  title,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
  title?: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      className="switch"
      title={title}
      onClick={() => onChange(!checked)}
    >
      <span className="switch-track" aria-hidden="true" />
      <span className="switch-label">{label}</span>
    </button>
  );
}
