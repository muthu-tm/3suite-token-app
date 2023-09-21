// Sepoliaa
const config = {
  baseURL: "http://3.135.21.203:3001/v1/",
  defaultNetwork: 5,
  networkname: "Georli",
  mumbai: {
    airdrop: "0xFa4483c8F975341f1F77260f3BEC2DE4EF1Eb0C9",
    scan:"https://mumbai.polygonscan.com/tx/",
    tokenContract:"0x1C95f0a5AB346a61E42EAd979c2B5977AC9aBbb6",
  },
  sepolia:{
    airdrop:'0xA23d50890896B711b1d175E30983E157e4A1D229',
    scan:"https://sepolia.etherscan.io/tx/",
    tokenContract:"0xB20896DAb4A59E076dB6CfD821a65E366a59747A",
  },
  georli:{
    airdrop:"0x5030A39B27FBffcD3B4F324b110D4EBf0a92bbF1",
    scan:"https://goerli.etherscan.io/tx/",
    tokenContract:"0xB20896DAb4A59E076dB6CfD821a65E366a59747A",
  },
  bsc:{
    scan:"https://testnet.bscscan.com/tx/",
    tokenContract:"0x1C95f0a5AB346a61E42EAd979c2B5977AC9aBbb6",
  },
  fuji:{
    airdrop:'0xA23d50890896B711b1d175E30983E157e4A1D229',
    scan:"https://testnet.snowtrace.io/tx/",
    tokenContract:"0xB20896DAb4A59E076dB6CfD821a65E366a59747A",
  },
  // sepoliafactoryContract: "0xB20896DAb4A59E076dB6CfD821a65E366a59747A",
  // georlifactoryContract: "0xB20896DAb4A59E076dB6CfD821a65E366a59747A",
  // mumbaifactoryContract: "0x1C95f0a5AB346a61E42EAd979c2B5977AC9aBbb6",
  // bscfactoryContract: "0x1C95f0a5AB346a61E42EAd979c2B5977AC9aBbb6",
  // fujifactoryContract: "0xB20896DAb4A59E076dB6CfD821a65E366a59747A",
  // sepoliaScan: "https://sepolia.etherscan.io/tx/",
  // georliScan: "https://goerli.etherscan.io/tx/",
  // mumbaiScan: "https://mumbai.polygonscan.com/tx/",
  // bscScan: "https://testnet.bscscan.com/tx/",
  // fujiScan: "https://testnet.snowtrace.io/tx/",
  mailChimpURL:
    "https://tech.us21.list-manage.com/subscribe/post?u=2044a0a1651b884920351c168&amp;id=251242ccdc&amp;f_id=000ddce6f0",
};

export default config;
