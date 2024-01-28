const supertest = require("supertest");
const app = require("../app");

describe("Test the root path", () => {
  test("GET /tasks/", async () => {
    await supertest(app).get("/tasks").
      expect(400);
  })
});

describe("Test GET all tasks with good id", () => {
    test("GET /tasks/?groupid=40e6215d-b5c6-4886-987c-f30f3678f608", async () => {
      await supertest(app).get("/tasks/?groupid=40e6215d-b5c6-4886-987c-f30f3678f608").
        expect(200);
    })
});

describe("Test GET all tasks with bad id", () => {
    test("GET /tasks/?groupid=0", async () => {
      await supertest(app).get("/tasks/?groupid=0").
        expect(404);
    })
});

describe("Test GET one task with good task id", () => {
    test("GET /tasks/?groupid=40e6215d-b5c6-4886-987c-f30f3678f608&taskid=361431c0-c0ec-47ab-b180-2cceb9e0dd60", async () => {
      await supertest(app).get("/tasks/?groupid=40e6215d-b5c6-4886-987c-f30f3678f608&taskid=361431c0-c0ec-47ab-b180-2cceb9e0dd60").
        expect(200);
    })
});

describe("Test GET one task with bad task id", () => {
    test("GET /tasks/?groupid=40e6215d-b5c6-4886-987c-f30f3678f608&taskid=0", async () => {
      await supertest(app).get("/tasks/?groupid=40e6215d-b5c6-4886-987c-f30f3678f608&taskid=0").
        expect(404);
    })
});

describe("Test GET one task with bad group id", () => {
    test("GET /tasks/?groupid=1&taskid=0", async () => {
      await supertest(app).get("/tasks/?groupid=0&taskid=1").
        expect(404);
    })
}); //broken

describe("Test GET one task with no group id", () => {
    test("GET /tasks/?taskid=361431c0-c0ec-47ab-b180-2cceb9e0dd60", async () => {
      await supertest(app).get("/tasks/?taskid=361431c0-c0ec-47ab-b180-2cceb9e0dd60").
        expect(400);
    })
});


describe("Test POST new task with good id", () => {
    test("POST /tasks/?groupid=154ec7b8-8d90-48eb-a227-99aaf5fc868b", async () => {
      const data = {
        groupid : '154ec7b8-8d90-48eb-a227-99aaf5fc868b',
        name : "tasktest", 
        assigned : "08471f89-7d6c-4af9-9bec-02cab4270d62",
        description : "hi",
        creationDate : "4/20/6969",
        dueDate : "01/23/4567"
      }
      await supertest(app).post("/tasks/?groupid=154ec7b8-8d90-48eb-a227-99aaf5fc868b").send(data).
        expect(201);
    })
});
/*
i still dont know how to put jsons in the hting help
*/ 

describe("Test creating new task with bad id", () => {
    test("POST /tasks/?groupid=0", async () => {
      const data = {}

      await supertest(app).post("/tasks/?groupid=0").send(data).
        expect(500);
    })
}); 
//stepbro im stuck

describe("Test creating new task with no id", () => {
    test("POST /tasks/", async () => {
      const data = {}
      await supertest(app).post("/tasks/").send(data).
        expect(400);
    })
});

describe("Test marking task as complete", () => {
  const data = {
    completed : true
  }

  test("PATCH /tasks/?groupid=40e6215d-b5c6-4886-987c-f30f3678f608&taskid=6ce657a3-b3c3-4359-ad0f-1e92feb40f41", async () => {
    await supertest(app).patch("/tasks/?groupid=40e6215d-b5c6-4886-987c-f30f3678f608&taskid=6ce657a3-b3c3-4359-ad0f-1e92feb40f41").send(data).
      expect(201);
  })
});

describe("Test commenting", () => {
  const data = {
    commentor : '08471f89-7d6c-4af9-9bec-02cab4270d62',
    comment : "dumb"
  }

  test("PATCH /tasks/?groupid=40e6215d-b5c6-4886-987c-f30f3678f608&taskid=6ce657a3-b3c3-4359-ad0f-1e92feb40f41", async () => {
    await supertest(app).patch("/tasks/?groupid=40e6215d-b5c6-4886-987c-f30f3678f608&taskid=6ce657a3-b3c3-4359-ad0f-1e92feb40f41").send(data).
      expect(201);
  })
});

describe("Test bad request for updating a task with new information", () => {
    test("PATCH /tasks/?groupid=1&taskid=1", async () => {
      const data = {}
      await supertest(app).patch("/tasks/?groupid=1").send(data).
        expect(400);
    })
});

/*
describe("Test deleting a task", () => {
    test("DELETE /tasks/?groupid=1&taskid=1", async () => {
      await supertest(app).delete("/tasks/?groupid=1&taskid=1").
        expect(200);
    })
});
*/

describe("Test bad request to delete a task", () => {
    test("DELETE /tasks/", async () => {
      await supertest(app).delete("/tasks/").
        expect(400);
    })
});