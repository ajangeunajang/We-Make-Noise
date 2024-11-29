"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ConditionalScrollPrevent() {
  const pathname = usePathname(); // 현재 페이지 경로 가져오기

  useEffect(() => {
    if (pathname === "/") {
      const preventScroll = (e) => {
        if (window.scrollY === 0) {
          e.preventDefault();
        }
      };

      document.addEventListener("touchmove", preventScroll, { passive: false });

      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      return () => {
        document.removeEventListener("touchmove", preventScroll);
      };
    }
  }, [pathname]); // pathname 변경 시 효과 재실행

  return null; // 이 컴포넌트는 DOM에 아무것도 렌더링하지 않음
}
