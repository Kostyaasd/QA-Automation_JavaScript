import axios from "axios";
import { expect } from "chai";
import hooks from "../hooks.js";
import * as dotenv from "dotenv";
dotenv.config();

describe.only("Client", async function () {
  this.timeout(15000);
  describe("Positive Test Client", async () => {
    it("Status 200, headers", async () => {
      const response = await axios.get(hooks.apiUrlbaza + hooks.apiUrClient, {
        headers: { Authorization: process.env.AntiSandwichFree },
      });

      expect(response.status).to.equal(200);
    });

    it("Status 200, headers1", async () => {
      let response;

      response = await axios.get(hooks.apiUrlbaza + hooks.apiUrClient, {
        headers: { Authorization: process.env.AntiSandwichPay },
      });

      expect(response.status).to.equal(200);
    });

    it("Status 200, headers2", async () => {
      const response = await axios.get(hooks.apiUrlbaza + hooks.apiUrClient, {
        headers: { Authorization: process.env.ConductorPay },
      });

      expect(response.status).to.equal(200);
    });

    it("Status 200, headers3", async () => {
      const response = await axios.get(hooks.apiUrlbaza + hooks.apiUrClient, {
        headers: { Authorization: process.env.ConductorFree },
      });

      expect(response.status).to.equal(200);
    });
  });

  describe("Negative Test Client", async () => {
    it("Status 403, headers wrong", async () => {
      let response;
      try {
        response = await axios.get(hooks.apiUrlbaza + hooks.apiUrClient, {
          headers: { Authorization: process.env.ConductorFreeClient }, //не существующий
        });
      } catch (error) {
        expect(error.response.data.statusCode).to.equal(403);
      }
    });

    it("Status 403, not headers", async () => {
      let response;
      try {
        response = await axios.get(hooks.apiUrlbaza + hooks.apiUrClient);
      } catch (error) {
        expect(error.response.data.statusCode).to.equal(403);
      }
    });
  });
});
