const { response } = require("express");
const supertest = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("GET /group/", async () => {
    await supertest(app).get("/group").
      expect(400);
  })
});

describe("Test GET group info with good id", () => {
    test("GET /group/?id=08471f89-7d6c-4af9-9bec-02cab4270d62", async () => {
      await supertest(app).get("/group/?id=08471f89-7d6c-4af9-9bec-02cab4270d62").
        expect(200);
    })
});

describe("Test GET group info with bad id", () => {
    test("GET /group/?id=0", async () => {
      await supertest(app).get("/group/?id=0").
        expect(404);
    })
});


describe("Test creating group info and deleting it", () => {
  const data = {userId: "40e6215d-b5c6-4896-987c-f30f3678f608", groupName:"Jest Test"};
  let id;
  test("POST /group/create/", async () => {
      await supertest(app)
      .post("/group/create/?userid=0")
      .send(data)
      .expect(201)    
      .then(response =>{ id = response.body.id})
  });
    test("DELETE /group/", async () => {
      await supertest(app)
      .delete(`/group/delete/?id=${id}`)
      .expect(200);
    });
}); 

describe("Test creating group info with no id", () => {
    test("POST /group/create/", async () => {
      await supertest(app).post("/group/create").
        expect(400);
    })
});

//Editing Group Info Not Implemented
// describe("Test updating a group with new information", () => {
//     test("PATCH /group/?id=2", async () => {
//       await supertest(app).patch("/group/?id=08471f89-7d6c-4af9-9bec-02cab4270d62").
//         expect(201);
//     })
// }); //currently doesnt do anything lol

// describe("Test bad request for updating a group with new information", () => {
//     test("PATCH /group/", async () => {
//       await supertest(app).patch("/group/").
//         expect(400);
//     })
// });

// describe("Test request for updating a group with new information that doesn't exist", () => {
//   test("PATCH /group/", async () => {
//     await supertest(app).patch("/group/?id=0").
//       expect(500);
//   })
// });

// describe("Test adding a new user to a group", () => {
//     test("PATCH /group/join/?id=154ec7b8-8d90-48eb-a227-99aaf5fc868b&userid=08471f89-7d6c-4af9-9bec-02cab4270d62", async () => {
//       await supertest(app).patch("/group/join/?id=154ec7b8-8d90-48eb-a227-99aaf5fc868b&userid=08471f89-7d6c-4af9-9bec-02cab4270d62").
//         expect(200);
//     })
// });

// describe("Test bad request adding a new user to a group", () => {
//     test("PATCH /group/join/?id=2", async () => {
//       await supertest(app).patch("/group/join/?id=2&userid=2").
//         expect(500);
//     })
// });

// describe("Test bad request adding a new user to a group, no userid", () => {
//   test("PATCH /group/join/?id=2", async () => {
//     await supertest(app).patch("/group/join/?id=2").
//       expect(400);
//   })
// });

describe("Test bad request adding a new user to a group, no group ID", () => {
  test("PATCH /group/join/?id=2", async () => {
    await supertest(app).patch("/group/join/?userid=2").
      expect(400);
  })
});

//missing params test gets stuck so we will ignore that for now


// describe("Test bad request to delete a group", () => {
//     test("DELETE /group/", async () => {
//       await supertest(app).delete("/group/?id=4").
//         expect(404);
//     })
// });