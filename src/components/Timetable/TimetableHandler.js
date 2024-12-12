"use client"
import { useState } from "react";

export default function TimetableHandler({ movieData }){
    const [activeDayIndex, setActiveDayIndex] = useState(0);
    
    const handleDayClick = (index, dayData) => {
        setActiveDayIndex(index);
        
        const date = dayData.date;
        const formattedDate = formatDate(date);
        
        const element = Array.from(document.querySelectorAll('h2')).find(
            el => el.textContent === formattedDate
        );

        if (element) {
            const elementPosition = element.getBoundingClientRect().top + window.scrollY;
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize);
            const offset = 15 * rootFontSize;
            
            //스크롤 위치 조정
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        }
    };

    // 날짜 선택 UI 렌더링
    return(
        <div className="days">
            {movieData.map((dayData, index) => (
                <a
                    key={dayData.date}
                    id="choosedays"
                    href={'#' + formatDate(dayData.date)}
                    onClick={(e) => {
                        e.preventDefault();
                        handleDayClick(index, dayData);
                    }}
                > 
                    <span className='datenum'>{dayData.datenum}</span>
                    {new Date(dayData.date).getDay() === 0 ? '일요일' :
                     new Date(dayData.date).getDay() === 1 ? '월요일' :
                     new Date(dayData.date).getDay() === 2 ? '화요일' :
                     new Date(dayData.date).getDay() === 3 ? '수요일' :
                     new Date(dayData.date).getDay() === 4 ? '목요일' :
                     new Date(dayData.date).getDay() === 5 ? '금요일' : '토요일'}
                </a>
            ))}
            <div
                className="highlightBox"
                style={{ 
                    left: `calc((100vw - 2.8rem) / 4 * ${activeDayIndex} + 1.4rem)`,
                    width: 'calc((100vw - 2.8rem) / 4)'
                }}
            />
        </div>
    )
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const days = ['일', '월', '화', '수', '목', '금', '토'];
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const dayOfWeek = days[date.getDay()];
    
    return `${month}월 ${day}일 ${dayOfWeek}요일`;
}