import { IconText } from './IconText'
import { TrainLayout } from './TrainLayout'
import { ATTRIBUTES, GENERAL_SKILLS, type Ability } from '../data/abilities'
import { getCharacter } from '../data/characters'
import type { AbilityPick, SkillsDeal } from '../dealSkills'
import type { InvestigatorSlot } from '../dealInvestigators'
import type { MainSetupDeal } from '../dealMainSetup'
import type { SuspectSeat, SuspectsDeal } from '../dealSuspects'
import type { SetupState } from '../types'

type SummaryScreenProps = {
  setup: SetupState
  mainDeal: MainSetupDeal | null
  slots: InvestigatorSlot[]
  investigatorPicks: Record<string, string>
  skillsDeal: SkillsDeal | null
  abilityPicks: Record<string, AbilityPick>
  suspectsDeal: SuspectsDeal | null
  onBack: () => void
  onRestart: () => void
}

function abilityById(id: string | undefined, pool: Ability[]): Ability | null {
  if (!id) return null
  return pool.find((ability) => ability.id === id) ?? null
}

function initials(name: string): string {
  const parts = name.replace(/\./g, '').split(/\s+/).filter(Boolean)
  const first = parts[0]?.[0] ?? ''
  const last = parts[parts.length - 1]?.[0] ?? ''
  return `${first}${last}`.toUpperCase()
}

function Portrait({
  name,
  portrait,
}: {
  name: string
  portrait: string | null
}) {
  return (
    <div className="portrait">
      {portrait ? (
        <img src={portrait} alt="" />
      ) : (
        <span className="portrait-initials">{initials(name)}</span>
      )}
    </div>
  )
}

function occupantMap(deal: SuspectsDeal): Record<string, string> {
  const occupants: Record<string, string> = {}
  for (const seat of [...deal.firstClass, ...deal.secondClass]) {
    if (!seat.carName) continue
    const character = getCharacter(seat.characterId)
    if (character) {
      occupants[seat.carName] = character.name
    }
  }
  return occupants
}

function SuspectBox({ seat }: { seat: SuspectSeat }) {
  const character = getCharacter(seat.characterId)
  if (!character) return null

  return (
    <div className={`suspect-box is-${seat.color}`}>
      {seat.desireRevealed ? (
        <span className="desire-revealed">Desire Revealed</span>
      ) : null}
      <Portrait name={character.name} portrait={character.portrait} />
      <span className="character-name">{character.name}</span>
      <span className="character-title">{character.title}</span>
      {seat.carName ? (
        <span className="suspect-car">{seat.carName}</span>
      ) : null}
    </div>
  )
}

