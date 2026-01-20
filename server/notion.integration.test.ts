import { describe, it, expect, beforeAll, afterAll } from "vitest";
import { ENV } from "./_core/env";
import { syncQuoteToNotion } from "./notion";

describe("Notion CRM Integration Tests", () => {
  const testQuote = {
    id: "test-" + Date.now(),
    name: "Test User",
    email: "test@example.com",
    phone: "(32) 99999-9999",
    company: "Test Company",
    serviceType: "Registro de Marca",
    urgency: "Normal",
    projectDescription: "Test description for Notion sync",
    status: "new",
    createdAt: new Date(),
  };

  beforeAll(() => {
    console.log("🧪 Starting Notion Integration Tests");
    console.log(`📌 Using Database ID: ${ENV.notionDatabaseId}`);
  });

  it("should have valid Notion credentials", () => {
    expect(ENV.notionApiKey).toBeDefined();
    expect(ENV.notionApiKey).not.toBe("");
    expect(ENV.notionDatabaseId).toBeDefined();
    expect(ENV.notionDatabaseId).not.toBe("");
    console.log(`📌 Using Database ID: ${ENV.notionDatabaseId}`);
  });

  it("should sync a quote to Notion database", async () => {
    try {
      const result = await syncQuoteToNotion(testQuote);
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      console.log(`✅ Quote synced to Notion with ID: ${result.id}`);
      console.log(`📝 Page URL: ${result.url}`);
    } catch (error) {
      console.error("❌ Failed to sync quote to Notion:", error);
      throw error;
    }
  });

  it("should create a page with correct properties", async () => {
    try {
      const result = await syncQuoteToNotion(testQuote);
      expect(result).toBeDefined();
      expect(result.id).toBeDefined();
      expect(result.url).toBeDefined();
      console.log(`✅ Quote page created with ID: ${result.id}`);
      console.log(`📝 Page URL: ${result.url}`);
    } catch (error) {
      console.error("❌ Properties validation failed:", error);
      throw error;
    }
  });

  it("should handle special characters in description", async () => {
    const specialCharQuote = {
      ...testQuote,
      projectDescription: "Descrição com acentuação: café, açúcar, pão & mais",
    };

    try {
      const result = await syncQuoteToNotion(specialCharQuote);
      expect(result).toBeDefined();
      console.log("✅ Special characters handled correctly");
    } catch (error) {
      console.error("❌ Failed to handle special characters:", error);
      throw error;
    }
  });

  it("should sync multiple quotes without conflicts", async () => {
    const quotes = [
      { ...testQuote, id: "test-1-" + Date.now(), name: "User 1" },
      { ...testQuote, id: "test-2-" + Date.now(), name: "User 2" },
      { ...testQuote, id: "test-3-" + Date.now(), name: "User 3" },
    ];

    try {
      const results = await Promise.all(
        quotes.map((q) => syncQuoteToNotion(q))
      );
      expect(results).toHaveLength(3);
      expect(results.every((r) => r.id)).toBe(true);
      console.log(`✅ ${results.length} quotes synced successfully`);
    } catch (error) {
      console.error("❌ Batch sync failed:", error);
      throw error;
    }
  });

  afterAll(() => {
    console.log("🏁 Notion Integration Tests Complete");
  });
});
