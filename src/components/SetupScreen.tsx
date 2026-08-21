import { Checkbox } from './Checkbox'
import { MonsterColorSelect } from './MonsterColorSelect'
import { OptionRow } from './OptionRow'
import { Select } from './Select'
import {
  CATS_WEIGHT_OPTIONS,
  catsAvailable,
  clampChoices,
  maxChoicesPerPlayer,
  monstersAvailable,
  passengerDeckAvailable,
  totalInvestigators,
  vampireAvailable,
  vampireWeightAvailable,
  VAMPIRE_WEIGHT_OPTIONS,
} from '../logic'
import type { PlayerCount, SetupState, WeightMode } from '../types'

type SetupScreenProps = {
  setup: SetupState
  onChange: (next: SetupState) => void
  onNext: () => void
}

export function SetupScreen({ setup, onChange, onNext }: SetupScreenProps) {
  const { expansions, playerCount, randomize } = setup
  const investigatorPool = totalInvestigators(expansions)
  const maxChoices = maxChoicesPerPlayer(expansions, playerCount)
  const vampireEnabled = vampireAvailable(expansions)
  const vampireWeightEnabled = vampireWeightAvailable(expansions)
  const monstersEnabled = monstersAvailable(expansions)
  const passengerEnabled = passengerDeckAvailable(expansions)
  const catsEnabled = catsAvailable(expansions)

  function patchExpansions(partial: Partial<SetupState['expansions']>) {
    const nextExpansions = { ...expansions, ...partial }
    onChange({
      ...setup,
      expansions: nextExpansions,
      randomize: {
        ...randomize,
        investigatorChoicesPerPlayer: clampChoices(
          randomize.investigatorChoicesPerPlayer,
          nextExpansions,
          playerCount,
        ),
      },
    })
  }

  function patchRandomize(partial: Partial<SetupState['randomize']>) {
    onChange({
      ...setup,
      randomize: { ...randomize, ...partial },
    })
  }

  function setPlayerCount(value: PlayerCount) {
    onChange({
      ...setup,
      playerCount: value,
      randomize: {
        ...randomize,
        investigatorChoicesPerPlayer: clampChoices(
          randomize.investigatorChoicesPerPlayer,
          expansions,
          value,
        ),
      },
    })
  }

  return (
    <div className="ticket">
      <header className="masthead">
        <p className="eyebrow">Compagnie Internationale des Wagons-Lits</p>
        <h1>Horror on the Orient Express</h1>
        <p className="subtitle">Setup Randomizer</p>
      </header>

      <section className="panel">
        <h2>Expansions</h2>
        <div className="stack">
          <Checkbox
            id="exp-base"
            label="Base game"
            checked
            locked
            onChange={() => undefined}
          />
          <Checkbox
            id="exp-iu"
            label="Investigators Unveiled"
            checked={expansions.investigatorsUnveiled}
            onChange={(checked) =>
              patchExpansions({ investigatorsUnveiled: checked })
            }
          />
          <Checkbox
            id="exp-monstrosities"
            label="New Monstrosities"
            checked={expansions.newMonstrosities}
            onChange={(checked) =>
              patchExpansions({ newMonstrosities: checked })
            }
          />
          <Checkbox
            id="exp-ks"
            label="Kickstarter Exclusives"
            checked={expansions.kickstarterExclusives}
            onChange={(checked) =>
              patchExpansions({ kickstarterExclusives: checked })
            }
          />
        </div>
      </section>

      <section className="panel">
        <h2>Players</h2>
        <Select
          id="player-count"
          label="Number of players"
          value={playerCount}
          options={[1, 2, 3, 4].map((count) => ({
            value: count,
            label: String(count),
          }))}
          onChange={(value) => setPlayerCount(Number(value) as PlayerCount)}
        />
      </section>

      <section className="panel">
        <h2>Randomize</h2>
        <div className="stack options">
          <OptionRow
            id="rand-investigators"
            label="Investigators"
            checked={randomize.investigators}
            onChange={(checked) => patchRandomize({ investigators: checked })}
            extras={
              <Select
                id="investigator-choices"
                label={
                  playerCount === 1
                    ? 'Choices per played character'
                    : 'Choices per player'
                }
                value={randomize.investigatorChoicesPerPlayer}
                options={Array.from({ length: maxChoices }, (_, index) => ({
                  value: index + 1,
                  label: String(index + 1),
                }))}
                onChange={(value) =>
                  patchRandomize({
                    investigatorChoicesPerPlayer: Number(value),
                  })
                }
              />
            }
            grouped={
              <>
                <p className="pool-note in-group">
                  Investigator pool: {investigatorPool} (max {maxChoices}{' '}
                  {playerCount === 1 ? 'per played character' : 'per player'})
                </p>
                <Checkbox
                  id="rand-general-skills"
                  label="Randomize general skill choices"
                  checked={randomize.generalSkillChoices}
                  onChange={(checked) =>
                    patchRandomize({ generalSkillChoices: checked })
                  }
                />
                <Checkbox
                  id="rand-attributes"
                  label="Randomize attribute choices"
                  checked={randomize.attributeChoices}
                  onChange={(checked) =>
                    patchRandomize({ attributeChoices: checked })
                  }
                />
              </>
            }
          />

          <OptionRow
            id="rand-suspects"
            label="Suspects"
            checked={randomize.suspects}
            note="These will be selected after you pick your investigator."
            onChange={(checked) => patchRandomize({ suspects: checked })}
            extras={
              <>
                <Checkbox
                  id="rand-suspect-class"
                  label="Randomize who is first vs second class"
                  checked={randomize.suspectClass}
                  onChange={(checked) =>
                    patchRandomize({ suspectClass: checked })
                  }
                />
                <Checkbox
                  id="rand-suspect-color"
                  label="Randomize who is what color"
                  checked={randomize.suspectClass && randomize.suspectColor}
                  disabled={!randomize.suspectClass}
                  onChange={(checked) =>
                    patchRandomize({ suspectColor: checked })
                  }
                />
                <Checkbox
                  id="rand-suspect-desire"
                  label="Randomize who starts with their desire revealed"
                  checked={
                    randomize.suspectClass &&
                    randomize.suspectColor &&
                    randomize.suspectDesireRevealed
                  }
                  disabled={
                    !randomize.suspectClass || !randomize.suspectColor
                  }
                  onChange={(checked) =>
                    patchRandomize({
                      suspectDesireRevealed: checked,
                    })
                  }
                />
                <Checkbox
                  id="rand-suspect-location"
                  label="Randomize starting location of suspects"
                  checked={randomize.suspectStartingLocation !== false}
                  onChange={(checked) =>
                    patchRandomize({ suspectStartingLocation: checked })
                  }
                />
              </>
            }
          />

          <OptionRow
            id="rand-monsters"
            label="Monsters"
            checked={randomize.monsters}
            disabled={!monstersEnabled}
            disabledReason="Requires New Monstrosities."
            onChange={(checked) => patchRandomize({ monsters: checked })}
            extras={
              <MonsterColorSelect
                value={randomize.monsterColors}
                onChange={(monsterColors) => patchRandomize({ monsterColors })}
              />
            }
          />

          <OptionRow
            id="rand-rituals"
            label="Rituals"
            checked={randomize.rituals}
            onChange={(checked) => patchRandomize({ rituals: checked })}
          />

          <OptionRow
            id="rand-vampire"
            label="Vampire"
            checked={randomize.vampire}
            disabled={!vampireEnabled}
            disabledReason="Requires Kickstarter Exclusives or New Monstrosities."
            onChange={(checked) => patchRandomize({ vampire: checked })}
            extras={
              vampireWeightEnabled ? (
                <Select
                  id="vampire-weight"
                  label="Randomization Weights"
                  wide
                  value={randomize.vampireWeight}
                  options={VAMPIRE_WEIGHT_OPTIONS}
                  onChange={(value) =>
                    patchRandomize({ vampireWeight: value as WeightMode })
                  }
                />
              ) : null
            }
          />

          <OptionRow
            id="rand-train"
            label="Train layout"
            checked={randomize.trainCarLayout}
            onChange={(checked) => patchRandomize({ trainCarLayout: checked })}
            extras={
              <Checkbox
                id="rand-activated-cars"
                label="Randomize which cars are activated"
                checked={randomize.randomizeActivatedCars}
                onChange={(checked) =>
                  patchRandomize({ randomizeActivatedCars: checked })
                }
              />
            }
          />

          <OptionRow
            id="rand-journey"
            label="Journey layout"
            checked={randomize.journeyLayout}
            onChange={(checked) => patchRandomize({ journeyLayout: checked })}
            extras={
              <Checkbox
                id="rand-starting-city"
                label="Randomize starting city"
                checked={randomize.randomizeStartingCity}
                onChange={(checked) =>
                  patchRandomize({ randomizeStartingCity: checked })
                }
              />
            }
          />

          <OptionRow
            id="rand-passenger"
            label="Passenger deck"
            checked={randomize.passengerDeck}
            disabled={!passengerEnabled}
            disabledReason="Requires Investigators Unveiled."
            onChange={(checked) => patchRandomize({ passengerDeck: checked })}
          />

          <OptionRow
            id="rand-cats"
            label="Cats"
            checked={randomize.cats}
            disabled={!catsEnabled}
            disabledReason="Requires Investigators Unveiled."
            onChange={(checked) => patchRandomize({ cats: checked })}
            extras={
              <Select
                id="cats-weight"
                label="Randomization Weights"
                wide
                value={randomize.catsWeight}
                options={CATS_WEIGHT_OPTIONS}
                onChange={(value) =>
                  patchRandomize({ catsWeight: value as WeightMode })
                }
              />
            }
          />
        </div>
      </section>

      <div className="actions">
        <button type="button" className="next" onClick={onNext}>
          Randomize!
        </button>
      </div>
    </div>
  )
}
