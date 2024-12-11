import { TOKEN, DATABASE_ID } from "../../../config";
import TimetableHandler from "./TimetableHandler";

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
        //왜인지 모르겠지만 sorts ascending 하면 22,23,24일 데이터는 누락되고 25일만 뜸
        property: "section",
        direction: "descending",
      },
    ],
    page_size: 100,
  }),
};

export default async function Timetable() {
  // 먼저 메인 데이터베이스 쿼리
  const res = await fetch(
    `https://api.notion.com/v1/databases/${DATABASE_ID}/query`,
    options,
    { cache: "no-store" }
  );
  const data = await res.json();

  // 관계형 데이터베이스의 페이지 정보를 가져오는 함수
  async function getRelatedPage(pageId) {
    try {
      const response = await fetch(
        `https://api.notion.com/v1/pages/${pageId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            "Notion-Version": "2022-06-28",
          },
        }
      );
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }
      const data = await response.json();
      console.log('Related Page Data:', {
        id: pageId,
        date: data.properties?.상영일시?.date?.start,
        section: data.properties?.섹션명?.rich_text[0]?.plain_text
      });
      return data;
    } catch (error) {
      console.error(`페이지 정보 조회 실패 (ID: ${pageId}):`, error);
      return null;
    }
  }

  // 데이터를 섹션별로 그룹화
  const groupedData = {};

  // 각 항목에 대해 관계형 데이터베이스 정보 가져오기
  for (const item of data.results) {
    if (!item.properties) {
      console.warn("Missing properties in item:", item);
      continue;
    }

    // 섹션 정보가 없는 경우에도 기본 섹션으로 처리
    let sectionInfo;
    
    if (item.properties.section?.relation?.length > 0) {
      // 기존 로직: 관계형 데이터베이스에서 섹션 정보 가져오기
      const relatedPage = await getRelatedPage(item.properties.section.relation[0].id);
      if (!relatedPage) continue;

      const screeningDate = relatedPage.properties?.상영일시?.date?.start;
      if (!screeningDate) continue;

      const screeningTime = screeningDate.split('T')[1].substring(0, 5);
      const runningTime = relatedPage.properties?.러닝타임?.number || 0;
      const endTime = calculateEndTime(screeningTime, runningTime);

      sectionInfo = {
        name: relatedPage.properties?.섹션명?.rich_text[0]?.plain_text,
        theater: relatedPage.properties?.상영관?.select?.name,
        time: `${screeningTime} – ${endTime}`,
        number: relatedPage.properties.번호.title[0].plain_text,
        date: screeningDate.split("T")[0]
      };
    } else {
      // 섹션 정보가 없는 경우 직접 입력된 정보 사용
      sectionInfo = {
        name: item.properties?.섹션명?.rich_text[0]?.plain_text,
        theater: item.properties?.상영관?.select?.name,
        time: item.properties?.상영시간?.rich_text[0]?.plain_text,
        number: item.properties?.번호?.rich_text[0]?.plain_text,
        date: item.properties?.상영일시?.date?.start?.split("T")[0]
      };
    }

    if (!sectionInfo?.name || !sectionInfo?.date) continue;

      const title = item.properties["Title"]?.title[0]?.plain_text;
      const director = item.properties.director?.multi_select
        .map((dir) => dir.name)
        .join(", ");

    if (!groupedData[sectionInfo.name]) {
      groupedData[sectionInfo.name] = {
        films: [],
        theater: sectionInfo.theater,
        time: sectionInfo.time,
        number: sectionInfo.number,
        date: sectionInfo.date
      };
    }
    groupedData[sectionInfo.name].films.push({ title, director });
  }

  // console.log('Grouped Data:', JSON.stringify(groupedData, null, 2));

  return (
    <section className="schedule">
      <TimetableHandler />

      <ol>
        {["2024-02-22", "2024-02-23", "2024-02-24", "2024-02-25"].map((date) => (
          <li key={date}>
            <h2>{formatDate(date)}</h2>
            <div className="todaysmovie">
              <ul className="credit-animation">
                {Object.keys(groupedData)
                  .filter(section => groupedData[section].date === date)
                  .sort((a, b) => {
                    // 섹션 번호를 기준으로 오름차순 정렬
                    return Number(groupedData[a].number) - Number(groupedData[b].number);
                  })
                  .map((section) => (
                    <li key={section} className="sectionholder">
                      <div className="section-number">섹션{groupedData[section].number}</div>
                      <div className="section-title">{section}</div>
                      <div className="info">
                        {groupedData[section].time.split(" – ")[0]}
                      </div>

                    <ul>
                      {groupedData[section].films.map(
                        ({ title, director }, index) => (
                          <li key={index} className="filmtitle">
                            <span className="align-r">{title}</span>
                            <span className="align-l">{director} 감독</span>
                          </li>
                        )
                      )}
                    </ul>

                      <div className="infodetail">
                        {groupedData[section].theater} |{" "}
                        {groupedData[section].time}
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

// 날짜 포맷팅 함수 추��
function formatDate(dateString) {
  const date = new Date(dateString);
  const days = ['일', '월', '화', '수', '목', '금', '토'];
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const dayOfWeek = days[date.getDay()];
  
  return `${month}월 ${day}일 ${dayOfWeek}요일`;
}

// 상영 종료 시간 계산 - 섹션 러닝타임 함수
function calculateEndTime(startTime, duration) {
  const [hours, minutes] = startTime.split(":").map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, "0")}:${String(endMinutes).padStart(
    2,
    "0"
  )}`;
}
