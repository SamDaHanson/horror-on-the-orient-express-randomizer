import type { ChangeEvent } from 'react'

type SelectOption = {
  value: string | number
  label: string
}

type SelectProps = {
  id: string
  label: string
  value: string | number
  options: SelectOption[]
  disabled?: boolean
  wide?: boolean
  onChange: (value: string) => void
}

export function Select({
  id,
  label,
  value,
  options,
  disabled = false,
  wide = false,
  onChange,
}: SelectProps) {
  return (
    <label
      htmlFor={id}
      className={`select ${disabled ? 'is-locked' : ''} ${wide ? 'is-wide' : ''}`}
    >
      <span className="select-label">{label}</span>
      <select
        id={id}
        value={value}
        disabled={disabled}
        onChange={(event: ChangeEvent<HTMLSelectElement>) =>
          onChange(event.target.value)
        }
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  )
}
