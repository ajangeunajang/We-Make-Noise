import dynamic from "next/dynamic";
import React from "react";
import TodayTimetable from "@/components/TodayTimetable";

// p5.js 스케치 파일을 다이내믹하게 로드
const Sketch = dynamic(() => import("../components/Visual/sketch"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Sketch />
      <TodayTimetable />
    </div>
  );
}