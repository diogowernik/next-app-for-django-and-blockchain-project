// Mock de dados ajustado para incluir todas as informações no array de accepted_cryptos
export const profileData = {
    username: "user.name",
    avatar: "/path/to/avatar.png",
    description: "Hi! I am the Avatar. Support my work by donating to my wallets:",
    accepted_cryptos: [
        { slug: 'bnb-bsctestnet', name: 'BNB', icon: '/icons/bnb.png', contract: "0xfakeBnbContractAddress", blockchain: "Binance Smart Chain Testnet", transferContract: "0x3f1B88117403E3AB6F730eFE77e2E7d652501988" },
        { slug: 'usdt-bsctestnet', name: 'USDT', icon: '/icons/usdt.png', contract: "0xfakeUsdtContractAddress", blockchain: "Binance Smart Chain Testnet", transferContract: "0x3f1B88117403E3AB6F730eFE77e2E7d652501988" },
        { slug: 'matic-amoy', name: 'MATIC', icon: '/icons/matic.png', contract: "0xfakeMaticContractAddress", blockchain: "Amoy Network (Polygon Testnet)", transferContract: "0xf0ED7a3Bcde90242d2C3318A299C8E214d8018f0" },
        { slug: 'usdc-amoy', name: 'USDC', icon: '/icons/usdc.png', contract: "0xfakeUsdcContractAddress", blockchain: "Amoy Network (Polygon Testnet)", transferContract: "0xf0ED7a3Bcde90242d2C3318A299C8E214d8018f0" },
        { slug: 'eth-sepolia', name: 'ETH', icon: '/icons/eth.png', contract: "0xfakeEthContractAddress", blockchain: "Sepolia Testnet", transferContract: "0xf0ED7a3Bcde90242d2C3318A299C8E214d8018f0" }
    ]
};