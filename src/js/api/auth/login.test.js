// import { createMockFetch } from "../../../mocks/fetch.mock";
// import { localStorageMock } from "../../../mocks/localStorage.mock";
import * as mocks from "../../../mocks";
import { login } from "./login";
import { load } from "../../storage";

const userResposeClone = () => ({ ...mocks.authResponse });

describe("login", () => {
  beforeEach(() => {
    global.fetch = mocks.createMockFetch(userResposeClone);
    global.localStorage = mocks.localStorageMock();
  });
  afterEach(() => {
    global.fetch.mockClear();
    global.localStorage.clear();
  });
  afterEach(() => {
    global.fetch.mockClear();
    global.localStorage.clear();
  });
  it("Should set the token with a successful login", async () => {
    // global.fetch = mocks.createMockFetch(mocks.authResponse)
    await login(mocks.userData.email, mocks.userData.password);
    expect(load("token")).toBe(mocks.accesToken);
  });
  it("should return the user name with successful login", async () => {
    const result = await login(mocks.userData.email, mocks.userData.password);
    expect(result.name).toEqual(mocks.userData.name);
  });
});
