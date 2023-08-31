import axios from "axios";
import { expect } from "chai";
import hooks from "../hooks.js";

describe.only("Test Default", async function () {
  this.timeout(15000);
  describe("The Health Check Parameters", async () => {
    it("Status 200", async () => {
      const response = await axios.get(
        hooks.apiUrlbaza + hooks.apiUrParameters
      );

      expect(response.status).to.equal(200);
    });

    it("Checks that 'value' exists (not equal to 'null' and not 'undefined')", async () => {
      const response = await axios.get(
        hooks.apiUrlbaza + hooks.apiUrParameters
      );

      expect(response.data).to.exist;
    });
  });

  describe("Test referral code", async () => {
    describe("Positive Test", async () => {
      it("Status 200')", async () => {
        const response = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrReferral
        );

        expect(response.status).to.equal(200);
      });

      it("Checks that 'value' exists (not equal to 'null' and not 'undefined')", async () => {
        const response = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrReferral
        );

        expect(response.data).to.exist;
      });

      it("Checks code')", async () => {
        const code = 1111111;
        const response = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrReferral,
          {
            params: { code },
          }
        );
        expect(response.data.isValid).to.equal(true);
      });
    });

    describe("Negative Test", async () => {
      it("Checks code", async () => {
        try {
          const code = "";
          const response = await axios.get(
            hooks.apiUrlbaza + hooks.apiUrReferral,
            {
              params: { code },
            }
          );
        } catch (error) {
          expect(error.response.data.message).to.equal("Invalid referral code");
        }
      });

      it("Checks code = '' ", async () => {
        try {
          const code = "";
          const response = await axios.get(
            hooks.apiUrlbaza + hooks.apiUrReferral,
            {
              params: { code },
            }
          );
        } catch (error) {
          expect(error.response.data.message).to.equal("Invalid referral code");
        }
      });
    });
  });
});
