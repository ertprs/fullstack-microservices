import request from "supertest";

import { app } from "../../app";
import { signin } from "../../test/setup";

it("removes cookie on signout", async (): Promise<void> => {
  const cookie = await signin();
  const res = await request(app)
    .post("/api/users/signout")
    .set("Cookie", cookie)
    .expect(200);
  expect(res.get("Set-Cookie")).toBeDefined();
});
