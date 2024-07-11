import ethPng from "@/assets/images/token-eth.png"
import usdtPng from "@/assets/images/token-usdt.png"
import usdcPng from "@/assets/images/usdc.png"
import wbtcPng from "@/assets/images/wbtc.png"

import chainIconPng from "@/assets/images/arbitrum.png"

let contractData={
    "EntryPoint": "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    "DiamondCutFacet": "0x462482E07D7b2AfFAD9d934544bfFB24Dbcb019A",
    "DiamondLoupeFacet": "0x0E0C448Ddf771AefBFf1e4AA62978E8EDC8FE40F",
    "OwnershipFacet": "0x2837e9124C53046857172bd517b5557fA3B1Fa97",
    "Diamond": "0x5FfDD96bD604f915520d66C9edDd46dFc1434d71",
    "PlatformFacet": "0x6974577C1bDFc31Af5c511ed2A3C9f8d4f9a0Bf8",
    "VaultFacet": "0x8113F1988d18B3785A4d8Cda0E33A8BCa390cd0f",
    "LendFacet": "0x337dA5BF466d3cAd7aAdf775482CEff4B693bB57",
    "PaymasterFacet": "0xab0079C4D518B6Edc212C2a2adA120c2ADdaF6d1",
    "VaultPaymaster": "0xe10a54788e39E8Cd9c275Bff5c6A941D48F5d9C7",
    "VaultManageModule": "0xa5Db2700E2CC1E007d9F50261ecb04339d712E3A",
    "TradeModule": "0x5abBc8a4BB1B2a93Bee73f14292c59d47C0012Ab",
    "IssuanceModule": "0x9F408f6c9e52c091549F1550e31e8B5621795bE6",
    "Manager": "0xacEB04e585842F79a596D9866F9F27378fb73b98",
    "UniswapV2ExchangeAdapter": "0xAed71826eDbf82897c8d41A898ECd7D8F2c13044",
    "UniswapV3ExchangeAdapter": "0xAE5eB39df913D14EE5B102C16f4EE38Bc0369da0",
    "VaultFactory": "0xf6C9Db55D428f2F7aCC72d959AcB40a282B9eFD3",
    "LeverageFacet": "0x2c462313B8ea0cc6EC96C4A05Cd14AE24cf971E7",
    "LeverageModule": "0xB593be092508589bD7a48BfEeEF790Cce1Ef8993",
    "ChainLinkOracleAdapter": "0x35Ce6751A37c8E9b70ec6F7ce106Eda44C36C1E7",
    "PythOracleAdapter": "0x17C9bbBF495FEFb45D3Af9EB05D8F3B1E0214126", 
    "PriceOracle": "0x60E974258eFCCEf5E7B9D579F47F600aC0a7064C",
    "IssuanceFacet": "0x9817acDA4B20cd5dbFb9b9505027f343884cd1fd",
    "BusinessFacet": "0x653069B85aFdd9BadC81b40c1f3e055650419BDf",
    "BusinessService": "0xA74F863f5Ba44FEC59423E0Ed6282F6A998BC50c",
    "OptionFacet": "0x843257B4B3E446Ca9a269B99bBFf759B5d9dc4e0",
    "OptionService": "0x720a7b1A11B1A14b3E7E12811DfF2cF382997892",
    "OptionModule": "0x835d6Fe77fa1437f951F6F95b2B7524Aa0B8c2e6"
}

// let bundlerUrl="https://ethgo-arbitrum.fly.dev"
let bundlerUrl = "https://ethgo-eth-fork.fly.dev";

let remark={
    pyth:"0xff1a0f4744e8582DF1aE09D5611b887B6a12925C",
    masterToken:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
    usdToken:"0x0000000000000000000000000000000000000001",
    ethToken:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    priceDecimals:18,
    gasSymbol:"Eth",
    chainIcon:chainIconPng,
    chainName:"Arbitrum",
    safeBlock: 2,
    loop: 5
}

let optionBusiness={
    underlyingAssets:[{
            name:"ETH",
            img:ethPng,
            address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            priceInterval:100,//价格区间
            isGasToken:true,
            decimals:18,
            decimalsShow: 6,
            assetType:0,
            isSellPut:true,
            isSellCall:true,
        },
        {
            name:"WBTC",
            img:wbtcPng,
            address:"0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
            priceInterval:500,//价格区间
            isGasToken:false,
            decimals:8,
            decimalsShow: 6,
            assetType:1,
            isSellPut:true,
            isSellCall:true,
        }
    ],//抵押资产
    strikeAssets:[
        {
            name:"USDT",
            img:usdtPng,
            address:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
            isGasToken:false,
            decimals:6,
            decimalsShow: 2,
            assetType:1,
            isSellPut:true,
            isSellCall:true,
        },
        {
            name:"USDC",
            img:usdcPng,
            address:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
            isGasToken:false,
            decimals:6,
            decimalsShow: 2,
            assetType:1,
            isSellPut:true,
            isSellCall:true,           
        }
    ],//行权资产
    premiumAssets:[
        {
            name:"USDT",
            img:usdtPng,
            address:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
            isGasToken:false,
            decimals:6,
            decimalsShow: 2,
            assetType:1,
            isSellPut:true,
            isSellCall:true,
        },
        {
            name:"USDC",
            img:usdcPng,
            address:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
            isGasToken:false,
            decimals:6,
            decimalsShow: 2,
            assetType:1,
            isSellPut:true,
            isSellCall:true,          
        }       
    ],//权力金资产
    liquidation:[
        {     
           name:"Cash Settlement",
           value:1
        },
        {
            name:"Asset Delivery",
           value:2 
        }
   ]//清算方式
}



let chainInfo={
    chainId:42161,
    name:"arbitrum",
    currency:"ETH",
    explorerUrl:"https://arbiscan.io/",
    explorerName: "Arbiscan",
    rpcUrl:"https://arbitrum.blockpi.network/v1/rpc/public"
}




let tokens=[
    {
        name:"WBTC",
        address:"0x2f2a2543B76A4166549F7aaB2e75Bef0aefC5B0f",
        priceId:"0xc9d8b075a5c69303365ae23633d4e085199bf5c520a3b90fed1322a0342ffc33",
        decimals:8,
        decimalsShow: 6,
        img:wbtcPng,
        isGasToken:false,
        isShowAsset:true,
        isAble:true,
        type:1,
        isSellPut:true,
        isSellCall:true,  
    },
    {
    name:"ETH",
    address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    priceId:"0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    decimals:18,
    decimalsShow: 6,
    img:ethPng,
    isGasToken:true,
    isShowAsset:true,
    isAble:true,
    type:1,
    isSellPut:true,
    isSellCall:true,  
    },
    {
     name:"USDT",
     address:"0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9",
     priceId:"0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b",
     decimals:6,
     decimalsShow: 2,
     img:usdtPng,
     isGasToken:false,
     isShowAsset:true,
     isAble:true,
     type:1,
     isSellPut:false,
     isSellCall:false,  
    },
    {
     name:"USDC",
     address:"0xaf88d065e77c8cC2239327C5EDb3A432268e5831",
     priceId:"0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a",
     decimals:6,
     decimalsShow: 2,
     img:usdcPng,
     isGasToken:false,
     isShowAsset:true,
     isAble:true,
     type:1,
     isSellPut:false,
     isSellCall:false,  
    }
]

const arbitrum={
    contractData:contractData,
    bundlerUrl:bundlerUrl,
    chainInfo:chainInfo,
    tokens:tokens,
    remark:remark,
    optionBusiness:optionBusiness
}



export {arbitrum}