import request from "supertest";
import app from "../app";

it("has a route that returns all tickets", async () => {
  const response = await request(app).post("/api/tickets");

  expect(response.status).not.toEqual(404);
});
it("requires to login first", async () => {
  const response = await request(app).post("/api/tickets");

  expect(response.status).toEqual(401);
});
it("only login user can access the route", () => {
  request
    .agent(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send()
    .end((err, response) => {
      expect(response.status).toEqual(200);
    });
});
