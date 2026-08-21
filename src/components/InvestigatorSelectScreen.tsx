import { CharacterCard } from './CharacterCard'
import { getCharacter } from '../data/characters'
import type { InvestigatorSlot } from '../dealInvestigators'
import type { SetupState } from '../types'

type InvestigatorSelectScreenProps = {
  setup: SetupState
  slots: InvestigatorSlot[]
  picks: Record<string, string>
  onPick: (slotId: string, characterId: string) => void
  onBack: () => void
  onReroll: () => void
  onContinue: () => void
  continueLabel?: string
}

export function InvestigatorSelectScreen({
  setup,
  slots,
  picks,
  onPick,
  onBack,
  onReroll,
  onContinue,
  continueLabel = 'Continue',
}: InvestigatorSelectScreenProps) {
  const allPicked = slots.every((slot) => Boolean(picks[slot.id]))

  function isTaken(slotId: string, characterId: string): boolean {
    return Object.entries(picks).some(
      ([otherSlotId, pickedId]) =>
        otherSlotId !== slotId && pickedId === characterId,
    )
  }

  return (
    <div className="ticket">
      <header className="masthead">
        <p className="eyebrow">Compagnie Internationale des Wagons-Lits</p>
        <h1>Choose Investigators</h1>
        <p className="subtitle">Select your character first</p>
      </header>

      <p className="select-intro">
        Suspects will be randomized after everyone has picked an investigator.
      </p>

      {slots.map((slot) => (
        <section className="panel" key={slot.id}>
          <h2>{slot.label}</h2>
          <div className="character-grid">
            {slot.choiceIds.map((characterId) => {
              const character = getCharacter(characterId)
              if (!character) return null

              return (
                <CharacterCard
                  key={character.id}
                  character={character}
                  selected={picks[slot.id] === character.id}
                  disabled={isTaken(slot.id, character.id)}
                  onSelect={() => onPick(slot.id, character.id)}
                />
              )
            })}
          </div>
        </section>
      ))}

      <div className="actions">
        <button type="button" className="back" onClick={onBack}>
          Back
        </button>
        {setup.randomize.investigators ? (
          <button type="button" className="back" onClick={onReroll}>
            Reroll
          </button>
        ) : null}
        <div className="actions-next">
          {allPicked ? null : (
            <p className="continue-hint">Please select your investigators.</p>
          )}
          <button
            type="button"
            className="next"
            disabled={!allPicked}
            onClick={onContinue}
          >
            {continueLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
