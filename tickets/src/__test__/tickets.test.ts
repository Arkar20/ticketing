import request from "supertest";
import app from "../app";

it("has a route that returns all tickets", async () => {
  const response = await request(app).get("/api/tickets");

  expect(response.status).not.toEqual(404);
});
it("requires to login first", async () => {
  const response = await request(app).get("/api/tickets");

  expect(response.status).not.toEqual(403);
});
