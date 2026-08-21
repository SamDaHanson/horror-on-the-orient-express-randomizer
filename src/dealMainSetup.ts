import {
  JOURNEY_LANDSCAPES,
  LAYOUT_CARS,
  LOCOMOTIVE,
  MONSTER_COLOR_ORDER,
  MONSTERS_BY_COLOR,
  PASSENGER_DECKS,
  RITUALS,
  STARTING_CITIES,
  type JourneyLandscape,
  type MonsterDef,
  type PassengerDeck,
  type Ritual,
  type StartingCity,
  type TrainCarDef,
} from './data/board'
import {
  catsAvailable,
  monstersAvailable,
  passengerDeckAvailable,
  vampireAvailable,
  vampireWeightAvailable,
} from './logic'
import { pickFromChances, pickOne, shuffle, type ChanceOption } from './random'
import type { MonsterColor, SetupState } from './types'

export type PlacedCar = TrainCarDef & {
  active: boolean
}

export type RolledMonster = MonsterDef & {
  color: MonsterColor
}

export type ChanceResult = {
  name: string
  chancePercent: number
}

export type MainSetupDeal = {
  cars: PlacedCar[] | null
  startingCity: StartingCity | null
  journey: JourneyLandscape | null
  monsters: RolledMonster[] | null
  ritual: Ritual | null
  passengerDeck: PassengerDeck | null
  vampire: ChanceResult | null
  cats: ChanceResult | null
}

export function shouldShowMainSetup(setup: SetupState): boolean {
  return (
    setup.randomize.trainCarLayout ||
    setup.randomize.journeyLayout ||
    (setup.randomize.monsters && monstersAvailable(setup.expansions)) ||
    setup.randomize.rituals ||
    (setup.randomize.passengerDeck &&
      passengerDeckAvailable(setup.expansions)) ||
    (setup.randomize.vampire && vampireAvailable(setup.expansions)) ||
    (setup.randomize.cats && catsAvailable(setup.expansions))
  )
}

function vampireOptions(setup: SetupState): ChanceOption<string>[] {
  if (vampireWeightAvailable(setup.expansions)) {
    if (setup.randomize.vampireWeight === 'even') {
      return [
        { value: 'Standard Vampire', chancePercent: 33 },
        { value: 'Alternative Vampire', chancePercent: 33 },
        { value: 'Alternative Vampiress', chancePercent: 33 },
      ]
    }

    return [
      { value: 'Standard Vampire', chancePercent: 50 },
      { value: 'Alternative Vampire', chancePercent: 25 },
      { value: 'Alternative Vampiress', chancePercent: 25 },
    ]
  }

  if (!setup.expansions.kickstarterExclusives) {
    return [
      { value: 'Standard Vampire', chancePercent: 50 },
      { value: 'Alternative Vampire', chancePercent: 50 },
    ]
  }

  return [
    { value: 'Standard Vampire', chancePercent: 50 },
    { value: 'Alternative Vampiress', chancePercent: 50 },
  ]
}

function catsOptions(setup: SetupState): ChanceOption<string>[] {
  if (setup.randomize.catsWeight === 'even') {
    return [
      { value: 'No Cats', chancePercent: 33 },
      { value: 'Cat of Saturn', chancePercent: 33 },
      { value: 'Cat of Ulthar', chancePercent: 33 },
    ]
  }

  return [
    { value: 'No Cats', chancePercent: 50 },
    { value: 'Cat of Saturn', chancePercent: 25 },
    { value: 'Cat of Ulthar', chancePercent: 25 },
  ]
}

function toChanceResult(option: ChanceOption<string>): ChanceResult {
  return { name: option.value, chancePercent: option.chancePercent }
}

export function dealMainSetup(setup: SetupState): MainSetupDeal {
  const { randomize, expansions } = setup

  let cars: PlacedCar[] | null = null
  if (randomize.trainCarLayout) {
    const shuffledCars = shuffle(LAYOUT_CARS)
    const activeIds = new Set<string>()
    if (randomize.randomizeActivatedCars) {
      for (const car of shuffle(shuffledCars).slice(0, 3)) {
        activeIds.add(car.id)
      }
    }

    cars = [
      ...shuffledCars.map((car) => ({
        ...car,
        active: activeIds.has(car.id),
      })),
      { ...LOCOMOTIVE, active: true },
    ]
  }

  const startingCity =
    randomize.journeyLayout && randomize.randomizeStartingCity
      ? pickOne(STARTING_CITIES)
      : null

  const journey = randomize.journeyLayout
    ? pickOne(JOURNEY_LANDSCAPES)
    : null

  let monsters: RolledMonster[] | null = null
  if (randomize.monsters && monstersAvailable(expansions)) {
    monsters = MONSTER_COLOR_ORDER.filter(
      (color) => randomize.monsterColors[color],
    ).map((color) => ({
      ...pickOne(MONSTERS_BY_COLOR[color]),
      color,
    }))
  }

  const ritual = randomize.rituals ? pickOne(RITUALS) : null

  const passengerDeck =
    randomize.passengerDeck && passengerDeckAvailable(expansions)
      ? pickOne(PASSENGER_DECKS)
      : null

  const vampire =
    randomize.vampire && vampireAvailable(expansions)
      ? toChanceResult(pickFromChances(vampireOptions(setup)))
      : null

  const cats =
    randomize.cats && catsAvailable(expansions)
      ? toChanceResult(pickFromChances(catsOptions(setup)))
      : null

  return {
    cars,
    startingCity,
    journey,
    monsters,
    ritual,
    passengerDeck,
    vampire,
    cats,
  }
}
