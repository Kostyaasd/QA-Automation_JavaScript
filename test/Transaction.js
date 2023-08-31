import axios from "axios";
import { expect } from "chai";
import hooks from "../hooks.js";
import { describe } from "mocha";
import * as dotenv from "dotenv";
dotenv.config();
import ethers from "ethers";
import getNodeProvider from "../getNodeProvider.js";
import signedTx from "../createSignedEtherTransaction.js";

describe.only("Test Transaction", async function () {
  this.timeout(15000);
  let bundleHash;
  describe("Verify address ", async () => {
    it("Positive Test", async () => {
      const response = await axios.post(
        hooks.apiUrlbaza + hooks.apiUrVerifyAddress,
        {
          address: process.env.AddressWhitelist,
        },
        {
          headers: { Authorization: process.env.ConductorPay },
        }
      );

      expect(response.status).to.equal(201);
    });

    it("Negative Test", async () => {
      try {
        const response = await axios.post(
          hooks.apiUrlbaza + hooks.apiUrVerifyAddress,
          {
            address: process.env.AddressBlacklist,
          },
          {
            headers: { Authorization: process.env.ConductorPay },
          }
        );
      } catch (error) {
        expect(error.response.status).to.equal(400);
        expect(error.response.data.code).to.equal(2006);
        // console.log(error.response.status);
        // console.log(error.response.data);
      }
    });
  });
  describe("Submit", async () => {
    it("Send transaction throw flashbots provider and Check is transaction mined ", async () => {
      try {
        const provider = getNodeProvider(56);
        let walletNonce1 = await provider.getTransactionCount(
          "0xdAa9bF982db79C122927e5c01a1b58e23F9B4cf0"
        );
        let walletNonce2 = await provider.getTransactionCount(
          "0x72c5684cd5B42A3956FA05AAB648e0e1F4d3fefe"
        );
        const response = await axios.post(
          hooks.apiUrlbaza + hooks.apiUrTransactionSubmit,
          {
            data: [
              await signedTx.createSignedEtherTransaction(
                "0x72c5684cd5B42A3956FA05AAB648e0e1F4d3fefe",
                walletNonce1,
                ethers.utils.parseUnits("0.02", "ether"),
                process.env.SECRET_KEY
              ),
              await signedTx.tokenTransfer(
                `0x55d398326f99059fF775485246999027B3197955`,
                `0xdAa9bF982db79C122927e5c01a1b58e23F9B4cf0`,
                ethers.utils.parseUnits(`4`, 18),
                walletNonce2,
                provider,
                process.env.SECRET_KEY
              ),
            ],
            chainId: 56,
          },
          {
            headers: {
              Authorization: process.env.ConductorFree,
            },
          }
        );
        bundleHash = response.data.bundleHash;
        expect(response.status).to.equal(201);
        // console.log(response.status);
        // console.log(bundleHash);

        await new Promise((resolve) => setTimeout(resolve, 5000));

        // console.log(bundleHash);
        const response1 = await axios.get(
          hooks.apiUrlbaza + hooks.apiUrCheckResult,
          {
            bundleHash: bundleHash,
          }
        );
        // console.log(response1.data);
        expect(response1.data.status).to.equal(true);
      } catch (error) {
        // console.log(error.response.data);
      }
    });

    it("Cancel submission", async () => {
      try {
        const response = await axios.post(
          hooks.apiUrlbaza + hooks.apiUrCancelSubmission,
          {
            bundleHash: bundleHash,
          }
        );

        expect(response.status).to.equal(201);
      } catch (error) {
        expect(error.response.status).to.equal(400);
        expect(error.response.data.message).to.equal(
          "Bundle already completed"
        );
      }
    });
  });
});
