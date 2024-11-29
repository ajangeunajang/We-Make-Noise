import Link from "next/link";

export default function Menu() {
  return (
    <>
      <input type="checkbox" id="menuicon"></input>
      <label for="menuicon">
        <span></span>
        <span></span>
        <span></span>
      </label>
      <div className="sidebar">
        <div>
          <a href="/timetable">상영시간표</a>
        </div>
        <div>
          <a href="/program">작품소개</a>
        </div>
        <div>
          <a href="/partners">후원사</a>
        </div>
        <div className="insta">
          <a href="https://www.instagram.com/kartsfilm/">
            <img className="insta" src="/img/insta.svg" alt="instagram" />
          </a>
        </div>
      </div>
      <div className="logo">
        <Link href="/">
          <img src="/img/logo.png" alt="로고" />
        </Link>
      </div>
    </>
  );
}
