import { LAYOUT_CARS } from './data/board'
import { getSuspects } from './data/characters'
import { shuffle } from './random'
import type { SetupState } from './types'

export const FIRST_CLASS_COLORS = ['cyan', 'pink', 'lime'] as const
export const SECOND_CLASS_COLORS = ['brown', 'charcoal', 'grey'] as const

export type FirstClassColor = (typeof FIRST_CLASS_COLORS)[number]
export type SecondClassColor = (typeof SECOND_CLASS_COLORS)[number]
export type SuspectColor = FirstClassColor | SecondClassColor | 'neutral'

export type SuspectSeat = {
  characterId: string
  color: SuspectColor
  desireRevealed: boolean
  carName: string | null
}

export type SuspectsDeal = {
  firstClass: SuspectSeat[]
  secondClass: SuspectSeat[]
}

function seatsForClass(
  characterIds: string[],
  colors: readonly SuspectColor[],
  colored: boolean,
  desireIndex: number | null,
  carNames: Array<string | null>,
): SuspectSeat[] {
  return characterIds.map((characterId, index) => ({
    characterId,
    color: colored ? (colors[index] ?? 'neutral') : 'neutral',
    desireRevealed: desireIndex === index,
    carName: carNames[index] ?? null,
  }))
}

export function shouldShowSuspects(setup: SetupState): boolean {
  return setup.randomize.suspects
}

export function dealSuspects(
  setup: SetupState,
  investigatorIds: string[],
): SuspectsDeal {
  const taken = new Set(investigatorIds)
  const chosen = shuffle(getSuspects(setup.expansions))
    .filter((character) => !taken.has(character.id))
    .slice(0, 6)
    .map((character) => character.id)

  const firstIds = chosen.slice(0, 3)
  const secondIds = chosen.slice(3, 6)
  const randomizeClass = setup.randomize.suspectClass
  const randomizeColor = randomizeClass && setup.randomize.suspectColor
  const randomizeDesire =
    randomizeClass && setup.randomize.suspectDesireRevealed
  const carNames = setup.randomize.suspectStartingLocation !== false
    ? shuffle(LAYOUT_CARS).map((car) => car.name)
    : []

  return {
    firstClass: seatsForClass(
      firstIds,
      randomizeColor ? shuffle([...FIRST_CLASS_COLORS]) : FIRST_CLASS_COLORS,
      randomizeColor,
      randomizeDesire && firstIds.length > 0
        ? Math.floor(Math.random() * firstIds.length)
        : null,
      carNames.slice(0, firstIds.length),
    ),
    secondClass: seatsForClass(
      secondIds,
      randomizeColor ? shuffle([...SECOND_CLASS_COLORS]) : SECOND_CLASS_COLORS,
      randomizeColor,
      randomizeDesire && secondIds.length > 0
        ? Math.floor(Math.random() * secondIds.length)
        : null,
      carNames.slice(firstIds.length, firstIds.length + secondIds.length),
    ),
  }
}
