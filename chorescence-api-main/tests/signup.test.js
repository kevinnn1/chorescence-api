const supertest = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("POST /signup", async () => {
    await supertest(app).post("/signup").
      expect(400);
  })
});

describe("Test missing email", () => {
  test("POST /signup", async () => {
    await supertest(app).post("/signup/?password=password&fname=Billy&lname=Bob&username=billybob").
      expect(400);
  })
});

describe("Test missing password", () => {
  test("POST /signup", async () => {
    await supertest(app).post("/signup/?email=billybob%40gmail.com&fname=Billy&lname=Bob&username=billybob").
      expect(400);
  })
});

describe("Test missing fname", () => {
  test("POST /signup", async () => {
    await supertest(app).post("/signup/?email=billybob%40gmail.com&password=&lname=Bob&username=billybob").
      expect(400);
  })
});

describe("Test missing lname", () => {
  test("POST /signup", async () => {
    await supertest(app).post("/signup/?email=billybob%40gmail.com&password=&fname=Bob&username=billybob").
      expect(400);
  })
});

describe("Test missing username", () => {
  test("POST /signup", async () => {
    await supertest(app).post("/signup/?email=billybob%40gmail.com&password=&fname=Billy&lname=Bob").
      expect(400);
  })
});






