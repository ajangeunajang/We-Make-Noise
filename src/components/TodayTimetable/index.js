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
        property: "section",
        direction: "ascending",
      },
    ],
    page_size: 100,
  }),
};

export default async function TodayTimetable() {
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
      const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${TOKEN}`,
          "Notion-Version": "2022-06-28",
        },
      });
      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }
      return await response.json();
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
    
    const relationIds = item.properties.section?.relation || [];
    if (!relationIds.length) continue;

    const relatedPage = await getRelatedPage(relationIds[0].id);
    if (!relatedPage) continue;

    // 상영 날짜 확인
    const screeningDate = relatedPage.properties?.상영일시?.date?.start;
    if (screeningDate) {
      const screeningDay = screeningDate.split('T')[0]; // "2024-02-25" 형식으로 추출
      // const today = new Date().toISOString().split('T')[0]; // 실제 운영용 오늘 날짜
      const today = "2024-02-25"; // 테스트용 날짜

      if (screeningDay === today) {
        const screeningTime = screeningDate.split('T')[1].substring(0, 5); // HH:mm 형식으로 추출
        const endTime = calculateEndTime(screeningTime, relatedPage.properties?.['러닝타임min']?.number);
        
        const sectionInfo = {
          name: relatedPage.properties?.섹션명?.rich_text[0]?.plain_text,
          theater: relatedPage.properties?.상영관?.select?.name,
          time: `${screeningTime} – ${endTime}`
        };

        const title = item.properties["Title"]?.title[0]?.plain_text;
        const director = item.properties.director?.multi_select
          .map((dir) => dir.name)
          .join(", ");

        if (sectionInfo?.name && title) {
          if (!groupedData[sectionInfo.name]) {
            groupedData[sectionInfo.name] = {
              films: [],
              theater: sectionInfo.theater,
              time: sectionInfo.time
            };
          }
          groupedData[sectionInfo.name].films.push({ title, director });
        }
      }
    }
  }

  // 섹션 길이 계산
  const sectionCount = Object.keys(groupedData).length;

  // 텍스트 길이에 따라 애니메이션 시작 위치 계산
  const getAnimationStartPosition = (section) => {
    const titles = groupedData[section].films;
    if (!titles.length) return '100%';
    
    const longestTitleLength = Math.max(
      ...titles.map(({ title }) => title?.length || 0)
    );
    return `${Math.min(100 + longestTitleLength * 2, 200)}%`; // 최대값 제한 추가
  };

  return (
    <section
      className="todays scroll-ani"
      style={{
        animationDuration: `${sectionCount * 9}s`,
      }}
    >
      <h2>오늘의 상영</h2>
      <div className="todaysmovie">
        <ul className="credit-animation">
          {Object.keys(groupedData)
            .sort((a, b) => a - b) //섹션 정렬
            .map((section, index) => (
              <li
                key={section}
                className="sectionholder"
                style={{
                  animation: `scrollUp ${sectionCount * 6}s linear`,
                  // 각 섹션에 대해 동적 위치값을 설정
                  top: getAnimationStartPosition(section),
                }}
              >
                <div className="section-number">섹션{index + 1}</div>
                <div className="section-title">{section}</div>
                <div className="info">{groupedData[section].time.split(' – ')[0]}</div>

                <ul>
                  {groupedData[section].films.map(({ title, director }, index) => (
                    <li key={index} className="filmtitle">
                      <span className="align-r">{title}</span>
                      <span className="align-l">{director} 감독</span>
                    </li>
                  ))}
                </ul>

                <div className="infodetail">
                  {groupedData[section].theater} | {groupedData[section].time}
                </div>
              </li>
            ))}
        </ul>
      </div>
    </section>
  );
}

// 상영 종료 시간 계산 - 섹션 러닝타임 함수
function calculateEndTime(startTime, duration) {
  const [hours, minutes] = startTime.split(':').map(Number);
  const totalMinutes = hours * 60 + minutes + duration;
  const endHours = Math.floor(totalMinutes / 60) % 24;
  const endMinutes = totalMinutes % 60;
  return `${String(endHours).padStart(2, '0')}:${String(endMinutes).padStart(2, '0')}`;
}
