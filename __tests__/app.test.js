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
  test("404: responds with error message if categories spelled incorrectly", async () => {
    const result = await request(app).get("/api/categraies").expect(404);
    expect(result.body.msg).toBe("Invalid URL");
  });
  test("404: responds with error message if api spelled incorrectly", async () => {
    const result = await request(app).get("/aip/categories").expect(404);
    expect(result.body.msg).toBe("Invalid URL");
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("200: responds with the review object for the relevant review_id provided", async () => {
    const result = await request(app).get("/api/reviews/10").expect(200);
    expect(result.body.review).toMatchObject({
      review_id: 10,
      title: "Build you own tour de Yorkshire",
      review_body:
        "Cold rain pours on the faces of your team of cyclists, you pulled to the front of the pack early and now your taking on exhaustion cards like there is not tomorrow, you think there are about 2 hands left until you cross the finish line, will you draw enough from your deck to cross before the other team shoot passed? Flamee Rouge is a Racing deck management game where you carefully manage your deck in order to cross the line before your opponents, cyclist can fall slyly behind front runners in their slipstreams to save precious energy for the prefect moment to burst into the lead ",
      designer: "Asger Harding Granerud",
      review_img_url:
        "https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
      votes: 10,
      category: "social deduction",
      owner: "mallionaire",
      created_at: "2021-01-18T10:01:41.251Z",
      comment_count: "0",
    });
  });
  test("404: responds with error message if reviews spelled incorrectly", async () => {
    const result = await request(app).get("/api/reeviews/10").expect(404);
    expect(result.body.msg).toBe("Invalid URL");
  });
  test("404: responds with error message if review id number not found", async () => {
    const result = await request(app).get("/api/reviews/1000").expect(404);
    expect(result.body.msg).toBe("Id Not Found");
  });
  test("400: responds with error message if incorrect data type provided as the review_id ", async () => {
    const result = await request(app).get("/api/reviews/cats").expect(400);
    expect(result.body.msg).toBe("Invalid Data Type");
    const result1 = await request(app).get("/api/reviews/!@+$").expect(400);
    expect(result1.body.msg).toBe("Invalid Data Type");
    const result2 = await request(app).get("/api/reviews/M30w").expect(400);
    expect(result2.body.msg).toBe("Invalid Data Type");
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("200: tweaks the votes property by either incrementing or decrementing the value, then responds with the updated review ", async () => {
    const result = await request(app)
      .patch("/api/reviews/3")
      .send({ inc_votes: 3 })
      .expect(200);
    expect(result.body.review).toMatchObject({
      review_id: 3,
      title: "Ultimate Werewolf",
      review_body: "We couldn't find the werewolf!",
      designer: "Akihisa Okui",
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      votes: 8,
      category: "social deduction",
      owner: "bainesface",
      created_at: "2021-01-18T10:01:41.251Z",
      comment_count: "3",
    });
    const result1 = await request(app)
      .patch("/api/reviews/3")
      .send({ inc_votes: -10 })
      .expect(200);
    expect(result1.body.review).toMatchObject({
      review_id: 3,
      title: "Ultimate Werewolf",
      review_body: "We couldn't find the werewolf!",
      designer: "Akihisa Okui",
      review_img_url:
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      votes: -5,
      category: "social deduction",
      owner: "bainesface",
      created_at: "2021-01-18T10:01:41.251Z",
      comment_count: "3",
    });
  });
  test("404: responds with error message if reviews spelled incorrectly", async () => {
    const result = await request(app)
      .patch("/api/revieews/3")
      .send({ inc_votes: 3 })
      .expect(404);
    expect(result.body.msg).toBe("Invalid URL");
  });
  test("404: responds with error message if review id number not found", async () => {
    const result = await request(app)
      .patch("/api/reviews/99999")
      .send({ inc_votes: 3 })
      .expect(404);
    expect(result.body.msg).toBe("Id Not Found");
  });
  test("400: responds with error message if incorrect data type provided as the review_id ", async () => {
    const result = await request(app)
      .patch("/api/reviews/cats")
      .send({ inc_votes: 3 })
      .expect(400);
    expect(result.body.msg).toBe("Invalid Data Type");
    const result1 = await request(app)
      .patch("/api/reviews/!@+$")
      .send({ inc_votes: 3 })
      .expect(400);
    expect(result1.body.msg).toBe("Invalid Data Type");
    const result2 = await request(app)
      .patch("/api/reviews/M30w")
      .send({ inc_votes: 3 })
      .expect(400);
    expect(result2.body.msg).toBe("Invalid Data Type");
  });
  test("400: responds with error message if patch content is provided in wrong format", async () => {
    const result = await request(app)
      .patch("/api/reviews/3")
      .send({ inc_votes: 4, category: "cats" })
      .expect(400);
    expect(result.body.msg).toBe("Bad Request");
  });
});
