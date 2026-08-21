export function shuffle<T>(items: T[]): T[] {
  const next = [...items]
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1))
    const current = next[index]
    next[index] = next[swapIndex]
    next[swapIndex] = current
  }
  return next
}

export function pickOne<T>(items: readonly T[]): T {
  const [first] = shuffle([...items])
  if (first === undefined) {
    throw new Error('Cannot pick from an empty list')
  }
  return first
}

export type ChanceOption<T> = {
  value: T
  chancePercent: number
}

export function pickFromChances<T>(options: ChanceOption<T>[]): ChanceOption<T> {
  if (options.length === 0) {
    throw new Error('Cannot pick from an empty list')
  }

  const total = options.reduce((sum, option) => sum + option.chancePercent, 0)
  let roll = Math.random() * total
  const last = options[options.length - 1] as ChanceOption<T>

  for (const option of options) {
    roll -= option.chancePercent
    if (roll < 0) {
      return option
    }
  }

  return last
}
