import { TOKEN, DATABASE_ID } from "../../../config";
import Link from "next/link";

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

  
export default async function FlowingTag(props){
       
    


    return <div className={`tagTitleContainer ${flowDirection}`}>
    {/* 
      1. movies.flatMap()을 사용하 모든 영화를 순회
      2. flatMap()으로 각 영화의 태그 배열을 하나의 배열로 평탄화
      3. new Set()으로 중복 태그를 제거
      4. 스프레드 산자(...)로 Set을 다시 배열로 변환
      5. 최종 태그 배열을 map으로 순회하며 링크 생성
    */}
    {[...new Set(
      movies.flatMap(movie => 
        movie.properties.tags.multi_select.map(tag => tag.name)
      )
    )].map((tagName, index) => (
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
  </div>;
}