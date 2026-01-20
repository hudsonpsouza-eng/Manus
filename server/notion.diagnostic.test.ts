import { describe, it } from "vitest";
import { ENV } from "./_core/env";

describe("Notion Database Diagnostic", () => {
  it("should retrieve database schema and properties", async () => {
    try {
      const response = await fetch(
        `https://api.notion.com/v1/databases/${ENV.notionDatabaseId}`,
        {
          headers: {
            Authorization: `Bearer ${ENV.notionApiKey}`,
            "Notion-Version": "2022-06-28",
          },
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("❌ Error fetching database:", error);
        throw new Error(`Failed to fetch database: ${error.message}`);
      }

      const database = await response.json();
      console.log("\n📊 Notion Database Schema:");
      console.log("================================");
      console.log(`Database ID: ${database.id}`);
      console.log(`Database Title: ${database.title[0]?.plain_text || "N/A"}`);
      console.log("\n📋 Available Properties:");
      console.log("--------------------------------");

      Object.entries(database.properties).forEach(([key, prop]: any) => {
        console.log(`\n✓ ${key}`);
        console.log(`  Type: ${prop.type}`);
        if (prop.type === "select" && prop.select?.options) {
          console.log(`  Options: ${prop.select.options.map((o: any) => o.name).join(", ")}`);
        }
        if (prop.type === "multi_select" && prop.multi_select?.options) {
          console.log(`  Options: ${prop.multi_select.options.map((o: any) => o.name).join(", ")}`);
        }
      });

      console.log("\n================================");
      console.log("✅ Database schema retrieved successfully\n");
    } catch (error) {
      console.error("❌ Diagnostic failed:", error);
      throw error;
    }
  });
});
