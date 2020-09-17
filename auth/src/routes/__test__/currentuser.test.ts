import request from "supertest";
import { app } from "../../app";
import { signin } from "../../test/setup";

it("gets the current user", async (): Promise<void> => {
  const cookie = await signin();
  const response = await request(app)
    .get("/api/users/currentuser")
    .set("Cookie", cookie)
    .expect(200);
  expect(response.body.currentUser.email).toEqual("test@test.com");
});

it("returns null if no current user", async (): Promise<void> => {
  await signin();
  const response = await request(app).get("/api/users/currentuser").expect(200);
  expect(response.body.currentUser).toBeNull();
});
