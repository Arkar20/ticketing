import request from "supertest";
import app from "../../app";

it("can signup", async () => {
  return request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "iam12years",
    })
    .expect(201);
});
