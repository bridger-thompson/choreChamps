import { useHealthCheckQuery } from "./choreHooks"

export const Chores = () => {
  const healthQuery = useHealthCheckQuery();
  console.log(healthQuery.data)
  return (
    <div className="container text-center">
      <h1>Chores</h1>
    </div>
  )
}
