import request from "supertest";
import app from "../../app";

it("can sign in", async () => {
  await global.signin();

  await request(app)
    .post("/api/users/signin")
    .send({
      email: "tester@test.com",
      password: "iam12years",
    })
    .expect(200);
});

it("shows error when sign in without signup", async () => {
  await request(app)
    .post("/api/users/signin")
    .send({
      email: "tester@test.com",
      password: "iam12years",
    })
    .expect(400);
});
