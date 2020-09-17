import request from "supertest";
import { app } from "../../app";

it("returns a status of 201 on success", async (): Promise<request.Test> => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password " })
    .expect(201);
});
it("returns a status of 400 with invalid email", async (): Promise<
  request.Test
> => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "testtest.com", password: "password " })
    .expect(401);
});
