import { DATABASE_ID, options } from "../../../config";
import Thumb from "@/components/Timetable/thumb";

export const revalidate = 0; // Refresh data on every request


export default async function Program() {
  
  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    {
      ...options,
      cache: "no-store", // Add the cache directive here
    }
  );
  const projects = await res.json();

  return (
    <section className="todays programinfo">
      <ul className="filmlist">
        {projects.results.map((movie) => (
          <Thumb key={movie.id} data={movie}/>
        ))}
      </ul>
    </section>
  );
}