const { Client } = require('@notionhq/client');

const notion = new Client({
    auth: process.env.NOTION_TOKEN,
});

const fetchPages = () => {
    return notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
            property: "상태",
            select: {
                equals: "Live"
            },
        },
    });
};

const fetchBySlug = (slug) => {
    return notion.databases.query({
        database_id: process.env.NOTION_DATABASE_ID,
        filter: {
            property: "slug",
            rich_text: {
                equals: slug,
            },
        },
    })
    .then((res) => res.results[0]);
};

const fetchPageBlocks = (pageId) => {
    return notion.blocks.children.list({
        block_id: pageId
    })
    .then((res) => res.results);
};

module.exports = {
    fetchPages,
    fetchBySlug,
    fetchPageBlocks,
};