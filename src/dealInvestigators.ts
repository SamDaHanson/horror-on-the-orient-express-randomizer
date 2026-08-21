import { getInvestigators } from './data/characters'
import { shuffle } from './random'
import type { SetupState } from './types'

export type InvestigatorSlot = {
  id: string
  label: string
  choiceIds: string[]
}

export function slotLabels(playerCount: SetupState['playerCount']): string[] {
  if (playerCount === 1) {
    return ['Played character 1', 'Played character 2']
  }

  return Array.from(
    { length: playerCount },
    (_, index) => `Player ${index + 1}`,
  )
}

export function dealInvestigators(setup: SetupState): InvestigatorSlot[] {
  const pool = getInvestigators(setup.expansions)
  const labels = slotLabels(setup.playerCount)
  const poolIds = pool.map((character) => character.id)

  if (!setup.randomize.investigators) {
    return labels.map((label, index) => ({
      id: `slot-${index}`,
      label,
      choiceIds: poolIds,
    }))
  }

  const shuffled = shuffle(poolIds)
  const choicesEach = setup.randomize.investigatorChoicesPerPlayer

  return labels.map((label, index) => ({
    id: `slot-${index}`,
    label,
    choiceIds: shuffled.slice(
      index * choicesEach,
      index * choicesEach + choicesEach,
    ),
  }))
}
