import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.NOTION_API_KEY;
const databaseId = process.env.NOTION_DATABASE_ID;

if (!apiKey || !databaseId) {
  console.error("❌ Missing NOTION_API_KEY or NOTION_DATABASE_ID");
  process.exit(1);
}

console.log("🔍 Diagnosing Notion Database...\n");
console.log(`API Key: ${apiKey.substring(0, 10)}...`);
console.log(`Database ID: ${databaseId}\n`);

try {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${databaseId}`,
    {
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Notion-Version": "2022-06-28",
      },
    }
  );

  if (!response.ok) {
    const error = await response.json();
    console.error("❌ Error:", error);
    process.exit(1);
  }

  const database = await response.json();

  console.log("📊 Notion Database Schema:");
  console.log("================================\n");
  console.log(`Database ID: ${database.id}`);
  console.log(`Database Title: ${database.title[0]?.plain_text || "N/A"}\n`);

  console.log("📋 Available Properties:");
  console.log("--------------------------------\n");

  const properties = Object.entries(database.properties);
  properties.forEach(([key, prop], index) => {
    console.log(`${index + 1}. ${key}`);
    console.log(`   Type: ${prop.type}`);
    if (prop.type === "select" && prop.select?.options) {
      const options = prop.select.options.map(o => o.name).join(", ");
      console.log(`   Options: ${options}`);
    }
    if (prop.type === "multi_select" && prop.multi_select?.options) {
      const options = prop.multi_select.options.map(o => o.name).join(", ");
      console.log(`   Options: ${options}`);
    }
    console.log();
  });

  console.log("================================");
  console.log("✅ Database schema retrieved successfully\n");
} catch (error) {
  console.error("❌ Error:", error);
  process.exit(1);
}
