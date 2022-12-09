import request from "supertest";
import app from "../../app";

const url = "/api/users/signup";
it("can signup", async () => {
  return request(app)
    .post(url)
    .send({
      email: "tester@test.com",
      password: "iam12years",
    })
    .expect(201);
});

it("requires email field", async () => {
  return request(app)
    .post(url)
    .send({
      email: "",
      password: "iam12years",
    })
    .expect(400);
});

it("requires password field", async () => {
  return request(app)
    .post(url)
    .send({
      email: "test@test.com",
      password: "",
    })
    .expect(400);
});

it("requires correct email type", async () => {
  return request(app)
    .post(url)
    .send({
      email: "test.com",
      password: "iam12years",
    })
    .expect(400);
});

it("accept only unique email", async () => {
  await request(app)
    .post(url)
    .send({
      email: "test@test.com",
      password: "iam12years",
    })
    .expect(201);
  await request(app)
    .post(url)
    .send({
      email: "test@test.com",
      password: "iam12years",
    })
    .expect(400);
});
