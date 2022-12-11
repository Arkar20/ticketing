import request from "supertest";
import app from "../../app";

it("can retrieve sign in user", async () => {
  const authResponse = await request(app)
    .post("/api/users/signup")
    .send({
      email: "tester@test.com",
      password: "iam12years",
    })
    .expect(201);

  const auth = authResponse.body;

  const cookie = authResponse.get("Set-Cookie");

  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .send()
    .expect(200);

  expect(auth.id).toEqual(response.body.currentUser.id);
});
