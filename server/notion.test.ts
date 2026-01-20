import { describe, it, expect } from "vitest";
import { ENV } from "./_core/env";

describe("Notion API Integration", () => {
  it("should have valid Notion credentials", () => {
    expect(ENV.notionApiKey).toBeDefined();
    expect(ENV.notionDatabaseId).toBeDefined();
    expect(ENV.notionApiKey.length).toBeGreaterThan(20);
    expect(ENV.notionDatabaseId.length).toBeGreaterThan(20);
  });

  it("should be able to connect to Notion API", async () => {
    const response = await fetch("https://api.notion.com/v1/databases/" + ENV.notionDatabaseId, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${ENV.notionApiKey}`,
        "Notion-Version": "2022-06-28",
      },
    });

    expect(response.status).toBe(200);
    const data = await response.json();
    expect(data.id).toBeDefined();
  });
});
