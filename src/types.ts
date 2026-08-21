export type PlayerCount = 1 | 2 | 3 | 4

export type MonsterColor = 'red' | 'green' | 'blue'

export type WeightMode = 'weighted' | 'even'

export type Expansions = {
  investigatorsUnveiled: boolean
  newMonstrosities: boolean
  kickstarterExclusives: boolean
}

export type RandomizeOptions = {
  investigators: boolean
  investigatorChoicesPerPlayer: number
  generalSkillChoices: boolean
  attributeChoices: boolean
  suspects: boolean
  suspectClass: boolean
  suspectColor: boolean
  suspectDesireRevealed: boolean
  suspectStartingLocation: boolean
  monsters: boolean
  monsterColors: Record<MonsterColor, boolean>
  rituals: boolean
  vampire: boolean
  vampireWeight: WeightMode
  trainCarLayout: boolean
  randomizeActivatedCars: boolean
  journeyLayout: boolean
  randomizeStartingCity: boolean
  passengerDeck: boolean
  cats: boolean
  catsWeight: WeightMode
}

export type SetupState = {
  expansions: Expansions
  playerCount: PlayerCount
  randomize: RandomizeOptions
}

export type WizardStep =
  | 'setup'
  | 'mainSetup'
  | 'investigators'
  | 'skills'
  | 'suspects'
  | 'summary'
