// SqueekChain on Ethereum Sepolia: the addresses and implementation versions quadConnect is built
// for, from SqueekChain's deployment record (docs.squeekchain.com/assets/deployments/sepolia.json)
// and its live API. quadConnect runs on SQUEEKCHAIN_LATEST; the two before it are kept as the
// record of what it ran on earlier.

/**
 * The install sepolia.squeekchain.com runs since 2026-10-26 (block 11998937), and quadConnect's since
 * 2026-10-28. Mining v9 and Staking v2: Staking keeps the reward index and pays each account
 * (claim, claimable and accountPower moved there from Mining; accountPower answers two words, NFT
 * and SQK power, with 18 decimals). Mining funds the gacha vault with most of its SQK and Staking
 * with the rest. A third SQK and its own Squeeks (9,999 issued).
 */
export const SQUEEKCHAIN_LATEST = {
  release: "stream-game-sepolia-test-20261026-01",
  installation: "stream-game-sepolia-test-20261025-01",
  chainId: 11155111,
  core: "0x980b4424c007caf7a1f3670b48c8eaef7ebc3d44",
  mining: "0xcd46990f8349057335289ef282c276204b6cdc62",
  staking: "0x4b67b739dfd832f4eac67a7aa3bc244fb74cea4f",
  sqk: "0x5501e1fa81be1c3f49225fa7668da0245d07db60",
  nft: "0xcb98349c134ab983da5bfd80527dfe2552bdb70f",
  tokenFactory: "0x779a302adbaa9c8a3da45ef48ad67e6a45fcef29",
  launch: "0x1ff6485abfbb2d183cd673d78e1ab31c098e04dd",
  gachaVault: "0x5f6ba50f448b84e09f5ee324a6402b033ba70e28",
  coreVersion: 3,
  miningVersion: 9,
  stakingVersion: 2,
  deployBlock: 11998937,
  /** The API sepolia.squeekchain.com reads. */
  economyUrl: "https://api.squeekchain.com/v1/economy/state",
};

/**
 * The 2026-10-24 install (block 11985210): what quadConnect ran on until 2026-10-28. Mining v8 paid
 * then (claim, claimable, and accountPower with a third word, the round the power counts from).
 * No longer used by quadConnect.
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

/** The first install, in SqueekChain's published deployment record. No longer used by quadConnect. */
export const SQUEEKCHAIN = {
  release: "squeeks-sepolia-core3-mining6-001",
  chainId: 11155111,
  core: "0x74665dAecA35A2303e767E76a2FF1FB6F93e119f",
  mining: "0x3beE588fC20dE788Bac17d33b41Da7346cb27EC4",
  sqk: "0x6872bfa5ccc3e9e440c6c16e5ffdabb8dba4cc76",
  nft: "0x0eAF3E0d40A0a8E5a6Ac030b2459E9FB0B7905c6",
  coreVersion: 3,
  miningVersion: 6,
  /** Where SqueekCore launched. */
  deployBlock: 11902282,
  /** SqueekCore's round length (configuration().roundDuration). */
  roundSeconds: 600,
  /** The deployment record SqueekChain publishes. */
  recordUrl: "https://docs.squeekchain.com/assets/deployments/sepolia.json",
};

/** quadConnect's own contracts on Sepolia that work with SqueekChain. */
export const QUADCONNECT = {
  vault: "0x725ef1d73a2951355acbf797eb92bfdf2c20f15d",
  sleeve: "0x32cd5f4a2a93bdb558dd04b40520c3b6886acc41",
  desk: "0x2f726360c1111e1b4db8874ec61a18729f70bd59",
  stats: "0xe102bdbc825f5ed256630071c9b8e156c5881adc",
  mineSqk: "0x3733286aceeafe32a2815d1a9ac094c33686ca35",
  marketSqk: "0x705951e0ea7447daa648751f94925a4306791bc7",
  perksSqk: "0xe97c659c61b9cd744607711627f5e6b65debbb03",
  sqkPair: "0x3a78FBAC883b0917c83B858A56824bb1E1CeaaF4",
};
