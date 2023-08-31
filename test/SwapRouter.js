import axios from "axios";
import { expect } from "chai";
import hooks from "../hooks.js";
import * as dotenv from "dotenv";
dotenv.config();

describe.only("Test Swap router", async function () {
  this.timeout(15000);
  describe("Test `Get quote`", () => {
    describe("Positive test `Get quote`", async () => {
      it("Checks that 'value' exists (not equal to 'null' and not 'undefined')", async () => {
        const response = await axios.get(hooks.apiUrlbaza + hooks.apiUrlQuote, {
          params: hooks.tokenToBnbQuote,
          headers: { Authorization: process.env.AntiSandwichFree },
        });

        expect(response.data).to.exist;
      });

      it("Swap token to Bnb, status 200", async () => {
        const response = await axios.get(hooks.apiUrlbaza + hooks.apiUrlQuote, {
          params: hooks.tokenToBnbQuote,
          headers: { Authorization: process.env.AntiSandwichFree },
        });

        expect(response.status).to.equal(200);
        // console.log(response.status);
      });

      it("Swap token to Bnb, statusText ", async () => {
        const response = await axios.get(hooks.apiUrlbaza + hooks.apiUrlQuote, {
          params: hooks.tokenToBnbQuote,
          headers: { Authorization: process.env.AntiSandwichFree },
        });

        expect(response.statusText.toLowerCase()).to.equal("ok");
        // console.log(response.statusText);
      });

      it("Swap token to Eth, status 200", async () => {
        const response = await axios.get(hooks.apiUrlbaza + hooks.apiUrlQuote, {
          params: hooks.tokenToEthQuote,
          headers: { Authorization: process.env.AntiSandwichFree },
        });

        expect(response.status).to.equal(200);
        // console.log(response.status);
      });

      it("Swap token to Eth, statusText ", async () => {
        const response = await axios.get(hooks.apiUrlbaza + hooks.apiUrlQuote, {
          params: hooks.tokenToEthQuote,
          headers: { Authorization: process.env.AntiSandwichFree },
        });

        expect(response.statusText.toLowerCase()).to.equal("ok");

        // console.log(response.statusText);
      });
    });

    describe("Negative test `Get quote`", async () => {
      it("Swap token to Bnb, status 200(chain ID changed)", async () => {
        try {
          await axios.get(hooks.apiUrlbaza + hooks.apiUrlQuote, {
            params: hooks.negativeTokenToBnbQuote,
            headers: { Authorization: process.env.AntiSandwichFree },
          });
        } catch (error) {
          expect(error.response.status).to.equal(403);
        }
      });

      it("Swap token to Bnb, status 200(changed router)", async () => {
        try {
          await axios.get(hooks.apiUrlbaza + hooks.apiUrlQuote, {
            params: hooks.negativetokenToEthQuote,
            headers: { Authorization: process.env.AntiSandwichFree },
          });
        } catch (error) {
          expect(error.response.status).to.be.equal(403);
        }
      });
    });
  });
  describe("Test `Check is transaction mined`", async function () {
    describe("Positive test", async () => {
      it("Checks that 'value' exists (not equal to 'null' and not 'undefined')", async () => {
        const response = await axios.get(hooks.apiUrlbaza + hooks.apiUrlSwap, {
          params: hooks.tokenToBnbSwap,
          headers: { Authorization: process.env.AntiSandwichFree },
        });

        expect(response.data).to.exist;
      });

      it("Swap status 200", async () => {
        const response = await axios.get(hooks.apiUrlbaza + hooks.apiUrlSwap, {
          params: hooks.tokenToBnbSwap,
          headers: { Authorization: process.env.AntiSandwichFree },
        });

        expect(response.status).to.equal(200);
      });
    });

    describe("Negative test", async () => {
      it("Test 'Not enough allowance.'", async () => {
        try {
          const response = await axios.get(
            hooks.apiUrlbaza + hooks.apiUrlSwap,
            {
              params: hooks.notEnoughAllowance,
              headers: { Authorization: process.env.AntiSandwichFree },
            }
          );
        } catch (error) {
          expect(error.response.data.message).to.equal("Not enough allowance.");
        }
      });
    });
  });

  describe("Test `Get swap tokens`", async () => {
    describe("Positive test", async () => {
      it("Checks that 'value' exists (not equal to 'null' and not 'undefined')", async () => {
        const response = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrlSwapToken
        );

        expect(response.data).to.exist;
      });

      it("There must be an 'image' property with a '.png' extension", async () => {
        const response = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrlSwapToken
        );

        const swapTokens = response.data.swapTokens;

        const result = swapTokens.map(
          (swapToken) =>
            swapToken.imageUrl === null || swapToken.imageUrl.endsWith(".png")
        );

        if (result.includes(false)) {
          console.log(
            "Не все элементыв в массиве имеют imageUrl с расширением .png"
          );
        } else {
          console.log(
            "Все элементыв в массиве имеют imageUrl с расширением .png"
          );
        }
      });

      it("Status 200", async () => {
        const response = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrlSwapToken
        );

        expect(response.status).to.equal(200);
      });

      it("Checking for the number of tokens", async () => {
        const response = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrlSwapToken
        );

        expect(response.data.itemCount).to.be.a("number");
        // console.log(response.data.itemCount);
      });
    });
  });
});
