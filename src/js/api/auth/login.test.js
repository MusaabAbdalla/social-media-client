import { apiPath } from "../constants.js";
import { login } from "./login.js";
import { headers } from "../headers.js";
import { save } from "../../storage/save.js";

global.fetch = jest.fn();
jest.mock("../../storage/save.js");
const userData = {
  email: "fakeuser@noroff.com",
  password: "122aasdf",
};
const { email, password } = userData;

describe("Login Function", () => {
  it("stores the function in the localStorage", async () => {
    global.fetch.mockResolvedValue({
      ok: true,
      json: async () => ({ accessToken: "ABDDAFDSAFSDAFSDAFSDAFSDAFSDAAF" }),
    });

    await login(userData.email, userData.password);
    expect(global.fetch).toHaveBeenCalledWith(`${apiPath}/social/auth/login`, {
      method: "post",
      body: JSON.stringify({ email, password }),
      headers: headers("application/json"),
    });

    expect(save).toHaveBeenCalledWith(
      "token",
      "ABDDAFDSAFSDAFSDAFSDAFSDAFSDAAF",
    );
  });
});
