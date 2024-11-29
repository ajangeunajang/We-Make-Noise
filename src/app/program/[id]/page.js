import { TOKEN, DATABASE_ID } from "../../../../config";
import Image from "next/image";
import Link from "next/link";

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

export default async function Movie(props) {
  const i = props.params.id - 1;

  

const res = await fetch(
  `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
  { ...options, cache: "no-store" }
);

  const data = await res.json();

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

  // (커버이미지 제한시간)퍼블리시 url로 대체. url 만드는 함수.
  const getPublishedImageUrl = (notionCoverUrl, projectId) => {
    const encodedUrl = encodeURIComponent(notionCoverUrl.split("?")[0]);
    return `https://candy-icebreaker-bbb.notion.site/image/${encodedUrl}?table=block&id=${projectId}&cache=v2`;
  };

  const defaultCoverUrl = "/img/still/logo.png";

  const notionCoverUrl =
    data.results[i].cover?.external?.url || data.results[i].cover?.file?.url;

  const coverUrl = notionCoverUrl
    ? getPublishedImageUrl(notionCoverUrl, data.id)
    : defaultCoverUrl;

  

  // duration 분 변환 함수 - 초 ${String(seconds).padStart(2,"0")}초
  const convertDurationToMinSec = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60); // 분 단위로 변환
    const seconds = durationInSeconds % 60; // 남은 초 계산
    return `${String(minutes).padStart(2, "0")}분`;
  };

  // staff 표시 형식 변환 함수 
  // Step 1: Group the staff by role
  const groupedStaff = staffs.reduce((acc, staff) => {
    // Split the role and name
    const [role, name] = staff.name.split(" - ");
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(name);
    return acc;
  }, {});
  // Step 2: Convert grouped data to the required format
  const formattedStaffList = Object.entries(groupedStaff).map(
    ([role, names]) => `${role} ${names.join(" ")}`
  );

  return (
    <div>
      <div className="filmcover">
        <Image
          src={notionCoverUrl}
          alt={title}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <section className="todays">
        <div className="filmpage">
          <div className="infobox">
            <h3 className="title">{title}</h3>
            {director} 감독 |{" "}
            {duration ? convertDurationToMinSec(duration) : "00분 00초"}
            <span className="tagholder">
              {tags.map((tag) => (
    <Link href={`/program/${tag.name}`} key={tag.name} className="tag">
                {tag.name} </Link>
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
