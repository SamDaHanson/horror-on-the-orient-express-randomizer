export type TrainCarDef = {
  id: string
  name: string
  effect: string
  isLocomotive?: boolean
}

export const LOCOMOTIVE: TrainCarDef = {
  id: 'locomotive',
  name: 'Locomotive',
  effect: 'Train Speed +1.\nAdd <green train token>. All <monsters> ←',
  isLocomotive: true,
}

export const LAYOUT_CARS: TrainCarDef[] = [
  {
    id: 'first-class-sleeping',
    name: '1st Class Sleeping',
    effect: 'If <no item>, Gain <an item>.',
  },
  {
    id: 'second-class-sleeping',
    name: '2nd Class Sleeping',
    effect: 'Restore 3 <stamina>.',
  },
  {
    id: 'fourgon',
    name: 'Fourgon',
    effect: 'If <no suspect>: Reveal <destination clue>.',
  },
  {
    id: 'dining',
    name: 'Dining',
    effect: 'Gain <favor> with <suspect> here.',
  },
  {
    id: 'sanctuary',
    name: 'Sanctuary',
    effect: 'Gather 1 <passenger>/<suspect>/<investigator>',
  },
  {
    id: 'salon',
    name: 'Salon',
    effect:
      '<shocked passenger>/<angry passenger> → <calm passenger>',
  },
]

export const STARTING_CITIES = [
  'ZAGREB',
  'TRIESTE',
  'NIŠ',
  'VENICE',
  'SIMPLON TUNNEL',
  'LAUSANNE',
] as const

export const JOURNEY_LANDSCAPES = [
  'THE GRAND JOURNEY',
  'CURSED RAILS',
  'VAST UNKNOWN',
  'FURY UNLEASHED',
  'END OF THE LINE',
  'HOLLOW ROUTE',
] as const

export type StartingCity = (typeof STARTING_CITIES)[number]
export type JourneyLandscape = (typeof JOURNEY_LANDSCAPES)[number]

export type MonsterDef = {
  id: string
  name: string
  source: 'base' | 'new'
}

export const MONSTERS_BY_COLOR: Record<
  'green' | 'blue' | 'red',
  MonsterDef[]
> = {
  green: [
    { id: 'aranok', name: 'ARANOK', source: 'base' },
    { id: 'dronzur', name: 'DRONZUR', source: 'new' },
  ],
  blue: [
    { id: 'absorber', name: 'ABSORBER', source: 'base' },
    { id: 'veakhira', name: 'VEAKHIRA', source: 'new' },
  ],
  red: [
    { id: 'scissuror', name: 'SCISSUROR', source: 'base' },
    { id: 'anthramor', name: 'ANTHRAMOR', source: 'new' },
  ],
}

export const MONSTER_COLOR_ORDER = ['red', 'green', 'blue'] as const

export const RITUALS = [
  'BLACK MAGIC',
  'FADE TO BLACK',
  'CRAZY TRAIN',
  'FOR WHOM THE BELL TOLLS',
  'PESTILENCE AND PLAGUE',
] as const

export type Ritual = (typeof RITUALS)[number]

export const PASSENGER_DECKS = [
  'Base Game Deck',
  'Alternative Deck',
] as const

export type PassengerDeck = (typeof PASSENGER_DECKS)[number]
