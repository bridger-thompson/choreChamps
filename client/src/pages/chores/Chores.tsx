import { useGetChoresQuery } from "./choreHooks"

export const Chores = () => {
  const choresQuery = useGetChoresQuery();
  console.log(choresQuery.data)
  return (
    <div className="container text-center">
      <h1>Chores</h1>
      {choresQuery.data?.map((c) => (
        <div key={c.id}>
          <div>{c.name}</div>
          <div>{c.description}</div>
          <div>{c.points}</div>
          <div>{c.daysOfWeek}</div>
        </div>
      ))}
    </div>
  )
}
