// Reads an account's SqueekChain state on Sepolia the way quadConnect's keeper does before it
// claims: its power in SqueekMining, what Mining owes it, and its SQK balance.
//
//   node read-account.mjs 0x55c79EDf9C93Da672BeA9Df759F76c8714F8618D [rpc-url]
import { createPublicClient, http, parseAbi, formatEther } from "viem";
import { sepolia } from "viem/chains";
import { SQUEEKCHAIN_NEXT as SC } from "./squeekchain.mjs";

const miningAbi = parseAbi([
  "function claimable(address account) view returns (uint256 amount)",
  "function accountPower(address account) view returns (uint256 nftPower, uint256 sqkPower, uint64 effectiveRound)",
]);
const erc20Abi = parseAbi(["function balanceOf(address) view returns (uint256)"]);

const [account, rpc = "https://sepolia.gateway.tenderly.co"] = process.argv.slice(2);
if (!/^0x[0-9a-fA-F]{40}$/.test(account ?? "")) {
  console.error("usage: node read-account.mjs <address> [rpc-url]");
  process.exit(1);
}

const client = createPublicClient({ chain: sepolia, transport: http(rpc) });
const [[nftPower, sqkPower, effectiveRound], claimable, balance] = await Promise.all([
  client.readContract({ address: SC.mining, abi: miningAbi, functionName: "accountPower", args: [account] }),
  client.readContract({ address: SC.mining, abi: miningAbi, functionName: "claimable", args: [account] }),
  client.readContract({ address: SC.sqk, abi: erc20Abi, functionName: "balanceOf", args: [account] }),
]);

console.log(`release      ${SC.release}`);
console.log(`account      ${account}`);
console.log(`power        nft ${nftPower}, sqk ${sqkPower} (from round ${effectiveRound})`);
console.log(`claimable    ${formatEther(claimable)} SQK`);
console.log(`balance      ${formatEther(balance)} SQK`);
