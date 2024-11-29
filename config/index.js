export const DATABASE_ID = process.env.NOTION_DATABASE_ID
export const TOKEN = process.env.NOTION_TOKEN

export const options = {
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
          property: "\bno",
          direction: "ascending",
        },
      ],
      page_size: 100,
      filter: {
        property: "\b상태", // Notion 속성 이름
        status: {
          equals: "Live", // "Live" 상태만 필터링
        },
      },
    }),
  };
  