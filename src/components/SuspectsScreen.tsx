import { getCharacter } from '../data/characters'
import type { SuspectSeat, SuspectsDeal } from '../dealSuspects'

type SuspectsScreenProps = {
  deal: SuspectsDeal
  onBack: () => void
  onReroll: () => void
  onFinish: () => void
}

function initials(name: string): string {
  const parts = name.replace(/\./g, '').split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ''
  const last = parts[parts.length - 1]?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

function SuspectBox({ seat }: { seat: SuspectSeat }) {
  const character = getCharacter(seat.characterId)
  if (!character) return null

  return (
    <div className={`suspect-box is-${seat.color}`}>
      {seat.desireRevealed ? (
        <span className="desire-revealed">Desire Revealed</span>
      ) : null}
      <div className="portrait">
        {character.portrait ? (
          <img src={character.portrait} alt="" />
        ) : (
          <span className="portrait-initials">{initials(character.name)}</span>
        )}
      </div>
      <span className="character-name">{character.name}</span>
      <span className="character-title">{character.title}</span>
      {seat.carName ? (
        <span className="suspect-car">{seat.carName}</span>
      ) : null}
    </div>
  )
}

function SuspectRow({
  title,
  seats,
}: {
  title: string
  seats: SuspectSeat[]
}) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <div className="suspect-row">
        {seats.map((seat) => (
          <SuspectBox key={seat.characterId} seat={seat} />
        ))}
      </div>
    </section>
  )
}

export function SuspectsScreen({ deal, onBack, onReroll, onFinish }: SuspectsScreenProps) {
  return (
    <div className="ticket">
      <header className="masthead">
        <p className="eyebrow">Compagnie Internationale des Wagons-Lits</p>
        <h1>Suspects</h1>
        <p className="subtitle">First class and second class</p>
      </header>

      <SuspectRow title="1st Class Suspects" seats={deal.firstClass} />
      <SuspectRow title="2nd Class Suspects" seats={deal.secondClass} />

      <div className="actions">
        <button type="button" className="back" onClick={onBack}>
          Back
        </button>
        <button type="button" className="back" onClick={onReroll}>
          Reroll
        </button>
        <button type="button" className="next" onClick={onFinish}>
          Finish & Summarize
        </button>
      </div>
    </div>
  )
}
