type CheckboxProps = {
  id: string
  label: string
  checked: boolean
  disabled?: boolean
  locked?: boolean
  onChange: (checked: boolean) => void
}

export function Checkbox({
  id,
  label,
  checked,
  disabled = false,
  locked = false,
  onChange,
}: CheckboxProps) {
  const isLocked = disabled || locked

  return (
    <label
      htmlFor={id}
      className={`check ${isLocked ? 'is-locked' : ''} ${checked ? 'is-on' : ''}`}
    >
      <input
        id={id}
        type="checkbox"
        checked={checked}
        disabled={isLocked}
        onChange={(event) => onChange(event.target.checked)}
      />
      <span className="check-box" aria-hidden="true" />
      <span className="check-label">{label}</span>
    </label>
  )
}
