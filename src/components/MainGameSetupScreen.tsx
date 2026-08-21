import { TrainLayout } from './TrainLayout'
import type { MainSetupDeal } from '../dealMainSetup'

type MainGameSetupScreenProps = {
  deal: MainSetupDeal
  onBack: () => void
  onReroll: () => void
  onContinue: () => void
}

export function MainGameSetupScreen({
  deal,
  onBack,
  onReroll,
  onContinue,
}: MainGameSetupScreenProps) {
  return (
    <div className="ticket">
      <header className="masthead">
        <p className="eyebrow">Compagnie Internationale des Wagons-Lits</p>
        <h1>Main Game Setup</h1>
        <p className="subtitle">Board and journey</p>
      </header>

      {deal.cars ? (
        <section className="panel">
          <h2>Car layout</h2>
          <TrainLayout cars={deal.cars} />
        </section>
      ) : null}

      {deal.startingCity ? (
        <section className="panel">
          <h2>Starting city</h2>
          <p className="result-stamp">{deal.startingCity}</p>
        </section>
      ) : null}

      {deal.journey ? (
        <section className="panel">
          <h2>Journey landscape</h2>
          <p className="result-stamp">{deal.journey}</p>
        </section>
      ) : null}

      {deal.monsters && deal.monsters.length > 0 ? (
        <section className="panel">
          <h2>Monsters</h2>
          <div
            className="monster-row"
            style={{
              gridTemplateColumns: `repeat(${deal.monsters.length}, minmax(0, 1fr))`,
            }}
          >
            {deal.monsters.map((monster) => (
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

      {deal.ritual ? (
        <section className="panel">
          <h2>Ritual</h2>
          <p className="result-stamp">{deal.ritual}</p>
        </section>
      ) : null}

      {deal.passengerDeck ? (
        <section className="panel">
          <h2>Passenger Deck</h2>
          <p className="result-stamp">{deal.passengerDeck}</p>
        </section>
      ) : null}

      {deal.vampire ? (
        <section className="panel">
          <h2>Vampire</h2>
          <p className="result-stamp">{deal.vampire.name}</p>
          <p className="chance-note">
            There was a {deal.vampire.chancePercent}% chance of{' '}
            {deal.vampire.name}.
          </p>
        </section>
      ) : null}

      {deal.cats ? (
        <section className="panel">
          <h2>Cats</h2>
          <p className="result-stamp">{deal.cats.name}</p>
          <p className="chance-note">
            There was a {deal.cats.chancePercent}% chance of {deal.cats.name}.
          </p>
        </section>
      ) : null}

      <div className="actions">
        <button type="button" className="back" onClick={onBack}>
          Back
        </button>
        <button type="button" className="back" onClick={onReroll}>
          Reroll
        </button>
        <button type="button" className="next" onClick={onContinue}>
          Continue
        </button>
      </div>
    </div>
  )
}
