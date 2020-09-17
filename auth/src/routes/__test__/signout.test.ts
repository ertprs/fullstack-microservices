import request from "supertest";
import { app } from "../../app";

it("removes cookie on signout", async (): Promise<void> => {
  await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);
  const res = await request(app).post("/api/users/signout").expect(200);
  expect(res.get("Set-Cookie")).toBeDefined();
});
