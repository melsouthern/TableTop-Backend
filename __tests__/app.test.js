const db = require("../db/connection.js");
const testData = require("../db/data/test-data/index.js");
const seed = require("../db/seeds/seed.js");
const app = require("../app");
const request = require("supertest");
const { toBeSortedBy } = require("jest-sorted");
const apiDocuments = require("../endpoints.json");

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe("GET /api", () => {
  test("200: responds with a JSON describing all the available endpoints in the API", async () => {
    const result = await request(app).get("/api").expect(200);
    expect(result.body).toEqual(apiDocuments);
  });
  test("404: responds with error message if api spelled incorrectly", async () => {
    const result = await request(app).get("/aip").expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
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
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
  test("404: responds with error message if api spelled incorrectly", async () => {
    const result = await request(app).get("/aip/categories").expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
});

describe("GET /api/reviews/:review_id", () => {
  test("200: responds with the review object for the relevant review_id provided", async () => {
    const result = await request(app).get("/api/reviews/10").expect(200);
    expect(result.body.review).toEqual([
      {
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
      },
    ]);
  });
  test("404: responds with error message if reviews spelled incorrectly", async () => {
    const result = await request(app).get("/api/reeviews/10").expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
  test("404: responds with error message if review id number not found", async () => {
    const result = await request(app).get("/api/reviews/1000").expect(404);
    expect(result.body.msg).toBe(
      "Not Found - review_id provided is non-existent"
    );
  });
  test("400: responds with error message if incorrect data type provided as the review_id ", async () => {
    const result = await request(app).get("/api/reviews/cats").expect(400);
    expect(result.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
    const result1 = await request(app).get("/api/reviews/!@+$").expect(400);
    expect(result1.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
    const result2 = await request(app).get("/api/reviews/M30w").expect(400);
    expect(result2.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
  });
});

describe("PATCH /api/reviews/:review_id", () => {
  test("200: tweaks the votes property by either incrementing or decrementing the value, then responds with the updated review ", async () => {
    const result = await request(app)
      .patch("/api/reviews/3")
      .send({ inc_votes: 3 })
      .expect(200);
    expect(result.body.review).toEqual([
      {
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
      },
    ]);
    const result1 = await request(app)
      .patch("/api/reviews/3")
      .send({ inc_votes: -10 })
      .expect(200);
    expect(result1.body.review).toEqual([
      {
        review_id: 3,
        title: "Ultimate Werewolf",
        review_body: "We couldn't find the werewolf!",
        designer: "Akihisa Okui",
        review_img_url:
          "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
        votes: -2,
        category: "social deduction",
        owner: "bainesface",
        created_at: "2021-01-18T10:01:41.251Z",
      },
    ]);
  });
  test("404: responds with error message if reviews spelled incorrectly", async () => {
    const result = await request(app)
      .patch("/api/revieews/3")
      .send({ inc_votes: 3 })
      .expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
  test("404: responds with error message if review id number not found", async () => {
    const result = await request(app)
      .patch("/api/reviews/99999")
      .send({ inc_votes: 3 })
      .expect(404);
    expect(result.body.msg).toBe(
      "Not Found - review_id provided is non-existent"
    );
  });
  test("400: responds with error message if incorrect data type provided as the review_id ", async () => {
    const result = await request(app)
      .patch("/api/reviews/cats")
      .send({ inc_votes: 3 })
      .expect(400);
    expect(result.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
    const result1 = await request(app)
      .patch("/api/reviews/!@+$")
      .send({ inc_votes: 3 })
      .expect(400);
    expect(result1.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
    const result2 = await request(app)
      .patch("/api/reviews/M30w")
      .send({ inc_votes: 3 })
      .expect(400);
    expect(result2.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
  });
  test("400: responds with error message if patch content is provided in wrong format", async () => {
    const result = await request(app)
      .patch("/api/reviews/3")
      .send({ inc_votes: 4, category: "cats" })
      .expect(400);
    expect(result.body.msg).toBe("Bad Request");
  });
});

describe("GET /api/reviews", () => {
  test("200: responds with an array of reviews objects", async () => {
    const result = await request(app).get("/api/reviews").expect(200);
    result.body.reviews.forEach((review) => {
      expect(review).toMatchObject({
        review_id: expect.any(Number),
        title: expect.any(String),
        review_img_url: expect.any(String),
        votes: expect.any(Number),
        category: expect.any(String),
        owner: expect.any(String),
        created_at: expect.any(String),
        comment_count: expect.any(String),
      });
    });
    expect(result.body.reviews.length).toBe(13);
  });
  test("404: responds with error message if reviews spelled incorrectly", async () => {
    const result = await request(app).get("/api/revieews").expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
  test("404: responds with error message if api spelled incorrectly", async () => {
    const result = await request(app).get("/aip/reviews").expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
  test("200: accepts sort_by query and sort reviews by column defined", async () => {
    const ownerResult = await request(app)
      .get("/api/reviews?sort_by=owner")
      .expect(200);
    expect(ownerResult.body.reviews).toBeSortedBy("owner", {
      descending: true,
    });
    const titleResult = await request(app)
      .get("/api/reviews?sort_by=title")
      .expect(200);
    expect(titleResult.body.reviews).toBeSortedBy("title", {
      descending: true,
    });
    const reviewIdResult = await request(app)
      .get("/api/reviews?sort_by=review_id")
      .expect(200);
    expect(reviewIdResult.body.reviews).toBeSortedBy("review_id", {
      descending: true,
    });
    const categoryResult = await request(app)
      .get("/api/reviews?sort_by=category")
      .expect(200);
    expect(categoryResult.body.reviews).toBeSortedBy("category", {
      descending: true,
    });
    expect(ownerResult.body.reviews.length).toBe(13);
    expect(titleResult.body.reviews.length).toBe(13);
    expect(reviewIdResult.body.reviews.length).toBe(13);
    expect(categoryResult.body.reviews.length).toBe(13);
  });
  test("400: responds with error message when provided sort_by column is not legitimate", async () => {
    const stringResult = await request(app)
      .get("/api/reviews?sort_by=cats")
      .expect(400);
    expect(stringResult.body.msg).toBe("Bad Request");
    const numResult = await request(app)
      .get("/api/reviews?sort_by=74738383")
      .expect(400);
    expect(numResult.body.msg).toBe("Bad Request");
  });
  test("200: responds with reviews ordered by ASC or DESC if declared", async () => {
    const ascResult = await request(app)
      .get("/api/reviews?order=asc")
      .expect(200);
    expect(ascResult.body.reviews).toBeSortedBy("created_at", {
      descending: false,
    });
    const descResult = await request(app)
      .get("/api/reviews?order=desc")
      .expect(200);
    expect(descResult.body.reviews).toBeSortedBy("created_at", {
      descending: true,
    });
    expect(ascResult.body.reviews.length).toBe(13);
    expect(descResult.body.reviews.length).toBe(13);
  });
  test("400: responds with error message when provided order statement is not legitimate", async () => {
    const stringResult = await request(app)
      .get("/api/reviews?order=cats")
      .expect(400);
    expect(stringResult.body.msg).toBe("Bad Request");
    const numResult = await request(app)
      .get("/api/reviews?order=74738383")
      .expect(400);
    expect(numResult.body.msg).toBe("Bad Request");
  });
  test("200: responds to sort_by and order statement in the same path", async () => {
    const result = await request(app)
      .get("/api/reviews?sort_by=comment_count&order=asc")
      .expect(200);
    expect(result.body.reviews).toBeSortedBy("comment_count", {
      descending: false,
    });
    expect(result.body.reviews.length).toBe(13);
  });
  test("200: responds with array sorted by created_by and orders as DESC as default", async () => {
    const result = await request(app).get("/api/reviews").expect(200);
    expect(result.body.reviews).toBeSortedBy("created_at", {
      descending: true,
    });
    expect(result.body.reviews.length).toBe(13);
  });
  test("200: responds with a filtered array when category query is specified", async () => {
    const socialResult = await request(app)
      .get("/api/reviews?category=social_deduction")
      .expect(200);
    socialResult.body.reviews.forEach((review) => {
      expect(review).toMatchObject({
        review_id: expect.any(Number),
        title: expect.any(String),
        review_img_url: expect.any(String),
        votes: expect.any(Number),
        category: "social deduction",
        owner: expect.any(String),
        created_at: expect.any(String),
        comment_count: expect.any(String),
      });
    });
    expect(socialResult.body.reviews.length).toBe(11);
    const euroResult = await request(app)
      .get("/api/reviews?category=euro_game")
      .expect(200);
    euroResult.body.reviews.forEach((review) => {
      expect(review).toMatchObject({
        review_id: expect.any(Number),
        title: expect.any(String),
        review_img_url: expect.any(String),
        votes: expect.any(Number),
        category: "euro game",
        owner: expect.any(String),
        created_at: expect.any(String),
        comment_count: expect.any(String),
      });
    });
    expect(euroResult.body.reviews.length).toBe(1);
  });
  test("400: responds with error message when provided category statement is not legitimate", async () => {
    const stringResult = await request(app)
      .get("/api/reviews?category=cats!")
      .expect(400);
    expect(stringResult.body.msg).toBe("Bad Request");
    const numResult = await request(app)
      .get("/api/reviews?order=74736763")
      .expect(400);
    expect(numResult.body.msg).toBe("Bad Request");
  });
  test("200: category query, sort_by query and order query work together to provide result", async () => {
    const result = await request(app)
      .get(
        "/api/reviews?sort_by=comment_count&order=asc&category=social_deduction"
      )
      .expect(200);
    expect(result.body.reviews).toBeSortedBy("comment_count", {
      descending: false,
    });
    expect(result.body.reviews.length).toBe(11);
    result.body.reviews.forEach((review) => {
      expect(review).toMatchObject({
        review_id: expect.any(Number),
        title: expect.any(String),
        review_img_url: expect.any(String),
        votes: expect.any(Number),
        category: "social deduction",
        owner: expect.any(String),
        created_at: expect.any(String),
        comment_count: expect.any(String),
      });
    });
  });
});

describe("GET /api/reviews/:review_id/comments", () => {
  test("200: responds with an array of comments for the provided review_id", async () => {
    const result = await request(app)
      .get("/api/reviews/2/comments")
      .expect(200);
    expect(result.body.comments).toEqual([
      {
        comment_id: 1,
        votes: 16,
        created_at: "2017-11-22T12:43:33.389Z",
        author: "bainesface",
        body: "I loved this game too!",
      },
      {
        comment_id: 4,
        votes: 16,
        created_at: "2017-11-22T12:36:03.389Z",
        author: "bainesface",
        body: "EPIC board game!",
      },
      {
        comment_id: 5,
        votes: 13,
        created_at: "2021-01-18T10:24:05.410Z",
        author: "mallionaire",
        body: "Now this is a story all about how, board games turned my life upside down",
      },
    ]);
  });
  test("404: responds with error message if reviews spelled incorrectly", async () => {
    const result = await request(app)
      .get("/api/revieews/2/comments")
      .expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
  test("404: responds with error message if api spelled incorrectly", async () => {
    const result = await request(app)
      .get("/aip/reviews/3/comments")
      .expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
  test("404: responds with error message if review id number not found", async () => {
    const result = await request(app)
      .get("/api/reviews/99999/comments")
      .expect(404);
    expect(result.body.msg).toBe(
      "Not Found - review_id provided is non-existent"
    );
  });
  test("400: responds with error message if incorrect data type provided as the review_id ", async () => {
    const result = await request(app)
      .get("/api/reviews/cats/comments")
      .expect(400);
    expect(result.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
    const result1 = await request(app)
      .get("/api/reviews/!@+$/comments")
      .expect(400);
    expect(result1.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
    const result2 = await request(app)
      .get("/api/reviews/M30w/comments")
      .expect(400);
    expect(result2.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
  });
});

describe("POST /api/reviews/:review_id/comments", () => {
  test("201: responds with the posted comment", async () => {
    const result = await request(app)
      .post("/api/reviews/2/comments")
      .send({ username: "dav3rid", body: "my cat loves this game!" })
      .expect(201);
    expect(result.body.comment[0]).toMatchObject({
      comment_id: expect.any(Number),
      votes: 0,
      created_at: expect.any(String),
      author: "dav3rid",
      body: "my cat loves this game!",
    });
  });
  test("404: responds with error message if reviews spelled incorrectly", async () => {
    const result = await request(app)
      .post("/api/revieews/9/comments")
      .send({ username: "dav3rid", body: "my cat loves this game!" })
      .expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
  test("404: responds with error message if comments spelled incorrectly", async () => {
    const result = await request(app)
      .post("/api/revieews/9/commeents")
      .send({ username: "dav3rid", body: "my cat loves this game!" })
      .expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
  test("404: responds with error message if api spelled incorrectly", async () => {
    const result = await request(app)
      .post("/aip/reviews/9/comments")
      .send({ username: "dav3rid", body: "my cat loves this game!" })
      .expect(404);
    expect(result.body.msg).toBe("Invalid URL - incorrect path provided");
  });
  test("404: responds with error message if review id number not found", async () => {
    const result = await request(app)
      .post("/api/reviews/900000/comments")
      .send({ username: "dav3rid", body: "my cat loves this game!" })
      .expect(404);
    expect(result.body.msg).toBe(
      "Not Found - review_id provided is non-existent"
    );
  });
  test("400: responds with error message if incorrect data type provided as the review_id", async () => {
    const result = await request(app)
      .post("/api/reviews/cats/comments")
      .send({ username: "dav3rid", body: "my cat loves this game!" })
      .expect(400);
    expect(result.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
    const result1 = await request(app)
      .post("/api/reviews/!!!/comments")
      .send({ username: "dav3rid", body: "my cat loves this game!" })
      .expect(400);
    expect(result1.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
    const result2 = await request(app)
      .post("/api/reviews/me3330w/comments")
      .send({ username: "dav3rid", body: "my cat loves this game!" })
      .expect(400);
    expect(result2.body.msg).toBe(
      "Invalid Data Type - review_id provided is not an authorised input"
    );
  });
  test("404: responds with error message if user provided does not exist", async () => {
    const result = await request(app)
      .post("/api/reviews/2/comments")
      .send({
        username: "catLady400",
        body: "My 24 cats love to chew on the blocks",
      })
      .expect(404);
    expect(result.body.msg).toBe("User Non-Existent");
  });
  test("400: responds with error message if post content is provided in wrong format", async () => {
    const result = await request(app)
      .post("/api/reviews/2/comments")
      .send({ user: "dav3rid", bod: "my cat loves this game!" })
      .expect(400);
    expect(result.body.msg).toBe("Bad Request");
  });
});
