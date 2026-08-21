import { useState } from 'react'
import { IconText } from './IconText'
import type { Ability } from '../data/abilities'
import type { AbilityPick, SkillsDeal } from '../dealSkills'
import type { InvestigatorSlot } from '../dealInvestigators'

type SkillsAttributesScreenProps = {
  deal: SkillsDeal
  slots: InvestigatorSlot[]
  picks: Record<string, AbilityPick>
  onPickSkill: (slotId: string, skillId: string) => void
  onPickAttribute: (slotId: string, attributeId: string) => void
  onBack: () => void
  onReroll: () => void
  onContinue: () => void
  continueLabel?: string
}

function AbilityCard({
  ability,
  selected,
  disabled,
  takenBy,
  onSelect,
}: {
  ability: Ability
  selected: boolean
  disabled: boolean
  takenBy?: string
  onSelect: () => void
}) {
  return (
    <button
      type="button"
      className={`ability-card ${selected ? 'is-selected' : ''} ${disabled ? 'is-disabled' : ''}`}
      aria-pressed={selected}
      disabled={disabled}
      onClick={onSelect}
    >
      <span className="ability-name">{ability.name}</span>
      <span className="ability-effect">
        <IconText text={ability.effect} />
      </span>
      {takenBy ? <span className="ability-taken">{takenBy}</span> : null}
    </button>
  )
}

export function SkillsAttributesScreen({
  deal,
  slots,
  picks,
  onPickSkill,
  onPickAttribute,
  onBack,
  onReroll,
  onContinue,
  continueLabel = 'Continue',
}: SkillsAttributesScreenProps) {
  const [activeSlotId, setActiveSlotId] = useState(slots[0]?.id ?? 'slot-0')
  const needsSkill = Boolean(deal.skills)
  const needsAttribute = Boolean(deal.attributes)

  function isComplete(slotId: string): boolean {
    const pick = picks[slotId]
    return (
      (!needsSkill || Boolean(pick?.skillId)) &&
      (!needsAttribute || Boolean(pick?.attributeId))
    )
  }

  const allComplete = slots.every((slot) => isComplete(slot.id))
  const activeIndex = slots.findIndex((slot) => slot.id === activeSlotId)

  function advancePlayer() {
    const nextSlot = slots[activeIndex + 1]
    if (nextSlot) {
      setActiveSlotId(nextSlot.id)
    }
  }

  function selectAttribute(attributeId: string) {
    const alreadySelected = picks[activeSlotId]?.attributeId === attributeId
    onPickAttribute(activeSlotId, attributeId)
    if (!alreadySelected) {
      advancePlayer()
    }
  }

  function slotTitle(index: number): string {
    return `Player ${index + 1}`
  }

  function ownerLabel(abilityId: string, kind: 'skill' | 'attribute'): string | undefined {
    const owner = slots.find((slot) =>
      kind === 'skill'
        ? picks[slot.id]?.skillId === abilityId
        : picks[slot.id]?.attributeId === abilityId,
    )
    if (!owner) return undefined
    const index = slots.findIndex((slot) => slot.id === owner.id)
    return slotTitle(index)
  }

  return (
    <div className="ticket">
      <header className="masthead">
        <p className="eyebrow">Compagnie Internationale des Wagons-Lits</p>
        <h1>Skills & Attributes</h1>
        <p className="subtitle">Assign one of each</p>
      </header>

      <div className="player-switch" role="tablist" aria-label="Players">
        {slots.map((slot, index) => (
          <button
            key={slot.id}
            type="button"
            role="tab"
            aria-selected={slot.id === activeSlotId}
            className={`player-switch-btn ${slot.id === activeSlotId ? 'is-active' : ''} ${isComplete(slot.id) ? 'is-ready' : ''}`}
            onClick={() => setActiveSlotId(slot.id)}
          >
            {slotTitle(index)}
            {isComplete(slot.id) ? <span className="player-ready-dot" /> : null}
          </button>
        ))}
      </div>

      <p className="select-intro">
        {slotTitle(Math.max(activeIndex, 0))}
        {needsSkill && needsAttribute
          ? ': choose one skill and one attribute.'
          : needsSkill
            ? ': choose one skill.'
            : ': choose one attribute.'}
      </p>

      {deal.skills ? (
        <section className="panel">
          <h2>General Skills Pool</h2>
          <div className="ability-grid">
            {deal.skills.map((ability) => {
              const takenBy = ownerLabel(ability.id, 'skill')
              const selected = picks[activeSlotId]?.skillId === ability.id
              return (
                <AbilityCard
                  key={ability.id}
                  ability={ability}
                  selected={selected}
                  disabled={Boolean(takenBy) && !selected}
                  takenBy={!selected ? takenBy : undefined}
                  onSelect={() => onPickSkill(activeSlotId, ability.id)}
                />
              )
            })}
          </div>
        </section>
      ) : null}

      {deal.attributes ? (
        <section className="panel">
          <h2>Attributes Pool</h2>
          <div className="ability-grid">
            {deal.attributes.map((ability) => {
              const takenBy = ownerLabel(ability.id, 'attribute')
              const selected = picks[activeSlotId]?.attributeId === ability.id
              return (
                <AbilityCard
                  key={ability.id}
                  ability={ability}
                  selected={selected}
                  disabled={Boolean(takenBy) && !selected}
                  takenBy={!selected ? takenBy : undefined}
                  onSelect={() => selectAttribute(ability.id)}
                />
              )
            })}
          </div>
        </section>
      ) : null}

      <div className="actions">
        <button type="button" className="back" onClick={onBack}>
          Back
        </button>
        <button type="button" className="back" onClick={onReroll}>
          Reroll
        </button>
        <button
          type="button"
          className="next"
          disabled={!allComplete}
          onClick={onContinue}
        >
          {continueLabel}
        </button>
      </div>
    </div>
  )
}
