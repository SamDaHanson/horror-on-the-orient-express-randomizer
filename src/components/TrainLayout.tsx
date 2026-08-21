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
  const showEffect = car.active && Boolean(car.effect)

  return (
    <div
      className={`car-box ${car.active ? 'is-active' : ''} ${car.isLocomotive ? 'is-locomotive' : ''}`}
    >
      {car.active ? <span className="car-active-mark">Active</span> : null}
      <span className="car-name">{car.name}</span>
      {occupant ? <span className="car-occupant">{occupant}</span> : null}
      {showEffect ? (
        <span className="car-effect">
          <IconText text={car.effect} />
        </span>
      ) : null}
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
