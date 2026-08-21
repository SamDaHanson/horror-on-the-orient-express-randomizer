import { getGameIcon } from '../data/icons'

type IconTextProps = {
  text: string
  compact?: boolean
}

function IconToken({ name }: { name: string }) {
  const icon = getGameIcon(name)

  if (icon.src) {
    return (
      <img className="game-icon" src={icon.src} alt={icon.label} title={icon.label} />
    )
  }

  return (
    <span className="icon-chip" title={icon.label}>
      {icon.label}
    </span>
  )
}

export function IconText({ text, compact = false }: IconTextProps) {
  const display = compact ? text.replace(/\n+/g, ' ') : text
  const lines = compact ? [display] : display.split('\n')

  return (
    <span className={`icon-text ${compact ? 'is-compact' : ''}`}>
      {lines.map((line, lineIndex) => {
        const parts = line.split(/(<[^>]+>)/g)
        return (
          <span key={lineIndex} className="icon-text-line">
            {parts.map((part, partIndex) => {
              const iconMatch = part.match(/^<([^>]+)>$/)
              if (iconMatch?.[1]) {
                return <IconToken key={partIndex} name={iconMatch[1]} />
              }
              return <span key={partIndex}>{part}</span>
            })}
          </span>
        )
      })}
    </span>
  )
}
