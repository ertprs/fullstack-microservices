import request from "supertest";
import { app } from "../../app";

it("has a route listening to post requests to /api/tickets", async (): Promise<
  void
> => {
  const response = await request(app).post("/api/tickets").send({});
  expect(response.status).not.toEqual(404);
});
it("access if user is signed in", async (): Promise<void> => {});
it("error if invalid title", async (): Promise<void> => {});
it("error if invalid price", async (): Promise<void> => {});
it("creates a ticket with valid inputs", async (): Promise<void> => {});
