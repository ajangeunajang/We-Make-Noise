import { TOKEN, DATABASE_ID } from "../../../../config"; 
import Thumb from "@/components/Timetable/thumb";
import Link from "next/link";

export const revalidate = 0; // 데이터가 매 요청 시 새로고침되도록 설정

const createOptions = (tag) => ({
  method: "POST",
  headers: {
    Accept: "application/json",
    "Notion-Version": "2022-06-28",
    "Content-Type": "application/json",
    Authorization: `Bearer ${TOKEN}`,
  },
  body: JSON.stringify({
    sorts: [
      {
        property: "\bno",
        direction: "ascending",
      },
    ],
    page_size: 100,
    filter: {
      property: "tags", // Notion 속성 이름
      multi_select: {
        contains: tag, // URL에서 받은 태그로 필터링
      },
    },
  }),
});

export default async function TaggedMoviesPage({ params }) {
  const { tag } = params;
  // URL인코딩된 한글 문자를 디코딩해야함
  const decodedTag = decodeURIComponent(tag);
  let movies = [];

  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      createOptions(decodedTag)
    );
    if (!res.ok)
      throw new Error(`Failed to fetch movies for tag: ${decodedTag}`);

    const data = await res.json();
    movies = data.results;
  } catch (error) {
    console.error(error);
    return <div>Failed to load movies for the selected tag.</div>;
  }

  return (
    <section className="todays programinfo">
      <div className="tagTitleContainer">
        {movies.length > 0 &&
          (() => {
            // 모든 영화의 태그들을 하나의 배열로 모음
            const allTags = movies.flatMap(
              (movie) => movie.properties.tags.multi_select
            );

            // 중복 제거
            const uniqueTags = [...new Set(allTags.map((tag) => tag.name))].map(
              (name) => allTags.find((tag) => tag.name === name)
            );

            // 현재 태그를 찾고 나머지 태그들을 랜덤하게 선택
            const currentTagObj = uniqueTags.find(tag => tag.name === decodedTag);
            const otherTags = uniqueTags
              .filter(tag => tag.name !== decodedTag)
              .sort(() => Math.random() - 0.5)
              .slice(0, 2); // 현재 태그 외에 2개만 선택

            // 현재 태그를 맨 앞에 두고 나머지 랜덤 태그들을 합침
            const finalTags = [currentTagObj, ...otherTags];

            return finalTags.map((tag) => {
              const isCurrentTag = tag.name === decodedTag;
              return (
                <Link
                  href={`/program/tag/${encodeURIComponent(tag.name)}`}
                  key={tag.id}
                  className="tagTitle"
                  id={isCurrentTag ? 'currentTag' : ''}
                >
                  <span className="blendscreen">
                    <span className="hashtag">#</span>
                  {tag.name}
                  </span>
                </Link>
              );
            });
          })()}
      </div>
      {movies.length > 0 ? (
        <ul className="filmlist mt25">
          {movies.map((movie) => (
            <Thumb key={movie.id} data={movie} />
          ))}
        </ul>
      ) : (
        <h1>No movies found for this tag.</h1>
      )}
    </section>
  );
}
