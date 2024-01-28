const supertest = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("GET /login", async () => {
    await supertest(app).get("/login").
      expect(400);
  })
});

describe("Test correct login", () => {
  test("GET /login/?email=tatygraesser%40gmail.com&password=password", async () => {
    await supertest(app).get("/login/?email=tatygraesser%40gmail.com&password=password").
      expect(200);
  })
});

describe("Test incorrect login", () => {
  test("GET /login/?email=no&password=no", async () => {
    await supertest(app).get("/login/?email=no&password=no").
      expect(404);
  })
});

describe("Test no email", () => {
  test("GET /login/?password=no", async () => {
    await supertest(app).get("/login/?password=no").
      expect(400);
  })
});

describe("Test no password", () => {
  test("GET /login/?email=no", async () => {
    await supertest(app).get("/login/?email=no").
      expect(400);
  })
});