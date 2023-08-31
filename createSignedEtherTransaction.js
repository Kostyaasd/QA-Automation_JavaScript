import ethers from "ethers";
import erc20Abi from "./ABI/erc20.json" assert { type: "json" };
import * as dotenv from 'dotenv'
dotenv.config()


async function createSignedEtherTransaction(to, walletNonce, value, privateKey) {
  try {
 
    const wallet = new ethers.Wallet(
      privateKey
    );
    const gasPriceBN = ethers.utils.parseUnits("60", "gwei");

    let tx = {
      
      to: to,
      nonce: walletNonce,
      gasPrice: gasPriceBN,
      gasLimit: ethers.utils.hexlify(ethers.BigNumber.from(21000), {
        hexPad: "left",
      }),
      value: value,  
      
      chainId: 56,
    };
    let signedTx = await wallet.signTransaction(tx);


    return signedTx;
  } catch (e) {
    console.log(e);
  }
}

async function tokenTransfer (contractAddress, to, tokenValueBN, walletNonce, provider, privateKey){

  const wallet = new ethers.Wallet(
    privateKey
  );
  const gasPriceBN = ethers.utils.parseUnits("60", "gwei");

  const erc20TokenContract = new ethers.Contract(contractAddress, erc20Abi, provider);
let transferErc20Tx = await erc20TokenContract.populateTransaction.transfer(to, tokenValueBN);
    // console.log(transferErc20Tx);
    let tx = {
      to: contractAddress,
      nonce: walletNonce,
      gasPrice: gasPriceBN,
      gasLimit: ethers.utils.hexlify(ethers.BigNumber.from(100000), { hexPad: 'left' }),
      value: ethers.BigNumber.from('0'),
      chainId: 56,
      data: transferErc20Tx.data,
    };
    let signedTx = await wallet.signTransaction(tx);

    return signedTx;

}
export default {createSignedEtherTransaction,
  tokenTransfer};
