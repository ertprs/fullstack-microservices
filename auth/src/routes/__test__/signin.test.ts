import request from "supertest";
import { app } from "../../app";

it("sets header cookie on succesful sign in", async (): Promise<void> => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  const res = await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "password" })
    .expect(200);
  expect(res.get("Set-Cookie")).toBeDefined();
});
it("expect 401 with invalid creds", async (): Promise<void> => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" });
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@test.com", password: "passw" })
    .expect(401);
});
it("expect 401 with invalid creds", async (): Promise<void> => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" });
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@tes.com", password: "password" })
    .expect(401);
});
it("expect 401 with no user with that email", async (): Promise<void> => {
  await request(app)
    .post("/api/users/signin")
    .send({ email: "test@tes.com", password: "password" })
    .expect(401);
});
