import { PersonCard } from "./PersonCard"

export const Home = () => {
  return (
    <div className="container text-center">
      <h1>Select Your Person</h1>
      <div className="row">
        <PersonCard name="John" />
        <PersonCard name="Sally" />
      </div>
    </div>
  )
}
