export type Ability = {
  id: string
  name: string
  effect: string
}

export const GENERAL_SKILLS: Ability[] = [
  {
    id: 'intimidate',
    name: 'INTIMIDATE',
    effect:
      'All <angry passengers> → <calm passengers> in your <train car>.\nSend 1 <passenger>/<suspect> to another <train car>.',
  },
  {
    id: 'cthulhu-mythos',
    name: 'CTHULHU MYTHOS',
    effect: 'Discard 2 <essence> from <text essence portal>.',
  },
  {
    id: 'disguise',
    name: 'DISGUISE',
    effect:
      'In <train car> with <closed curtains>.\nChange places with <suspect> in another <train car>\nthen immediately take another Main Action.',
  },
  {
    id: 'library-use',
    name: 'LIBRARY USE',
    effect:
      'Choose one:\n- upgrade one of your used Skills.\n- gain 1 <occult token>.',
  },
  {
    id: 'charm',
    name: 'CHARM',
    effect: 'Use Skill of <suspect> with <unavailable favor>.',
  },
  {
    id: 'natural-world',
    name: 'NATURAL WORLD',
    effect:
      'In <train car> with <open curtains>.\nPlace 1 <single blocker> on each <essence portal> on a chosen\nnon-City Landscape.',
  },
  {
    id: 'fast-talk',
    name: 'FAST TALK',
    effect: 'Talk 4 with <calm passenger>/<happy passenger>',
  },
  {
    id: 'persuade',
    name: 'PERSUADE',
    effect:
      'Talk 1 with <calm passenger>/<happy passenger>/<angry passenger>.\nFailure: ignore 1 chosen <negative conversation token>.',
  },
  {
    id: 'brawl',
    name: 'BRAWL',
    effect:
      'Push +0 <monster>\nYou may spend up to 6 <stamina> to increase\nthis Push by +1 for each <stamina> spent.',
  },
  {
    id: 'first-aid',
    name: 'FIRST AID',
    effect:
      'In <train car> with no <angry passenger>.\n<injured passenger>/<shocked passenger> → <calm passenger>',
  },
  {
    id: 'firearms',
    name: 'FIREARMS',
    effect:
      'In <train car> with <open curtains>.\nStun all <monsters> by <train car> that is behind your <train car>.',
  },
  {
    id: 'psychology',
    name: 'PSYCHOLOGY',
    effect:
      'In <train car> with no more than 1 <passenger>.\n<insane passenger> → <calm passenger>.',
  },
]

export const ATTRIBUTES: Ability[] = [
  {
    id: 'lucky',
    name: 'LUCKY',
    effect: 'Add <red health event token> to the Event bag.',
  },
  {
    id: 'observant',
    name: 'OBSERVANT',
    effect: 'Reveal 2 <clues>.',
  },
  {
    id: 'conciliatory',
    name: 'CONCILIATORY',
    effect:
      '<shocked passenger>/<angry passenger> → <calm passenger>.\n<shocked passenger>/<angry passenger> → <calm passenger>.',
  },
  {
    id: 'cheerful',
    name: 'CHEERFUL',
    effect: 'Add <green health conversation token> to the Conversation bag.',
  },
  {
    id: 'eccentric',
    name: 'ECCENTRIC',
    effect: 'Gain 1 <artifact item>.',
  },
  {
    id: 'unstable',
    name: 'UNSTABLE',
    effect: 'Become <unstable>.\nGain max <sanity>.',
  },
  {
    id: 'witchy',
    name: 'WITCHY',
    effect: 'Add <green occult event token> to the Event bag.',
  },
  {
    id: 'skilled',
    name: 'SKILLED',
    effect: 'Banish your leftmost <gold skill cube>.',
  },
  {
    id: 'vigorous',
    name: 'VIGOROUS',
    effect:
      'Gain max <health> and <stamina>.\nReplace your Rest with Quality Rest.',
  },
  {
    id: 'educated',
    name: 'EDUCATED',
    effect: 'Upgrade one of your Skills.',
  },
  {
    id: 'handy',
    name: 'HANDY',
    effect: 'Enable one of the disabled <train car> Actions.',
  },
  {
    id: 'respected',
    name: 'RESPECTED',
    effect: 'Add <green favor event token> to the Event bag.',
  },
]
