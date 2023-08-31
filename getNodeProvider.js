
import { ethers } from "ethers";
import * as dotenv from 'dotenv'
dotenv.config();

function provider(chainId) {

    if(chainId === 56){
        const provider = new ethers.providers.JsonRpcProvider(
            {
              url: `https://bsc-mainnet.rpcfast.com?api_key=${process.env.BSC_NODE_PROVIDER_API_KEY}`,
              timeout: 5000,
            },
            { name: "", chainId: 56 }
          );
          return provider;
    }
    if(chainId === 1){
        const provider = new ethers.providers.JsonRpcProvider(
            {
              url: `https://eth-mainnet.rpcfast.com?$api_key=${process.env.ETH_NODE_PROVIDER_API_KEY}`,
              timeout: 5000,
            },
            { name: "", chainId:1 }
          );
          return provider;
    } else {
    console.log("Введите коректный номер сети");
  
}
};
export default provider;