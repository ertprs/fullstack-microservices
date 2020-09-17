import request from "supertest";
import { app } from "../../app";

it("returns a status of 201 on success", async (): Promise<request.Test> => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password " })
    .expect(201);
});
it("returns a status of 401 with invalid email", async (): Promise<
  request.Test
> => {
  return request(app)
    .post("/api/users/signup")
    .send({ email: "testtest.com", password: "password " })
    .expect(401);
});
it("returns a status of 401 with invalid email and password", async (): Promise<
  request.Test
> => {
  return request(app).post("/api/users/signup").send({}).expect(401);
});

it("returns a status of 401 with email and password exists", async (): Promise<
  request.Test
> => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password " })
    .expect(201);

  return await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password " })
    .expect(401);
});
it("sets a cookie on successful sign up", async (): Promise<void> => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password " })
    .expect(201);
  expect(response.get("Set-Cookie")).toBeDefined();
});
