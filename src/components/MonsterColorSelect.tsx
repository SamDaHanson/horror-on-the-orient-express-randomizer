import { useEffect, useRef, useState } from 'react'
import type { MonsterColor } from '../types'
import { Checkbox } from './Checkbox'

const COLORS: { id: MonsterColor; label: string }[] = [
  { id: 'red', label: 'Red' },
  { id: 'green', label: 'Green' },
  { id: 'blue', label: 'Blue' },
]

type MonsterColorSelectProps = {
  value: Record<MonsterColor, boolean>
  onChange: (next: Record<MonsterColor, boolean>) => void
}

export function MonsterColorSelect({
  value,
  onChange,
}: MonsterColorSelectProps) {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handlePointer(event: MouseEvent) {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handlePointer)
    return () => document.removeEventListener('mousedown', handlePointer)
  }, [])

  const selected = COLORS.filter((color) => value[color.id]).map(
    (color) => color.label,
  )
  const summary = selected.length > 0 ? selected.join(', ') : 'None'

  function toggleColor(id: MonsterColor, checked: boolean) {
    const selectedCount = COLORS.filter((color) => value[color.id]).length
    if (!checked && selectedCount <= 1) {
      return
    }

    onChange({ ...value, [id]: checked })
  }

  return (
    <div className="dropdown" ref={rootRef}>
      <span className="select-label" id="monster-colors-label">
        Colors
      </span>
      <button
        type="button"
        className="dropdown-trigger"
        aria-labelledby="monster-colors-label"
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={() => setOpen((current) => !current)}
      >
        {summary}
      </button>
      {open ? (
        <div className="dropdown-menu" role="listbox">
          {COLORS.map((color) => (
            <Checkbox
              key={color.id}
              id={`monster-color-${color.id}`}
              label={color.label}
              checked={value[color.id]}
              onChange={(checked) => toggleColor(color.id, checked)}
            />
          ))}
        </div>
      ) : null}
    </div>
  )
}
