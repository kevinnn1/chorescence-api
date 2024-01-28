const supertest = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("GET /", async () => {
    await supertest(app).get("/").
      expect(400);
  })
});