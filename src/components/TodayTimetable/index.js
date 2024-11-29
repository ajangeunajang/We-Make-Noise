import { TOKEN, DATABASE_ID } from "../../../config";

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
        property: "\bsection",
        direction: "ascending",
      },
    ],
    page_size: 100,
    filter: {
      or: [
        { property: "\bsection", multi_select: { contains: "18" } },
        { property: "\bsection", multi_select: { contains: "19" } },
        { property: "\bsection", multi_select: { contains: "20" } },
        { property: "\bsection", multi_select: { contains: "21" } },
        { property: "\bsection", multi_select: { contains: "22" } },
        { property: "\bsection", multi_select: { contains: "23" } },
        { property: "\bsection", multi_select: { contains: "24" } },
        { property: "\bsection", multi_select: { contains: "25" } },
        { property: "\bsection", multi_select: { contains: "26" } },
        { property: "\bsection", multi_select: { contains: "27" } },
      ],
    },
  }),
};

export default async function TodayTimetable() {
  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options,
    { cache: "no-store" }
  );
  const data = await res.json();

  // 데이터를 섹션별로 그룹화
  const groupedData = {};
  data.results.forEach((item) => {
    const section = item.properties["\bsection"]?.multi_select[0]?.name;
    const title = item.properties["Title"]?.title[0]?.plain_text;
    const director = item.properties.director?.multi_select
      .map((dir) => dir.name)
      .join(", "); // 감독 이름을 쉼표로 연결

    if (section && title) {
      if (!groupedData[section]) {
        groupedData[section] = [];
      }
      groupedData[section].push({ title, director });
    }
  });

  // 섹션 길이 계산
  const sectionCount = Object.keys(groupedData).length;

  // 텍스트 길이에 따라 애니메이션 시작 위치 계산
  const getAnimationStartPosition = (section) => {
    const longestTitleLength = Math.max(
      ...groupedData[section].map(({ title }) => title.length)
    );
    return `${100 + longestTitleLength * 2}%`; // 제목 길이에 비례해서 시작 위치 조정
  };

  return (
    <section
      className="todays scroll-ani"
      style={{
        animationDuration: `${sectionCount * 5}s`, // 섹션 개수에 따라 동적 설정
      }}
    >
      <h2>오늘의 상영</h2>
      <div className="todaysmovie">
        <ul className="credit-animation">
          {Object.keys(groupedData)
            .sort((a, b) => a - b) // 섹션 정렬
            .map((section) => (
              <li
                key={section}
                className="sectionholder"
                style={{
                  animation: `scrollUp ${sectionCount * 6}s linear`,
                  // 각 섹션에 대해 동적 위치값을 설정
                  top: getAnimationStartPosition(section),
                }}
              >
                <div className="section-number">섹션 {section}</div>
                <div className="section-title">[Title {section} Title]</div>
                <div className="info">[{section}:{section}]</div>

                <ul>
                  {groupedData[section].map(({ title, director }, index) => (
                    <li key={index} className="filmtitle">
                      <span className="align-r">{title}</span>
                      <span className="align-l">{director} 감독</span>
                    </li>
                  ))}
                </ul>

                <div className="infodetail">
                  대한극장 [{section}관] | {section}:{section} – [{section}:{section}]
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}
