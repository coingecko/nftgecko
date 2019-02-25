import W3Actions from "src/store/web3/actions";
import W3Mutations from "src/store/web3/mutations";
import { Web3ActionName } from "src/store/web3/names";
import W3State from "src/store/web3/state";
import Vue from "vue";
import Vuex, { Store } from "vuex";

Vue.use(Vuex);

// mock web3Instance
jest.mock("src/boot/web3", () => ({
  web3Instance: {
    getId() {
      return 77;
    },
    setWeb3() {}
  }
}));

// mock
jest.mock("src/helper/notifications", () => ({
  errorNotification: jest.fn(),
  successNotification: jest.fn()
}));

describe("[Web3 actions]", () => {
  let store: Store<typeof W3State>;

  beforeEach(() => {
    store = new Vuex.Store({
      state: W3State,
      actions: W3Actions,
      mutations: W3Mutations
    });
  });

  it("setNetwork with id", (done) => {
    const testId = 100;
    store
      .dispatch(Web3ActionName.setNetwork, testId)
      .then((res) => {
        expect(store.state.network).toEqual(testId);
        done();
      })
      .catch((err) => console.error(err));
  });

  it("setNetwork with without id", async () => {
    await store.dispatch(Web3ActionName.setNetwork);
    expect(store.state.network).toEqual(77);
  });

  it("initialize web3 if ethereum exist", async () => {
    // @ts-ignore
    global.ethereum = { enable: jest.fn() };
    await store.dispatch(Web3ActionName.initializeWeb3);
    expect(store.state.network).toBe(77);
    expect(store.state.initialized).toBe(true);
    expect(store.state.status).toBe("login");
    expect(store.state.loading).toBe(false);
  });

  it("initialize web3 if ethereum not exist", async () => {
    // @ts-ignore
    global.ethereum = false;
    await store.dispatch(Web3ActionName.initializeWeb3);
    expect(store.state.network).toBe(77);
    expect(store.state.initialized).toBe(true);
    expect(store.state.status).toBe("logout");
    expect(store.state.loading).toBe(false);
  });
});
