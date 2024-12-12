import { TOKEN, DATABASE_ID } from "../../../../config";
import Link from "next/link";
import "./[tag]/style.css";

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

export default async function FlowingTag({ params }) {
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

  //한줄 - 모든 테그 긁어와서 흐르는 에니메이션
  const TagContainer = ({ direction, style }) => (
    <div 
      className={`tagTitleContainer flow flow${direction}`}
      style={style}
    >
      {[...Array(2)].flatMap(() => 
        [...new Set(
          movies.flatMap((movie) =>
            movie.properties.tags.multi_select.map((tag) => tag.name)
          )
        )].map((tagName, index) => (
          <Link
            key={`${index}-${Math.random()}`}  // 고유한 key 값을 위해 수정
            href={`/program/tag/${encodeURIComponent(tagName)}`}
            className={`BigTag ${Math.random() < 0.25 ? 'GlowingBg' : ''}`}
            style={{ animationDelay: `${Math.random() * 5}s` }}
          >
            <span className="blendscreen">
              <span className="hashtag">#</span>
              {tagName}
            </span>
          </Link>
        ))
      )}
    </div>
  );

  return (
    <section className="todays programinfo fixed">
      {[...Array(7)].map((_, index) => (
        <TagContainer 
          key={index} 
          direction={index % 2 === 0 ? 'left' : 'right'} 
          style={{ animationDelay: `${Math.random() * -15}s` }}
        />
      ))}
    </section>
  );
}