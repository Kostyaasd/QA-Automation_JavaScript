import axios from "axios";
import { expect } from "chai";
import hooks from "../hooks.js";

describe.only("Test Blockchain", async function () {
  this.timeout(19000);
  describe("Blockchain Positive Test", async () => {
    it("Status 200,'On the Ethereum network'", async () => {
      const chainId = 1;
      const response = await axios.get(
        hooks.apiUrlbaza + hooks.apiUrBlockchain,
        {
          params: { chainId },
        }
      );

      expect(response.status).to.equal(200);
    });

    it("Status 200,'On the Binance Smart Chain network'", async () => {
      const chainId = 56;
      const response = await axios.get(
        hooks.apiUrlbaza + hooks.apiUrBlockchain,
        {
          params: { chainId },
        }
      );

      expect(response.status).to.equal(200);
    });
  });

  describe("Blockchain Negative Test", async () => {
    it("chainId = '' ", async () => {
      try {
        const chainId = "";
        const response = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrBlockchain,
          {
            params: { chainId },
          }
        );
      } catch (error) {
        expect(error.response.data.statusCode).to.equal(400);
        // console.log(error.response.data.message);
      }
    });

    it("chainId = '77' ", async () => {
      try {
        const chainId = "77";
        const response = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrBlockchain,
          {
            params: { chainId },
          }
        );
      } catch (error) {
        expect(error.response.data.statusCode).to.equal(400);
        // console.log(error.response.data.message);
      }
    });

    it("chainId = '!' ", async () => {
      try {
        const chainId = "!";
        const response = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrBlockchain,
          {
            params: { chainId },
          }
        );
      } catch (error) {
        expect(error.response.data.statusCode).to.equal(400);
        // console.log(error.response.data.message);
      }
    });
  });
});
