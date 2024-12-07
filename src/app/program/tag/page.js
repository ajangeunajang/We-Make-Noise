import { TOKEN, DATABASE_ID } from "../../../../config";
import Link from "next/link";
import "./[tag]/style.css";
import FlowingTag from "@/components/FlowingTag";

export const revalidate = 0; // 데이터가 매 요청 시 새로고침되도록 설정

const options = {
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
    // filter: {
    //   property: "\b상태", // Notion 속성 이름
    //   status: {
    //     equals: "Live", // "Live" 상태만 필터링
    //   },
    // },
  }),
};

export default async function TaggedMoviesPage({ params }) {
  const { tag } = params;
  const decodedTag = tag ? decodeURIComponent(tag) : "";
  let movies = [];

  try {
    const res = await fetch(
      `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
      { ...options, cache: "no-store" }
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
      <div className="tagTitleContainer flow flowleft">
        {/* 
      1. movies.flatMap()을 사용하 모든 영화를 순회
      2. flatMap()으로 각 영화의 태그 배열을 하나의 배열로 평탄화
      3. new Set()으로 중복 태그를 제거
      4. 스프레드 산자(...)로 Set을 다시 배열로 변환
      5. 최종 태그 배열을 map으로 순회하며 링크 생성
    */}
        {[
          ...new Set(
            movies.flatMap((movie) =>
              movie.properties.tags.multi_select.map((tag) => tag.name)
            )
          ),
        ].map((tagName, index) => (
          <Link
            key={index}
            href={`/program/tag/${encodeURIComponent(tagName)}`}
            className="glowingTag"
          >
            <span className="blendscreen">
              <span className="hashtag">#</span>
              {tagName}
            </span>
          </Link>
        ))}
      </div>
      <div className="tagTitleContainer flow flowright">
        {[
          ...new Set(
            movies.flatMap((movie) =>
              movie.properties.tags.multi_select.map((tag) => tag.name)
            )
          ),
        ].map((tagName, index) => (
          <Link
            key={index}
            href={`/program/tag/${encodeURIComponent(tagName)}`}
            className="glowingTag"
          >
            <span className="blendscreen">
              <span className="hashtag">#</span>
              {tagName}
            </span>
          </Link>
        ))}
      </div>
      <div className="tagTitleContainer flow flowleft">
        {[
          ...new Set(
            movies.flatMap((movie) =>
              movie.properties.tags.multi_select.map((tag) => tag.name)
            )
          ),
        ].map((tagName, index) => (
          <Link
            key={index}
            href={`/program/tag/${encodeURIComponent(tagName)}`}
            className="glowingTag"
          >
            <span className="blendscreen">
              <span className="hashtag">#</span>
              {tagName}
            </span>
          </Link>
        ))}
      </div>
      <div className="tagTitleContainer flow flowright">
        {[
          ...new Set(
            movies.flatMap((movie) =>
              movie.properties.tags.multi_select.map((tag) => tag.name)
            )
          ),
        ].map((tagName, index) => (
          <Link
            key={index}
            href={`/program/tag/${encodeURIComponent(tagName)}`}
            className="glowingTag"
          >
            <span className="blendscreen">
              <span className="hashtag">#</span>
              {tagName}
            </span>
          </Link>
        ))}
      </div>
      <div className="tagTitleContainer flow flowleft">
        {[
          ...new Set(
            movies.flatMap((movie) =>
              movie.properties.tags.multi_select.map((tag) => tag.name)
            )
          ),
        ].map((tagName, index) => (
          <Link
            key={index}
            href={`/program/tag/${encodeURIComponent(tagName)}`}
            className="glowingTag"
          >
            <span className="blendscreen">
              <span className="hashtag">#</span>
              {tagName}
            </span>
          </Link>
        ))}
      </div>
      <div className="tagTitleContainer flow flowright">
        {[
          ...new Set(
            movies.flatMap((movie) =>
              movie.properties.tags.multi_select.map((tag) => tag.name)
            )
          ),
        ].map((tagName, index) => (
          <Link
            key={index}
            href={`/program/tag/${encodeURIComponent(tagName)}`}
            className="glowingTag"
          >
            <span className="blendscreen">
              <span className="hashtag">#</span>
              {tagName}
            </span>
          </Link>
        ))}
      </div>
      <div className="tagTitleContainer flow flowleft">
        {[
          ...new Set(
            movies.flatMap((movie) =>
              movie.properties.tags.multi_select.map((tag) => tag.name)
            )
          ),
        ].map((tagName, index) => (
          <Link
            key={index}
            href={`/program/tag/${encodeURIComponent(tagName)}`}
            className="glowingTag"
          >
            <span className="blendscreen">
              <span className="hashtag">#</span>
              {tagName}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}