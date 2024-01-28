const supertest = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("GET /user/", async () => {
    await supertest(app).get("/user").
      expect(400);
  })
});

describe("Test GET user info with good id", () => {
    test("GET /user/?id=40e6215d-b5c6-4896-987c-f30f3678f608", async () => {
      await supertest(app).get("/user/?id=40e6215d-b5c6-4896-987c-f30f3678f608").
        expect(200);
    })
});

describe("Test GET user info with bad id", () => {
    test("GET /user/?id=0", async () => {
      await supertest(app).get("/user/?id=0").
        expect(404);
    })
});

describe("Test GET user groups with good id", () => {
  test("GET /user/groups/?id=40e6215d-b5c6-4896-987c-f30f3678f608", async () => {
    await supertest(app).get("/user/groups/?id=40e6215d-b5c6-4896-987c-f30f3678f608").
      expect(200);
  })
});

describe("Test GET user groups with bad id", () => {
  test("GET /user/groups/?id=0", async () => {
    await supertest(app).get("/user/groups/?id=0").
      expect(500);
  })
});

describe("Test GET user groups with no id", () => {
  test("GET /user/groups", async () => {
    await supertest(app).get("/user/groups").
      expect(400);
  })
});




describe("Test creating new user, no body", () => {
    test("POST /user/create", async () => {
      await supertest(app).post("/user/create").
        expect(400);
    })
});

//PATCH Route not implemented
// describe("Test updating a user with new information", () => {
//     test("PATCH /user/?id=2", async () => {
//       await supertest(app).patch("/user/?id=2").
//         expect(200);
//     })
// });

// describe("Test bad request for updating a user", () => {
//     test("PATCH /user/", async () => {
//       await supertest(app).patch("/user/").
//         expect(400);
//     })
// });

// describe("Test bad request for updating user (bad ID)", () => {
//   test("PATCH /user/?id=0", async () => {
//     await supertest(app).patch("/user/?id=0").
//       expect(404);
//   })
// });

// // describe("Test adding a new user to a group", () => {
// //     test("PATCH /group/join/?id=2&userid=2", async () => {
// //       await supertest(app).patch("/group/join/?id=2&userid=2").
// //         expect(200);
// //     })
// // });

// describe("Test bad request adding a new user to a group", () => {
//     test("PATCH /group/join/?id=2", async () => {
//       await supertest(app).patch("/group/join/?id=2").
//         expect(400);
//     })
// });