import type { ReactNode } from 'react'
import { Checkbox } from './Checkbox'

type OptionRowProps = {
  id: string
  label: string
  checked: boolean
  disabled?: boolean
  note?: string
  disabledReason?: string
  extras?: ReactNode
  grouped?: ReactNode
  onChange: (checked: boolean) => void
}

export function OptionRow({
  id,
  label,
  checked,
  disabled = false,
  note,
  disabledReason,
  extras,
  grouped,
  onChange,
}: OptionRowProps) {
  return (
    <div className={`option-row ${disabled ? 'is-locked' : ''}`}>
      <div className="option-main">
        <Checkbox
          id={id}
          label={label}
          checked={checked && !disabled}
          disabled={disabled}
          onChange={onChange}
        />
        {note ? <p className="option-note">{note}</p> : null}
        {disabled && disabledReason ? (
          <p className="option-lock-reason">{disabledReason}</p>
        ) : null}
      </div>
      {extras && !disabled && checked ? (
        <div className="option-extras">{extras}</div>
      ) : null}
      {grouped && !disabled ? (
        <div className="option-extras">{grouped}</div>
      ) : null}
    </div>
  )
}
