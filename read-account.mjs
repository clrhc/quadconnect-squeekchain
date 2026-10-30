// Reads an account's SqueekChain state on Sepolia the way quadConnect's keeper does before it
// claims: its power and what SqueekStaking v2 owes it, and its SQK balance.
//
//   node read-account.mjs 0x32cd5f4a2a93bdb558dd04b40520c3b6886acc41 [rpc-url]   (quadConnect's sleeve)
import { createPublicClient, http, parseAbi, formatEther } from "viem";
import { sepolia } from "viem/chains";
import { SQUEEKCHAIN_LATEST as SC } from "./squeekchain.mjs";

// Staking v2 pays: its accountPower answers two words (no effective round), both with 18 decimals.
const stakingAbi = parseAbi([
  "function accountPower(address account) view returns (uint256 nftPower, uint256 sqkPower)",
  "function claimable(address account) view returns (uint256 amount)",
]);
const erc20Abi = parseAbi(["function balanceOf(address) view returns (uint256)"]);

const [account, rpc = "https://ethereum-sepolia-rpc.publicnode.com"] = process.argv.slice(2);
if (!/^0x[0-9a-fA-F]{40}$/.test(account ?? "")) {
  console.error("usage: node read-account.mjs <address> [rpc-url]");
  process.exit(1);
}

const client = createPublicClient({ chain: sepolia, transport: http(rpc) });
const [[nftPower, sqkPower], claimable, balance] = await Promise.all([
  client.readContract({ address: SC.staking, abi: stakingAbi, functionName: "accountPower", args: [account] }),
  client.readContract({ address: SC.staking, abi: stakingAbi, functionName: "claimable", args: [account] }),
  client.readContract({ address: SC.sqk, abi: erc20Abi, functionName: "balanceOf", args: [account] }),
]);

console.log(`release      ${SC.release}`);
console.log(`account      ${account}`);
console.log(`power        nft ${formatEther(nftPower)}, sqk ${formatEther(sqkPower)}`);
console.log(`claimable    ${formatEther(claimable)} SQK`);
console.log(`balance      ${formatEther(balance)} SQK`);
