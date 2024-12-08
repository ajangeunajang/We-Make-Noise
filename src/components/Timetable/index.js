"use client"
import { useState } from 'react';

export default function Timetable(){
    const movieData = [
        {
            date: "2.22.",
            datenum: '22',
            day: "목요일",
            sections: [
                {
                    time: "17:00",
                    title: "인생은 드라마1",
                    details: [
                        "거래 | 이승헌 | 13’",
                        "헨젤 : 두 개의 교복치마 | 임지선 | 29’",
                        "행복주택 | 김한나 | 24’",
                        "광합성 클럽 | 이정민 | 10’"
                    ],
                    location: "대한극장 7관 <br /> 17:00 – 18:35"
                },
                {
                    time: "17:30",
                    title: "장르의 다양성1",
                    details: [
                        "연애의 당사자들 | 조승우 | 29’",
                        "CONI 30000ft | 손경빈 | 8’",
                        "오! 마이 드레스 | 황옥영 | 19’",
                        "죽고 싶다 죽이고 ���다 | 정재희 | 22’"
                    ],
                    location: "대한극장 8관 <br /> 17:30 – 18:48"
                },
                {
                    time: "19:00",
                    title: "밝거나, 어둡거나",
                    details: [
                        "성스러운 가족(청소년관람불가) | 양승우 | 23’",
                        "완벽한 껍질 | 김상원 | 15’",
                        "도주 | 허민 | 15’",
                        "눈자라기 | 양가희 | 15’",
                        "종의 소리 | 황지은 | 28’"
                    ],
                    location: "대한극장 7관 <br /> 19:00 – 20:36"
                },
                {
                    time: "19:20",
                    title: "사랑이란1",
                    details: [
                        "소원 여행 | 송진욱 | 31’",
                        "디-데이, 프라이데이 | 이이다 | 27’",
                        "여름환상곡 | 김지현 | 21’",
                        "에브리원 세즈 아이 러브 유 | 서지운 | 19’"
                    ],
                    location: "대한극장 8관 <br /> 19:20 – 20:58"
                }
            ]
        },
        {
            date: "2.23.",
            datenum: '23',
            day: "금요일",
            sections: [
                {
                    time: "17:00",
                    title: "장르의 다양성2",
                    details: [
                        "섬 | 이정호 | 23’",
                        "철봉하자우리 | 목충헌 | 41’",
                        "갤로퍼 | 오한울 | 22’",
                        "소파 밑 괴물 | 이신우 | 16’"
                    ],
                    location: "대한극장 7관 <br /> 17:00 – 18:42"
                },
                {
                    time: "17:30",
                    title: "손에 땀이 나",
                    details: [
                        "발 없는 말 | 김현수 | 15’",
                        "틱탁 | 강다연 | 21’",
                        "손님 | 송현범 | 14’",
                        "후각상실 | 김성윤 | 22’"
                    ],
                    location: "대한극장 8관 <br /> 17:00 – 18:42"
                },
                {
                    time: "19:10",
                    title: "영화는 과학",
                    details: [
                        "눈물눈물 | 김현규 | 15’",
                        "AI-랑의 삼각형 | 이윤호 | 15’",
                        "링크 | 김지원 | 22’",
                        "해왕성 다이아몬드 | 정기연 | 30’"
                    ],
                    location: "대한극장 7관 <br /> 19:10 – 20:32"
                },
                {
                    time: "19:30",
                    title: "가족과 영화",
                    details: [
                        "빼고 | 심이안 | 26’",
                        "천왕봉 | 김재우 | 16’",
                        "영원한 유산 | 이은지 | 20’",
                        "우리 | 최지현 | 18’"
                    ],
                    location: "대한극장 8관 <br /> 19:30 – 20:50"
                }
            ]
        },
        {
            date: "2.24.",
            datenum: '24',
            day: "토요일",
            sections: [
                {
                    time: "11:30",
                    title: "웃음을 주는 영화",
                    details: [
                        "관리사무소에서 안내말씀 드립니다 | 박주상 | 24’",
                        "로또 목소리 | 이하준 | 16’",
                        "T…oile…T: 고수들의 점심 | 김다영 | 7’",
                        "한 대만 | 최우식 | 14’",
                        "REC | 안서연 | 19’"
                    ],
                    location: "대한극장 7관 <br /> 11:30 – 12:50"
                },
                {
                    time: "12:00",
                    title: "그냥, 그렇다고",
                    details: [
                        "오디션 | 오한울 | 14’",
                        "여름의 건널목 | 김가은 | 25’",
                        "호박 | SUN Jia | 21’",
                        "골드넘버 | 박천 | 10’",
                        "그냥 영화일 뿐이라서 | 정빛아름 | 26’"
                    ],
                    location: "대한극장 8관 <br /> 12:00 – 13:36"
                },
                {
                    time: "13:20",
                    title: "미소의 이유는 영화",
                    details: [
                        "빼고 | 심이안 | 26’",
                        "오늘부터 다시 열어요 | 정도윤 | 18’",
                        "한대만 | 김준형 | 15’",
                        "성적고민 | 신지은 | 14’",
                        "후각상실 | 김성윤 | 22’"
                    ],
                    location: "대한극장 7관 <br /> 13:20 – 14:55"
                },
                {
                    time: "13:20",
                    title: "달콤, 살벌",
                    details: [
                        "20만 km | 이하준 | 8’",
                        "스즈키 | 안정민 | 24’",
                        "어느 날 아들이 새우가 되었다 | 권지애 | 24’",
                        "깊은숲 | 맹재영 | 26’",
                        "영원의 관문 | 이은지 | 13’"
                    ],
                    location: "대한극장 8관 <br /> 14:00 – 15:30"
                },
                {
                    time: "15:20",
                    title: "추천작1",
                    details: [
                        "틱탁 | 강다연 | 21’",
                        "꽃은 웃어도 소리가 없다 | 강홍주 | 27’",
                        "거품의 무게 | 최이다 | 20’",
                        "그을음 | 이다현 | 32’"
                    ],
                    location: "대한극장 7관 <br /> 15:20 – 17:00"
                },
                {
                    time: "16:00",
                    title: "달콤, 살벌",
                    details: [
                        "정동 | 최우진 | 23’",
                        "산소난민 | 김재우 | 16’",
                        "담력훈련 | 오유경 | 21’",
                        "죽고 싶다 죽이고 싶다 | 정재희 | 22’",
                        "삼촌 | 이동찬 | 12’"
                    ],
                    location: "대한극장 8관 <br /> 16:00 – 17:34"
                },
                {
                    time: "17:20",
                    title: "추천작2",
                    details: [
                        "철봉하자우리 | 목충헌 | 41’",
                        "유해조수 | 김용균 | 8’",
                        "겨레와 인류의 영광을 위해 | 유영 | 17’",
                        "헨젤: 두 개의 교복치마 | 임지선 | 29’"
                    ],
                    location: "대한극장 7관 <br /> 17:20 – 18:55"
                },
                {
                    time: "18:00",
                    title: "사랑이란2",
                    details: [
                        "짜요! 나이프 | 이예승 | 19’",
                        "아이린 | 박종민 | 16’",
                        "인류학입문 | 김준형 | 22’",
                        "별일 없었어, 어젯밤에? | 구태영 | 16’",
                        "가족의 간 | 이서연 | 13’"
                    ],
                    location: "대한극장 8관 <br /> 18:00 – 19:26"
                },
                {
                    time: "19:20",
                    title: "추천작3",
                    details: [
                        "종의 소리 | 황지은 | 28’",
                        "디-데이, 프라이데이 | 이이다 | 27’",
                        "천왕봉 | 김재우 | 16’",
                        "갤로퍼 | 오한울 | 22’",
                        "생일선물 | 정재훈 | 18’"
                    ],
                    location: "대한극장 7관 <br /> 19:20 – 21:11"
                }
            ]
        },
        {
            date: "2.25.",
            datenum: '25',
            day: "일요일",
            sections: [
                {
                    time: "11:30",
                    title: "성장하는 이들에게1",
                    details: [
                        "별을 쏘는 아이 | 박시현 | 15’",
                        "하프웨이 라인 | 혼다 슌스케 | 22’",
                        "자전거 수업 | 김지현 | 10’",
                        "성미의 성미 | 장채린 | 28’"
                    ],
                    location: "대한극장 7관 <br /> 11:30 – 12:45"
                },
                {
                    time: "12:00",
                    title: "성장하는 이들에게2",
                    details: [
                        "유니폼 | 강다연 | 27’",
                        "짝사랑 난이도 최상 | 이송혜 | 21’",
                        "자전거 수업 | 이다현 | 14’",
                        "나는 카우보이가 되고 싶다 | 정한겸 | 12’",
                        "우리의 연극이 끝나도, | 조가은 | 15’"
                    ],
                    location: "대한극장 8관 <br /> 12:00 – 13:29"
                },
                {
                    time: "13:10",
                    title: "난 안정적이고 싶어",
                    details: [
                        "아이린 | 박종민 | 16’",
                        "불우의 명작 | 최우식 | 17’",
                        "센딩 | 임원 | 13’",
                        "생일선물 | 정재훈 | 18’",
                        "집값 | 허민 | 19’"
                    ],
                    location: "대한극장 7관 <br /> 13:10 – 14:33"
                },
                {
                    time: "13:50",
                    title: "잠시 쉬어가도 괜찮아",
                    details: [
                        "졸음쉼터 | 정혜윤 | 14’",
                        "거품의 무게 | 최이다 | 20’",
                        "도민호 | 윤이나 | 19’",
                        "광합성 클럽 | 이정민 | 10’",
                        "여름의 건널목 | 김가은 | 25’"
                    ],
                    location: "대한극장 8관 <br /> 13:50 – 15:18"
                },
                {
                    time: "15:00",
                    title: "‘나’에 대한 시간",
                    details: [
                        "거북이 | YARA GARI | 14’",
                        "부유하는 ( ) | 김인해 | 9’",
                        "검은 태양 | 임원 | 25’",
                        "Don’t Wanna DIE | 이주현 | 15’",
                        "나쁜피 | 송현범 | 20’"
                    ],
                    location: "대한극장 7관 <br /> 15:00 – 16:20"
                },
                {
                    time: "15:40",
                    title: "도전의 자세",
                    details: [
                        "CONI 30000ft | 손경빈 | 8’",
                        "백로 | 류지민 | 19’",
                        "링크 | 김지원 | 22’",
                        "정숙한 후보 | 박천 | 20’",
                        "태양 아래 | 이동찬 | 20’"
                    ],
                    location: "대한극장 8관 <br /> 15:40 – 17:09"
                },
                {
                    time: "16:50",
                    title: "세상에게 한 마디",
                    details: [
                        "REC | 안서연 | 19’",
                        "그을음 | 이다현 | 32’",
                        "행복주택 | 김한나 | 24’",
                        "하모니카 | 정재훈 | 14’",
                        "그로기 | 양승우 | 12’"
                    ],
                    location: "대한극장 7관 <br /> 16:50 – 18:31"
                },
                {
                    time: "17:30",
                    title: "인생은 드라마2",
                    details: [
                        "호박 | SUN Jia | 21’",
                        "가족의 간 | 이서연 | 13’",
                        "스즈키 | 안정민 | 24’",
                        "노래 | 이승헌 | 25’",
                        "꽃은 웃어도 소리가 없다 | 강홍주 | 27’"
                    ],
                    location: "대한극장 8관 <br /> 17:30 – 19:20"
                },
                {
                    time: "19:00",
                    title: "긴장감 유발",
                    details: [
                        "유해조수 | 김용균 | 8’",
                        "감시 | 김현수 | 30’",
                        "깊은숲 | 맹재영 | 26’",
                        "산소난민 | 김재우 | 16’"
                    ],
                    location: "대한극장 7관 <br /> 19:00 – 20:20"
                },
                {
                    time: "19:40",
                    title: "인생은 드라마3",
                    details: [
                        "성적고민 | 신지은 | 14’",
                        "겨레와 인류의 영광을 위해 | 유영 | 17’",
                        "친절한 희진씨 | 정채윤 | 19’",
                        "어느 날 아들이 새우가 되었다 | 권지애 | 24’",
                        "담력훈련 | 오유경 | 21’"
                    ],
                    location: "대한극장 8관 <br /> 19:40 – 21:15"
                }
            ]
        }
    ];
    let sectionCounter = 1; // 섹션 번호 카운터 초기화
    const [activeDayIndex, setActiveDayIndex] = useState(0); // State to track the active day
    const handleDayClick = (index, dayData) => {
        setActiveDayIndex(index); // Update the active day index
        const element = document.getElementById(dayData.day);
        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const offset = 220;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth',
            });
        }
    };

    return(
        <section className="schedule">
            <div className="days">
                {movieData.map((dayData, index) => (
                    <a
                        key={dayData.day}
                        id="choosedays"
                        href={'#' + dayData.day}
                        onClick={(e) => {
                            e.preventDefault(); // Prevent default link behavior
                            handleDayClick(index, dayData); // Handle click to set active day
                        }}
                    > 
                    <span className='datenum'>{dayData.datenum}</span>{dayData.day}
                    </a>
                ))}
                {/* Highlight Box - Position changes based on the selected day */}
                <div
                    className="highlightBox"
                    style={{ 
                        left: `calc((100vw - 2.8rem) / 4 * ${activeDayIndex} + 1.4rem)`,
                        width: 'calc((100vw - 2.8rem) / 4)'
                        //하이라이트박스의 width 때문에 위치가 틀어져 보였음. width도 상수가 아니라 동적으로 1/4 로 계산하는 식으로 변경!
                    }}
                />
            </div>

            {movieData.map((dayData) => (
                <div className="todaysmovie" key={dayData.date}>
                    <h2 id={dayData.day}>
                        2월 22일
                        {/* {dayData.date} */}
                        {dayData.day}
                    </h2>
                    <ul className="timetable">
                        {dayData.sections.map((section) => (
                            <li key={section.title}>
                                <div className="info">{section.time}</div>
                                <span className="section-number">{`섹션${sectionCounter++}`}</span> {/* Increment counter */}
                                <div className="section-title">{section.title}</div>
                                <p
                                    className="filmtitle"
                                    dangerouslySetInnerHTML={{
                                        __html: section.details.join("<br />")
                                    }}
                                />
                                <div className="infodetail" dangerouslySetInnerHTML={{
                                    __html: section.location
                                }} />
                            </li>
                        ))}
                    </ul>
                </div>
            ))}
        </section>
    )
}