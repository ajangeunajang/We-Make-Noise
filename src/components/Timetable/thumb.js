import Image from "next/image";
import Link from "next/link";

export default function Thumb({ data, isLoading }) {
  const title = data.properties.Title?.title?.[0]?.plain_text || "No Title";
  const director = data.properties.director?.multi_select?.[0]?.name || "Unknown Director";
  const duration = data.properties.duration?.number;
  const no = data.properties["\bno"]?.number;
  const tag = data.properties.tags;


  // (커버이미지 제한시간)퍼블리시 url로 대체. url 만드는 함수.
  const getPublishedImageUrl = (notionCoverUrl, projectId) => {
    const encodedUrl = encodeURIComponent(notionCoverUrl.split("?")[0]);
    return `https://candy-icebreaker-bbb.notion.site/image/${encodedUrl}?table=block&id=${projectId}&cache=v2`;
  };

  const defaultCoverUrl = "/img/still/logo.png";

  const notionCoverUrl = data.cover?.external?.url || data.cover?.file?.url;
  const coverUrl = notionCoverUrl
    ? getPublishedImageUrl(notionCoverUrl, data.id)
    : defaultCoverUrl;

  // duration 분초 변환 함수
  const convertDurationToMinSec = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60); // 분 단위로 변환
    const seconds = durationInSeconds % 60; // 남은 초 계산
    return `${String(minutes).padStart(2, "0")}분 ${String(seconds).padStart(2, "0")}초`;
  };

  if (isLoading) {
    return (
      <li className="thumnail skeleton">
        <div className="stillcut skeleton-image" />
        <div className="infobox">
          <div className="skeleton-title" />
          <div className="skeleton-text" />
        </div>
      </li>
    );
  }

  return (
    <li key={no} className="thumnail">
      <Link href={`/program/${no}`}>
        <div className="stillcut">
          <Image src={coverUrl} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div className="infobox">
          <h3 className="title">{title}</h3>
          {director} 감독 |{" "}
          {duration ? convertDurationToMinSec(duration) : "00분 00초"}
        </div>
        {/* <div className="infobox">
            {tag.multi_select[0].name} {tag.multi_select[1].name}
        </div> */}
      </Link>
    </li>
  );
}
