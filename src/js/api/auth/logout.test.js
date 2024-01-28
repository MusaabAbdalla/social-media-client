import { logout } from "./logout.js";
import { remove } from "../../storage/index.js";

jest.mock("../../storage/index.js", () => ({
  remove: jest.fn(),
}));

describe("logout", () => {
  it("clears the token from the localStorage", () => {
    logout();

    expect(remove).toHaveBeenCalledWith("token");
  });
});
