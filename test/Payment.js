import axios from "axios";
import { expect } from "chai";
import hooks from "../hooks.js";
import signedTx from "../createSignedEtherTransaction.js";
import { ethers } from "ethers";
import getNodeProvider from "../getNodeProvider.js";

describe.only("Payment", async function () {
  it("Bundle pricing info BNB_0.001", async () => {
    const provider = getNodeProvider(56);
    let walletNonce = await provider.getTransactionCount(
      "0xdAa9bF982db79C122927e5c01a1b58e23F9B4cf0"
    );

    const response = await axios.post(hooks.apiUrlbaza + hooks.apiUrPayment, {
      data: [
        await signedTx.createSignedEtherTransaction(
          "0x72c5684cd5B42A3956FA05AAB648e0e1F4d3fefe",
          walletNonce,
          ethers.utils.parseUnits("0.001", "ether"),
          process.env.SECRET_KEY
        ),
      ],
      chainId: 56,
    });
    //  console.log(response);
    expect(response.status).to.equal(201);
    //   console.log(response.status);
  });

  it("Bundle pricing info TON_4 and BUSD_7", async () => {
    try {
      const provider = getNodeProvider(56);
      let walletNonce = await provider.getTransactionCount(
        "0xdAa9bF982db79C122927e5c01a1b58e23F9B4cf0"
      );

      const response = await axios.post(hooks.apiUrlbaza + hooks.apiUrPayment, {
        data: [
          await signedTx.tokenTransfer(
            `0x76A797A59Ba2C17726896976B7B3747BfD1d220f`,
            `0x72c5684cd5B42A3956FA05AAB648e0e1F4d3fefe`,
            walletNonce,
            ethers.utils.parseUnits(`4`, 9),
            provider,
            process.env.SECRET_KEY
          ),
          await signedTx.tokenTransfer(
            `0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56`,
            `0x72c5684cd5B42A3956FA05AAB648e0e1F4d3fefe`,
            ++walletNonce,
            ethers.utils.parseUnits(`7`, 18),
            provider,
            process.env.SECRET_KEY
          )
        ],
        chainId: 56,
      });
      // console.log(response.data);
      expect(response.status).to.equal(201);
      // console.log(response.status);
    } catch (error) {
      // console.log(error.response.data);
    }
  });
});
