import type { Character } from '../data/characters'

type CharacterCardProps = {
  character: Character
  selected?: boolean
  disabled?: boolean
  onSelect: () => void
}

function initials(name: string): string {
  const parts = name.replace(/\./g, '').split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ''
  const last = parts[parts.length - 1]?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

export function CharacterCard({
  character,
  selected = false,
  disabled = false,
  onSelect,
}: CharacterCardProps) {
  return (
    <button
      type="button"
      className={`character-card ${selected ? 'is-selected' : ''} ${disabled ? 'is-disabled' : ''}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
    >
      <div className="portrait">
        {character.portrait ? (
          <img src={character.portrait} alt="" />
        ) : (
          <span className="portrait-initials">{initials(character.name)}</span>
        )}
      </div>
      <span className="character-name">{character.name}</span>
      <span className="character-title">{character.title}</span>
    </button>
  )
}
