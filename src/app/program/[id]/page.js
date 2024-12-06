import FilmInfo from "@/components/FilmInfo";

export default async function Movie({ params }) {
  return <FilmInfo id={params.id} />;
}
