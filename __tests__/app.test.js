const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: responds with a successful connection message", async () => {
    const result = await request(app).get("/api").expect(200);
    expect(result.body.msg).toBe("Connected to API!");
  });
});

describe("GET /api/categories", () => {
  test("200: responds with an array of category objects which should each have a slug and description", async () => {
    const result = await request(app).get("/api/categories").expect(200);
    result.body.categories.forEach((category) => {
      expect(category).toMatchObject({
        slug: expect.any(String),
        description: expect.any(String),
      });
    });
  });
  test("404: responds with error message if categories spelled incorrectly ", async () => {
    const result = await request(app).get("/api/categraies").expect(404);
    expect(result.body.msg).toBe("Invalid URL");
  });
  test("404: responds with error message if api spelled incorrectly ", async () => {
    const result = await request(app).get("/aip/categories").expect(404);
    expect(result.body.msg).toBe("Invalid URL");
  });
});

describe("GET /api/reviews/:review_id", () => {});
