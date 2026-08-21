import type { Expansions } from '../types'

export type ContentSource =
  | 'base'
  | 'investigatorsUnveiled'
  | 'kickstarterExclusives'

export type Character = {
  id: string
  name: string
  title: string
  /** Set a public image path later; cards already render a portrait frame. */
  portrait: string | null
  investigatorFrom: ContentSource
  suspectFrom: ContentSource
}

export const CHARACTERS: Character[] = [
  {
    id: 'lucy-lincoln',
    name: 'Lucy Lincoln',
    title: 'Committed Preacher',
    portrait: null,
    investigatorFrom: 'base',
    suspectFrom: 'investigatorsUnveiled',
  },
  {
    id: 'bucky-burton',
    name: 'Bucky Burton',
    title: 'Retired Gunslinger',
    portrait: null,
    investigatorFrom: 'base',
    suspectFrom: 'investigatorsUnveiled',
  },
  {
    id: 'cedric-campton',
    name: 'Cedric Campton',
    title: 'Millionaire Heir',
    portrait: null,
    investigatorFrom: 'base',
    suspectFrom: 'investigatorsUnveiled',
  },
  {
    id: 'katharina-kristoff',
    name: 'Katharina Kristoff',
    title: 'Chemistry Professor',
    portrait: null,
    investigatorFrom: 'base',
    suspectFrom: 'investigatorsUnveiled',
  },
  {
    id: 'emilie-etienne',
    name: 'Émilie Étienne',
    title: 'Sophisticated Jazz Musician',
    portrait: null,
    investigatorFrom: 'base',
    suspectFrom: 'investigatorsUnveiled',
  },
  {
    id: 'tj-talker',
    name: 'T.J. Talker',
    title: 'Vaudeville Stuntman',
    portrait: null,
    investigatorFrom: 'base',
    suspectFrom: 'investigatorsUnveiled',
  },
  {
    id: 'jean-de-jaupas',
    name: 'Jean de Jaupas',
    title: 'Psychologist',
    portrait: null,
    investigatorFrom: 'investigatorsUnveiled',
    suspectFrom: 'base',
  },
  {
    id: 'seamus-sullivan',
    name: 'Séamus Sullivan',
    title: 'Slyboots',
    portrait: null,
    investigatorFrom: 'investigatorsUnveiled',
    suspectFrom: 'base',
  },
  {
    id: 'fran-fletcher',
    name: 'Fran Fletcher',
    title: 'Medium',
    portrait: null,
    investigatorFrom: 'investigatorsUnveiled',
    suspectFrom: 'base',
  },
  {
    id: 'pedro-palomer',
    name: 'Pedro Palomer',
    title: 'Chef de Cuisine',
    portrait: null,
    investigatorFrom: 'investigatorsUnveiled',
    suspectFrom: 'base',
  },
  {
    id: 'zeynep-zaim',
    name: 'Zeynep Zaim',
    title: 'Crime Book Writer',
    portrait: null,
    investigatorFrom: 'investigatorsUnveiled',
    suspectFrom: 'base',
  },
  {
    id: 'maria-misterio',
    name: 'María Misterio',
    title: 'Maestra',
    portrait: null,
    investigatorFrom: 'investigatorsUnveiled',
    suspectFrom: 'base',
  },
  {
    id: 'nobert-nowak',
    name: 'Nobert Nowak',
    title: 'Seasoned Diplomat',
    portrait: null,
    investigatorFrom: 'investigatorsUnveiled',
    suspectFrom: 'investigatorsUnveiled',
  },
  {
    id: 'demir-durmaz',
    name: 'Demir Durmaz',
    title: 'Luxuries Merchant',
    portrait: null,
    investigatorFrom: 'kickstarterExclusives',
    suspectFrom: 'kickstarterExclusives',
  },
]

function sourceEnabled(source: ContentSource, expansions: Expansions): boolean {
  if (source === 'base') return true
  if (source === 'investigatorsUnveiled') return expansions.investigatorsUnveiled
  return expansions.kickstarterExclusives
}

export function getInvestigators(expansions: Expansions): Character[] {
  return CHARACTERS.filter((character) =>
    sourceEnabled(character.investigatorFrom, expansions),
  )
}

export function getSuspects(expansions: Expansions): Character[] {
  return CHARACTERS.filter((character) =>
    sourceEnabled(character.suspectFrom, expansions),
  )
}

export function getCharacter(id: string): Character | undefined {
  return CHARACTERS.find((character) => character.id === id)
}
