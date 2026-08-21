/** Icon keys match the <name> tokens in car text. Set `src` later for art. */
export type GameIcon = {
  id: string
  label: string
  src: string | null
}

export const GAME_ICONS: Record<string, GameIcon> = {
  'green train token': {
    id: 'green-train-token',
    label: 'Green train token',
    src: null,
  },
  monsters: { id: 'monsters', label: 'Monsters', src: null },
  'no item': { id: 'no-item', label: 'No item', src: null },
  'an item': { id: 'an-item', label: 'An item', src: null },
  stamina: { id: 'stamina', label: 'Stamina', src: null },
  'no suspect': { id: 'no-suspect', label: 'No suspect', src: null },
  'destination clue': {
    id: 'destination-clue',
    label: 'Destination clue',
    src: null,
  },
  favor: { id: 'favor', label: 'Favor', src: null },
  suspect: { id: 'suspect', label: 'Suspect', src: null },
  passenger: { id: 'passenger', label: 'Passenger', src: null },
  investigator: { id: 'investigator', label: 'Investigator', src: null },
  'shocked passenger': {
    id: 'shocked-passenger',
    label: 'Shocked passenger',
    src: null,
  },
  'angry passenger': {
    id: 'angry-passenger',
    label: 'Angry passenger',
    src: null,
  },
  'calm passenger': {
    id: 'calm-passenger',
    label: 'Calm passenger',
    src: null,
  },
  'angry passengers': {
    id: 'angry-passengers',
    label: 'Angry passengers',
    src: null,
  },
  'calm passengers': {
    id: 'calm-passengers',
    label: 'Calm passengers',
    src: null,
  },
  'train car': { id: 'train-car', label: 'Train car', src: null },
  essence: { id: 'essence', label: 'Essence', src: null },
  'text essence portal': {
    id: 'text-essence-portal',
    label: 'Text essence portal',
    src: null,
  },
  'closed curtains': {
    id: 'closed-curtains',
    label: 'Closed curtains',
    src: null,
  },
  'occult token': { id: 'occult-token', label: 'Occult token', src: null },
  'unavailable favor': {
    id: 'unavailable-favor',
    label: 'Unavailable favor',
    src: null,
  },
  'open curtains': { id: 'open-curtains', label: 'Open curtains', src: null },
  'single blocker': { id: 'single-blocker', label: 'Single blocker', src: null },
  'essence portal': { id: 'essence-portal', label: 'Essence portal', src: null },
  'happy passenger': {
    id: 'happy-passenger',
    label: 'Happy passenger',
    src: null,
  },
  'negative conversation token': {
    id: 'negative-conversation-token',
    label: 'Negative conversation token',
    src: null,
  },
  monster: { id: 'monster', label: 'Monster', src: null },
  'injured passenger': {
    id: 'injured-passenger',
    label: 'Injured passenger',
    src: null,
  },
  'insane passenger': {
    id: 'insane-passenger',
    label: 'Insane passenger',
    src: null,
  },
  'red health event token': {
    id: 'red-health-event-token',
    label: 'Red health event token',
    src: null,
  },
  clues: { id: 'clues', label: 'Clues', src: null },
  'green health conversation token': {
    id: 'green-health-conversation-token',
    label: 'Green health conversation token',
    src: null,
  },
  'artifact item': { id: 'artifact-item', label: 'Artifact item', src: null },
  unstable: { id: 'unstable', label: 'Unstable', src: null },
  sanity: { id: 'sanity', label: 'Sanity', src: null },
  'green occult event token': {
    id: 'green-occult-event-token',
    label: 'Green occult event token',
    src: null,
  },
  'gold skill cube': {
    id: 'gold-skill-cube',
    label: 'Gold skill cube',
    src: null,
  },
  health: { id: 'health', label: 'Health', src: null },
  'green favor event token': {
    id: 'green-favor-event-token',
    label: 'Green favor event token',
    src: null,
  },
}

export function getGameIcon(name: string): GameIcon {
  return (
    GAME_ICONS[name] ?? {
      id: name,
      label: name,
      src: null,
    }
  )
}