function AbilityPoolList({
  title,
  abilities,
}: {
  title: string
  abilities: Ability[]
}) {
  return (
    <section className="panel">
      <h2>{title}</h2>
      <ul className="ability-pool-list">
        {abilities.map((ability) => (
          <li key={ability.id}>
            <span className="ability-name">{ability.name}</span>
            <span className="ability-pool-effect">
              <IconText text={ability.effect} compact />
            </span>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function SummaryScreen({
  setup,
  mainDeal,
  slots,
  investigatorPicks,
  skillsDeal,
  abilityPicks,
  suspectsDeal,
  onBack,
  onRestart,
}: SummaryScreenProps) {
  const expansions = [
    'Base game',
    setup.expansions.investigatorsUnveiled ? 'Investigators Unveiled' : null,
    setup.expansions.newMonstrosities ? 'New Monstrosities' : null,
    setup.expansions.kickstarterExclusives ? 'Kickstarter Exclusives' : null,
  ].filter(Boolean)

  const occupants = suspectsDeal ? occupantMap(suspectsDeal) : undefined

  return (
    <div className="ticket">
      <header className="masthead">
        <p className="eyebrow">Compagnie Internationale des Wagons-Lits</p>
        <h1>Final Summary</h1>
        <p className="subtitle">
          {setup.playerCount} player{setup.playerCount === 1 ? '' : 's'}
        </p>
      </header>

      <section className="panel">
        <h2>Expansions</h2>
        <ul className="summary-list">
          {expansions.map((item) => (
            <li key={String(item)}>{item}</li>
          ))}
        </ul>
      </section>

      {mainDeal?.journey ? (
        <section className="panel">
          <h2>Journey Landscape</h2>
          <p className="result-stamp">{mainDeal.journey}</p>
        </section>
      ) : null}

      {mainDeal?.startingCity ? (
        <section className="panel">
          <h2>Starting City</h2>
          <p className="result-stamp">{mainDeal.startingCity}</p>
        </section>
      ) : null}

      {mainDeal?.cars ? (
        <section className="panel">
          <h2>Train Layout</h2>
          <TrainLayout cars={mainDeal.cars} occupants={occupants} />
        </section>
      ) : null}

      {mainDeal?.monsters && mainDeal.monsters.length > 0 ? (
        <section className="panel">
          <h2>Monsters</h2>
          <div
            className="monster-row"
            style={{
              gridTemplateColumns: `repeat(${mainDeal.monsters.length}, minmax(0, 1fr))`,
            }}
          >
            {mainDeal.monsters.map((monster) => (
              <div
                className={`monster-col is-${monster.color}`}
                key={monster.color}
              >
                <span className="monster-color">{monster.color}</span>
                <span className="result-stamp">{monster.name}</span>
              </div>
            ))}
          </div>
        </section>
      ) : null}

      {mainDeal?.ritual ? (
        <section className="panel">
          <h2>Ritual</h2>
          <p className="result-stamp">{mainDeal.ritual}</p>
        </section>
      ) : null}

      {mainDeal?.passengerDeck ? (
        <section className="panel">
          <h2>Passenger Deck</h2>
          <p className="result-stamp">{mainDeal.passengerDeck}</p>
        </section>
      ) : null}

      {mainDeal?.vampire ? (
        <section className="panel">
          <h2>Vampire</h2>
          <p className="result-stamp">{mainDeal.vampire.name}</p>
          <p className="chance-note">
            There was a {mainDeal.vampire.chancePercent}% chance of{' '}
            {mainDeal.vampire.name}.
          </p>
        </section>
      ) : null}

      {mainDeal?.cats ? (
        <section className="panel">
          <h2>Cats</h2>
          <p className="result-stamp">{mainDeal.cats.name}</p>
          <p className="chance-note">
            There was a {mainDeal.cats.chancePercent}% chance of{' '}
            {mainDeal.cats.name}.
          </p>
        </section>
      ) : null}

      <section className="panel">
        <h2>Investigators</h2>
        <div className="summary-players">
          {slots.map((slot, index) => {
            const character = getCharacter(investigatorPicks[slot.id] ?? '')
            const skill = abilityById(
              abilityPicks[slot.id]?.skillId,
              GENERAL_SKILLS,
            )
            const attribute = abilityById(
              abilityPicks[slot.id]?.attributeId,
              ATTRIBUTES,
            )

            return (
              <article className="summary-player" key={slot.id}>
                <h3>Player {index + 1}</h3>
                {character ? (
                  <>
                    <Portrait
                      name={character.name}
                      portrait={character.portrait}
                    />
                    <p>
                      <strong>{character.name}</strong>
                      <span className="character-title">
                        {' '}
                        — {character.title}
                      </span>
                    </p>
                  </>
                ) : (
                  <p className="option-note">No investigator selected.</p>
                )}
                {skill ? (
                  <div className="summary-ability">
                    <span className="ability-name">{skill.name}</span>
                    <span className="ability-effect">
                      <IconText text={skill.effect} compact />
                    </span>
                  </div>
                ) : null}
                {attribute ? (
                  <div className="summary-ability">
                    <span className="ability-name">{attribute.name}</span>
                    <span className="ability-effect">
                      <IconText text={attribute.effect} compact />
                    </span>
                  </div>
                ) : null}
              </article>
            )
          })}
        </div>
      </section>

      {skillsDeal?.skills ? (
        <AbilityPoolList
          title="General Skills Pool"
          abilities={skillsDeal.skills}
        />
      ) : null}

      {skillsDeal?.attributes ? (
        <AbilityPoolList
          title="Attributes Pool"
          abilities={skillsDeal.attributes}
        />
      ) : null}

      {suspectsDeal ? (
        <>
          <section className="panel">
            <h2>1st Class Suspects</h2>
            <div className="suspect-row">
              {suspectsDeal.firstClass.map((seat) => (
                <SuspectBox key={seat.characterId} seat={seat} />
              ))}
            </div>
          </section>
          <section className="panel">
            <h2>2nd Class Suspects</h2>
            <div className="suspect-row">
              {suspectsDeal.secondClass.map((seat) => (
                <SuspectBox key={seat.characterId} seat={seat} />
              ))}
            </div>
          </section>
        </>
      ) : null}

      <div className="actions">
        <button type="button" className="back" onClick={onBack}>
          Back
        </button>
        <button
          type="button"
          className="restart"
          onClick={() => {
            if (
              window.confirm(
                'Restart from the beginning? This will return you to the setup page.',
              )
            ) {
              onRestart()
            }
          }}
        >
          Restart
        </button>
      </div>
    </div>
  )
}
