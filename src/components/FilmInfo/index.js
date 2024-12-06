import { TOKEN, DATABASE_ID } from "../../../config";
import Link from "next/link";
import { getPublishedImageUrl, convertDurationToMinSec, formatStaffList } from "../FilmInfoUtils";
import SkeletonUi from "../SkeletonUi";

export const revalidate = 0; // 매 요청 시 데이터 새로고침

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
    //   // status: {
    //   //   equals: "Live", // "Live" 상태만 필터링
    //   // },
    // },
  }),
};

export default async function FilmInfo({ id }) {
  const i = id - 1;

  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    { ...options, cache: "no-store" }
  );

  if (!res.ok) {
    console.error(`Failed to fetch data for ID: ${id}`);
    return <div>Failed to load movie data.</div>;
  }

  const data = await res.json();

  if (i < 0 || i >= data.results.length) {
    console.error(`Invalid ID: ${id}`);
    return <div>Movie not found.</div>;
  }

  const title = data.results[i].properties.Title?.title?.[0]?.plain_text;
  const director = data.results[i].properties.director?.multi_select?.[0]?.name;
  const duration = data.results[i].properties.duration?.number;
  const synopsis = data.results[i].properties.synopsis.rich_text[0]?.plain_text;
  const famousLine =
    data.results[i].properties.famousLine.rich_text[0]?.plain_text;
  const casts = data.results[i].properties.cast.multi_select;
  const staffs = data.results[i].properties.staff.multi_select;
  const no = data.results[i].properties["\bno"]?.number;
  const tags = data.results[i].properties.tags.multi_select;

  const defaultCoverUrl = "/img/still/logo.png";

  const notionCoverUrl =
    data.results[i].cover?.external?.url || data.results[i].cover?.file?.url;

  const coverUrl = notionCoverUrl
    ? getPublishedImageUrl(notionCoverUrl, data.id)
    : defaultCoverUrl;

  const formattedStaffList = formatStaffList(staffs);

  return (
    <div>
      <div>
        <SkeletonUi src={notionCoverUrl} alt={title} />
      </div>
      <section className="todays">
        <div className="filmpage">
          <div className="infobox">
            <h3 className="title">{title}</h3>
            {director} 감독 |{" "}
            {duration ? convertDurationToMinSec(duration) : "00분 00초"}
            <span className="tagholder">
              {tags.map((tag) => (
                <Link
                  href={`/program/tag/${tag.name}`}
                  key={tag.name}
                  className="tag"
                >
                  {tag.name}{" "}
                </Link>
              ))}
            </span>
          </div>

          <p className="desc">
            <span className="quote">
              <span className="quoteglyps">“</span>
              <span> {famousLine} </span>
              <span className="quoteglyps">”</span>
            </span>
            {synopsis}
          </p>

          <div className="caststaff">
            <div className="castbox">
              <h4>CAST</h4>
              <pre>
                {casts.map((cast, id) => (
                  <div key={id}>{cast.name}</div>
                ))}
              </pre>
            </div>
            <div className="staffbox">
              <h4>STAFF</h4>
              <pre>
                {formattedStaffList.map((staffInfo, index) => (
                  <div key={index}>{staffInfo}</div>
                ))}
              </pre>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}