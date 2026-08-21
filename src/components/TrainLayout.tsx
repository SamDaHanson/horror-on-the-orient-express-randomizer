import { IconText } from './IconText'
import type { PlacedCar } from '../dealMainSetup'

type TrainLayoutProps = {
  cars: PlacedCar[]
  occupants?: Record<string, string>
}

function CarBox({
  car,
  occupant,
}: {
  car: PlacedCar
  occupant?: string
}) {
  return (
    <div
      className={`car-box ${car.active || car.isLocomotive ? 'is-active' : ''}`}
    >
      <span className={`car-active-mark ${car.active ? '' : 'is-hidden'}`}>
        Active
      </span>
      <span className="car-name">{car.name}</span>
      <span className="car-occupant">{occupant ?? '\u00a0'}</span>
      <span className="car-effect">
        <IconText text={car.effect} />
      </span>
    </div>
  )
}

export function TrainLayout({ cars, occupants }: TrainLayoutProps) {
  return (
    <div className="train-scroll">
      <div className="train-line">
        {cars.map((car, index) => (
          <div className="car-slot" key={car.id}>
            {index > 0 ? <span className="car-coupler" aria-hidden="true" /> : null}
            <CarBox car={car} occupant={occupants?.[car.name]} />
          </div>
        ))}
      </div>
    </div>
  )
}
