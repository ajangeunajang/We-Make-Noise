// 노션 커버 이미지 URL 생성
export const getPublishedImageUrl = (notionCoverUrl, projectId) => {
  const encodedUrl = encodeURIComponent(notionCoverUrl.split("?")[0]);
  return `https://candy-icebreaker-bbb.notion.site/image/${encodedUrl}?table=block&id=${projectId}&cache=v2`;
};

// 상영시간 포맷 변환
export const convertDurationToMinSec = (durationInSeconds) => {
  const minutes = Math.floor(durationInSeconds / 60);
  const seconds = durationInSeconds % 60;
  return `${String(minutes).padStart(2, "0")}분`;
};

// 스태프 정보 포맷팅
export const formatStaffList = (staffs) => {
  const groupedStaff = staffs.reduce((acc, staff) => {
    const [role, name] = staff.name.split(" - ");
    if (!acc[role]) {
      acc[role] = [];
    }
    acc[role].push(name);
    return acc;
  }, {});

  return Object.entries(groupedStaff).map(
    ([role, names]) => `${role} ${names.join(" ")}`
  );
};
