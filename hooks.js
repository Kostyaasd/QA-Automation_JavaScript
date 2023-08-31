const apiUrlbaza = `https://api.hackless.io`;

const apiUrlQuote = `/api/swap-router/quote?`;

const tokenToBnbQuote = {
  fromTokenAddress: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", //cake
  toTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", //bnb
  amount: 5000000000000000000,
  router: "Pancakeswap",
  chainId: 56,
};

const tokenToEthQuote = {
  fromTokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7", //usdt
  toTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", //eth
  amount: 50000000000000000000,
  router: "UniswapV2",
  chainId: 1,
};

const negativetokenToEthQuote = {
  fromTokenAddress: "0xdAC17F958D2ee523a2206206994597C13D831ec7", //usdt
  toTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", //eth
  amount: 50000000000000000000,
  router: "Pancakeswap",
  chainId: 1,
};

const negativeTokenToBnbQuote = {
  fromTokenAddress: "0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82", //cake
  toTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", //bnb
  amount: 5000000000000000000,
  router: "Pancakeswap",
  chainId: 1,
};

const apiUrlSwap = `/api/swap-router/swap?`;

const apiUrlSwapToken = `/api/swap-router/swap-tokens`;

const tokenToBnbSwap = {
  fromTokenAddress: "0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56", //busd
  toTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", //bnb
  amount: 7000000000000000000,
  slippage: 5,
  fromAddress: "0xdAa9bF982db79C122927e5c01a1b58e23F9B4cf0",
  router: "Pancakeswap",
  chainId: 56,
};
const notEnoughAllowance = {
  fromTokenAddress: "0x111111111117dC0aa78b770fA6A738034120C302", //1inch
  toTokenAddress: "0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee", //bnb
  amount: 7000000000000000000,
  slippage: 5,
  fromAddress: "0xdAa9bF982db79C122927e5c01a1b58e23F9B4cf0",
  router: "Pancakeswap",
  chainId: 56,
};

const apiUrParameters = `/api/health`;

const apiUrReferral = `/api/referral/validate-code?`;

const apiUrBlockchain = `/api/blockchain/gas-price?`;

const apiUrClient = `/api/client/config`;

const apiUrPayment = `/api/payment/bundle-price`;

const apiUrVerifyAddress = `/api/transaction/verify-address`;

const apiUrTransactionSubmit = `/api/transaction/submit`;

const apiUrCheckResult = `/api/transaction/check-result`;

const apiUrCancelSubmission = `/api/transaction/cancel-submission`;



export default {
  tokenToBnbQuote,
  tokenToEthQuote,
  apiUrlbaza,
  apiUrlQuote,
  negativeTokenToBnbQuote,
  negativetokenToEthQuote,
  apiUrlSwap,
  tokenToBnbSwap,
  apiUrlSwapToken,
  notEnoughAllowance,
  apiUrParameters,
  apiUrReferral,
  apiUrBlockchain,
  apiUrClient,
  apiUrPayment,
  apiUrVerifyAddress,
  apiUrTransactionSubmit,
  apiUrCheckResult,
  apiUrCancelSubmission,
};
