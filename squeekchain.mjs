// SqueekChain on Ethereum Sepolia: the one record of its addresses and of the implementation
// versions quadConnect was built for, from SqueekChain's published deployment record
// (docs.squeekchain.com/assets/deployments/sepolia.json, kept as built-for in
// contracts/vendor/squeekchain/). lib/networks.ts, scripts/lib/system.mjs, the paper economy and the
// scripts all read it from here, so a new SqueekChain deployment is one edit:
// `node scripts/squeek-check.mjs` compares this with what SqueekChain publishes and what is live,
// and docs/SQUEEKCHAIN_UPGRADE.md is the runbook. (The worker imports nothing outside worker/: it
// reads the same addresses from the sleeve.)
export const SQUEEKCHAIN = {
  /** The deployment record's `release`. */
  release: "squeeks-sepolia-core3-mining6-001",
  chainId: 11155111,
  core: "0x74665dAecA35A2303e767E76a2FF1FB6F93e119f",
  mining: "0x3beE588fC20dE788Bac17d33b41Da7346cb27EC4",
  sqk: "0x6872bfa5ccc3e9e440c6c16e5ffdabb8dba4cc76",
  nft: "0x0eAF3E0d40A0a8E5a6Ac030b2459E9FB0B7905c6",
  coreVersion: 3,
  miningVersion: 6,
  /** Where SqueekCore launched: index its events from here. */
  deployBlock: 11902282,
  /** SqueekCore's round length (configuration().roundDuration). */
  roundSeconds: 600,
  /** The deployment record SqueekChain publishes. */
  recordUrl: "https://docs.squeekchain.com/assets/deployments/sepolia.json",
  /** SqueekChain's live API (what sepolia.squeekchain.com reads): it shows a new deployment hours
   * before the docs record does. */
  economyUrl: "https://green-dispenser-04.squeekchain.com/v1/economy/state",
  /** Releases seen on the live API and looked at (squeek-check flags any other). */
  knownReleases: ["squeeks-sepolia-core3-mining6-001", "squeeks-sepolia-dispenser-20261024-06", "squeeks-sepolia-dispenser-20261024-06-gacha-8d631c23a712"],
};

/**
 * SqueekChain's next economy, live on Sepolia since 2026-10-24 (block 11985210) beside the one
 * above, which still runs and pays. It isn't in the docs record yet and its contracts aren't
 * verified or published; SqueekChain calls it test-only. Its Squeeks were handed out by a test
 * dispenser (all 8,888 claimed within hours; 9,999 issued in all), and a Squeek only earns once
 * deposited into Staking. Since 2026-10-27 the API names it `…-06-gacha-8d631c23a712`: the same
 * addresses, Mining upgraded in place to v8. SqueekChain's dev says the NFT contract may be
 * redeployed, and their site already reads a later release (`squeeks-sepolia-preprod-003`: Mining v9,
 * Staking v2, a Gacha and a Vault). Kept for reference until quadConnect moves to it
 * (docs/SQUEEKCHAIN_UPGRADE.md).
 */
export const SQUEEKCHAIN_NEXT = {
  release: "squeeks-sepolia-dispenser-20261024-06-gacha-8d631c23a712",
  chainId: 11155111,
  core: "0x2aec8094ed6840eff95d284c55cd2585c4de6814",
  mining: "0xac45fe7e42b8a0a44c02f9c8a507e137322cff7a",
  staking: "0x90112ed64e1a92aaf107736ace9584b8745020eb",
  sqk: "0x1c0df748aa3814a13fb1294c7f1088ecc7b9973a",
  nft: "0x05142852d9eaf3e66a7a74419e363bd3539467b0",
  tokenFactory: "0x898c7b81e596051825c0dd33b9358d8e9e599b76",
  dispenser: "0xc79b54028017b9774255bfebac321567d593246e",
  coreVersion: 3,
  miningVersion: 8,
  stakingVersion: 1,
  deployBlock: 11985210,
};
