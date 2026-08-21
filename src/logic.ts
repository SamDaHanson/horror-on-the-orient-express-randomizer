import type { Expansions, PlayerCount, SetupState, WeightMode } from './types'

export const BASE_INVESTIGATORS = 6
export const INVESTIGATORS_UNVEILED_COUNT = 7
export const KICKSTARTER_INVESTIGATORS = 1

export function totalInvestigators(expansions: Expansions): number {
  return (
    BASE_INVESTIGATORS +
    (expansions.investigatorsUnveiled ? INVESTIGATORS_UNVEILED_COUNT : 0) +
    (expansions.kickstarterExclusives ? KICKSTARTER_INVESTIGATORS : 0)
  )
}

export function characterCount(playerCount: PlayerCount): number {
  return playerCount === 1 ? 2 : playerCount
}

export function maxChoicesPerPlayer(
  expansions: Expansions,
  playerCount: PlayerCount,
): number {
  return Math.floor(totalInvestigators(expansions) / characterCount(playerCount))
}

export function vampireAvailable(expansions: Expansions): boolean {
  return expansions.newMonstrosities || expansions.kickstarterExclusives
}

export function vampireWeightAvailable(expansions: Expansions): boolean {
  return expansions.newMonstrosities && expansions.kickstarterExclusives
}

export function monstersAvailable(expansions: Expansions): boolean {
  return expansions.newMonstrosities
}

export function passengerDeckAvailable(expansions: Expansions): boolean {
  return expansions.investigatorsUnveiled
}

export function catsAvailable(expansions: Expansions): boolean {
  return expansions.investigatorsUnveiled
}

export function clampChoices(
  choices: number,
  expansions: Expansions,
  playerCount: PlayerCount,
): number {
  const max = maxChoicesPerPlayer(expansions, playerCount)
  return Math.min(Math.max(1, choices), max)
}

export function defaultChoicesPerPlayer(
  expansions: Expansions,
  playerCount: PlayerCount,
): number {
  return Math.min(2, maxChoicesPerPlayer(expansions, playerCount))
}

export const VAMPIRE_WEIGHT_OPTIONS: { value: WeightMode; label: string }[] = [
  {
    value: 'weighted',
    label:
      'Regular Vampire 50%, Alternative Vampire 25%, Vampiress Variant 25%',
  },
  {
    value: 'even',
    label:
      'Regular Vampire 33%, Alternative Vampire 33%, Vampiress Variant 33%',
  },
]

export const CATS_WEIGHT_OPTIONS: { value: WeightMode; label: string }[] = [
  {
    value: 'weighted',
    label: 'No Cats 50%, Cat of Saturn 25%, Cat of Ulthar 25%',
  },
  {
    value: 'even',
    label: 'No Cats 33%, Cat of Saturn 33%, Cat of Ulthar 33%',
  },
]

export const initialSetup: SetupState = {
  expansions: {
    investigatorsUnveiled: false,
    newMonstrosities: false,
    kickstarterExclusives: false,
  },
  playerCount: 1,
  randomize: {
    investigators: true,
    investigatorChoicesPerPlayer: defaultChoicesPerPlayer(
      {
        investigatorsUnveiled: false,
        newMonstrosities: false,
        kickstarterExclusives: false,
      },
      1,
    ),
    generalSkillChoices: true,
    attributeChoices: true,
    suspects: true,
    suspectClass: true,
    suspectColor: true,
    suspectDesireRevealed: true,
    suspectStartingLocation: true,
    monsters: true,
    monsterColors: { red: true, green: true, blue: true },
    rituals: true,
    vampire: true,
    vampireWeight: 'weighted',
    trainCarLayout: true,
    randomizeActivatedCars: true,
    journeyLayout: true,
    randomizeStartingCity: true,
    passengerDeck: true,
    cats: true,
    catsWeight: 'weighted',
  },
}
