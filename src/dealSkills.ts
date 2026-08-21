import { ATTRIBUTES, GENERAL_SKILLS, type Ability } from './data/abilities'
import { shuffle } from './random'
import type { SetupState } from './types'

export const ABILITY_POOL_SIZE = 6

export type AbilityPick = {
  skillId?: string
  attributeId?: string
}

export type SkillsDeal = {
  skills: Ability[] | null
  attributes: Ability[] | null
}

export function shouldShowSkills(setup: SetupState): boolean {
  return setup.randomize.generalSkillChoices || setup.randomize.attributeChoices
}

export function dealSkills(setup: SetupState): SkillsDeal {
  return {
    skills: setup.randomize.generalSkillChoices
      ? shuffle(GENERAL_SKILLS).slice(0, ABILITY_POOL_SIZE)
      : null,
    attributes: setup.randomize.attributeChoices
      ? shuffle(ATTRIBUTES).slice(0, ABILITY_POOL_SIZE)
      : null,
  }
}
