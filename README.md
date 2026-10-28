# quadConnect × SqueekChain

[quadConnect](https://x.com/quadconnects) runs vaults, desks and a Squeek staking sleeve on top of
[SqueekChain](https://squeekchain.com) on Ethereum Sepolia. This repository holds the public part of
that integration:

- **`squeekchain.mjs`**: the SqueekChain addresses and release versions quadConnect is built for,
  for both the original economy (`SQUEEKCHAIN`) and the 2026-10-24 staking economy
  (`SQUEEKCHAIN_NEXT`: Core, Mining, Staking, SQK, NFT).
- **`read-account.mjs`**: reads an account's power, claimable SQK and SQK balance from SqueekMining,
  the same reads quadConnect's keeper makes before it claims.

## How quadConnect uses SqueekChain

- **Keeper:** settles Mining's rounds (`checkpoint`), claims the SQK Mining owes it (`claim`) at most
  hourly, and splits it between depositors, the reserve and the protocol.
- **Squeek sleeve:** depositors' Squeeks are deposited into SqueekStaking under the sleeve's
  account, merged as their levels allow, and earn SQK paid out through one collect.
- **SQK pool and vaults:** a SQK/USDC pair, the SQK pocket vault and the QUAD/SQK market all run on
  the new SQK.
- **Feeds:** SQK yield, Squeek power, price and work are read from Mining and Core.

## Run

```sh
npm install viem
node read-account.mjs 0x55c79EDf9C93Da672BeA9Df759F76c8714F8618D
```
