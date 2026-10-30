# quadConnect × SqueekChain

[quadConnect](https://quad.cx) ([@quadconnects](https://x.com/quadconnects)) is one vault on Ethereum
Sepolia built on [SqueekChain](https://squeekchain.com). People deposit USDC, ETH or SQK; the money is
pooled, and what it earns compounds into everyone's balance by their share. This repository holds the
public part of the SqueekChain integration. Testnet only: SqueekChain has no mainnet, so neither does
quadConnect.

- **`squeekchain.mjs`**: the SqueekChain addresses and versions quadConnect is built for
  (`SQUEEKCHAIN_LATEST`, plus the two installs before it), and quadConnect's own contracts that work
  with them (`QUADCONNECT`).
- **`read-account.mjs`**: reads an account's power, claimable SQK and SQK balance from SqueekStaking
  v2, the same reads quadConnect's keeper makes before it claims.

## The SqueekChain install quadConnect runs on

Since 2026-10-28, the install sepolia.squeekchain.com runs (release `stream-game-sepolia-test-20261026-01`,
from block 11998937):

| Contract | Address | Version |
| --- | --- | --- |
| SqueekCore | `0x980b4424c007caf7a1f3670b48c8eaef7ebc3d44` | 3 |
| SqueekMining | `0xcd46990f8349057335289ef282c276204b6cdc62` | 9 |
| SqueekStaking | `0x4b67b739dfd832f4eac67a7aa3bc244fb74cea4f` | 2 |
| SQK | `0x5501e1fa81be1c3f49225fa7668da0245d07db60` | |
| Squeeks (NFT) | `0xcb98349c134ab983da5bfd80527dfe2552bdb70f` | |
| Gacha vault | `0x5f6ba50f448b84e09f5ee324a6402b033ba70e28` | |
| Launch | `0x1ff6485abfbb2d183cd673d78e1ab31c098e04dd` | |
| Token factory | `0x779a302adbaa9c8a3da45ef48ad67e6a45fcef29` | |

Staking v2 is what pays: `claim`, `claimable` and `accountPower` moved there from Mining. Its
`accountPower` answers two words (NFT power, SQK power; no effective round, power counts at once),
both with 18 decimals.

The earlier installs (`squeeks-sepolia-core3-mining6-001`, and the 2026-10-24 one with Mining v8 and
Staking v1) are no longer used. quadConnect moved its SQK side onto this install on 2026-10-28.

## What quadConnect does with it

- **Keeper.** Settles Mining's rounds when it falls behind Core (`Mining.checkpoint()`, which anyone
  may call), claims what Staking v2 owes the sleeve at most hourly, and splits each claim 80/15/5:
  depositors, the reserve, running costs.
- **Squeek sleeve** (`0x32cd5f4a2a93bdb558dd04b40520c3b6886acc41`). People stake their Squeeks
  through it and keep owning them. The sleeve deposits them into SqueekStaking under its own account,
  merges them as their levels allow (`mergeDeposited`) and books their power. A staker's SQK is
  theirs less 10% for every depositor. It is added to their vault balance as USDC (the default),
  kept as SQK, or used to buy QUAD. Stakers also share a QUAD drip by power. Only the owner can
  unstake, at any time.
- **Bonds.** A holder can sell a Squeek to the vault for about 30 days of its SQK earnings, paid in
  QUAD over 30 days. A bonded Squeek stays staked at SqueekChain and earns SQK for every depositor.
- **Hamster desk** (`0x2f726360c1111e1b4db8874ec61a18729f70bd59`). The vault's automatic
  long/short on SQK. Every hour it reads four numbers from SqueekChain: Core's work, SQK paid per
  unit of power, total Squeek power, and SQK's time-weighted price. It holds SQK while the hamster is
  strong and USDC while it isn't, and pays its profit into the pool. If SqueekChain is paused or runs
  other versions than it was built for, it goes back to USDC. It reads SqueekChain through a stats
  reader (`0xe102bdbc825f5ed256630071c9b8e156c5881adc`, one per release), so a new release is a new
  reader, not a redeploy.
- **Holder perks.** Miners on the mining boards who hold a Squeek (in the wallet or staked) get
  10% to 30% of the house cut they paid back, by the Squeek's level.
- **SQK markets.** A SQK mining board (`0x3733286aceeafe32a2815d1a9ac094c33686ca35`), the QUAD/SQK
  market (`0x705951e0ea7447daa648751f94925a4306791bc7`) and a SQK/USDC Uniswap V2 pool
  (`0x3a78FBAC883b0917c83B858A56824bb1E1CeaaF4`) all run on this SQK.
- **Paper mode.** quad.cx's default mode runs the same rules on paper money, priced off SqueekChain's
  live numbers.

The vault itself is `0x725ef1d73a2951355acbf797eb92bfdf2c20f15d`.

## Run

```sh
npm install
node read-account.mjs 0x32cd5f4a2a93bdb558dd04b40520c3b6886acc41
```
