import ethPng from "@/assets/images/token-eth.png"
import usdtPng from "@/assets/images/token-usdt.png"
import usdcPng from "@/assets/images/usdc.png"
import wbtcPng from "@/assets/images/wbtc.png"
import maticPng from "@/assets/images/polygon.png"
import chainIconPng from "@/assets/images/polygon.png"
let contractData={
    "EntryPoint": "0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789",
    "DiamondCutFacet": "0x988eBf9b4aC63926AFEe513FA3d70e2efAcfe373",
    "DiamondLoupeFacet": "0xcD0D57c4a4e3A4DBb640Ee92EDd22967F46Af7eF",
    "OwnershipFacet": "0x8e55004308A68b9B8ecfe4e16961AF0f2dfe9e66",
    "Diamond": "0x84cdF80D1fC671e769E953007481735669980DA1",
    "PlatformFacet": "0x028d98b84aD7FA59FBbdc0a0b3264a1541438eb3",
    "VaultFacet": "0x2ac69e72e59A51044D94D4F4f248C1d0844f6b60",
    "VaultPaymaster": "0x19c7F160790Fd062661eFD9E99a34fA391869EaE",
    "VaultManageModule": "0xa41cADEb1bbD69Ebd380588D53fFE08D46BfA71F",
    "TradeModule": "0xd26B1Ca37da21284261c3192A3e3ED3FC30b032a",
    "IssuanceModule": "0x9b53caE46ee5185f4a1Afe92F2B5285332947F7D",
    "IssuanceFacet": "0x69bE747bd3e50e9234a1eC026c502770b3396bc1",
    "Manager": "0x60eaF8Bf67F09f80191e202b7168851B5d7fC424",
    "OptionModule": "0xFF7708b167C7173fb25Bdf2C5df5f9924f6cC7eE",
    "UniswapV2ExchangeAdapter": "0xa6FA6Ac0Ac42BEc01a4739aF72D582278D62aab0",
    "UniswapV3ExchangeAdapter": "0x304639f69c044CeA60202670c357E076Ab16fD02",
    "VaultFactory": "0x1636b3D0aAD92De68B2CAD6224Bef3E66922c6D9",
    "PaymasterFacet": "0xFd51d086d9dA928Ac759D9C13EB7149917527aE4",
    "OptionFacet":"0xf4f946d572502e1e429dC7C8d7FD7e78a0F2D128",
    "BusinessFacet":"0xFFd03e991DdFC3E33ff14A4fa534c0111B391FC8",
    "PriceOracle":"0x492eED872032CbDaab71ffE44384c419687fC8eA",
    "ChainLinkOracleAdapter":"0x8a64a1d50a237Fe12Ef2d670514F498c99004a2a",
    "BusinessService":"0x3eA102F3f3aEc8810c475dFDe7c90F1b25193808",
    "OptionService":"0x1b4958F7e160F6001535FB95D599083f2BD8e189"
}

let remark={
    pyth:"0xff1a0f4744e8582DF1aE09D5611b887B6a12925C",
    masterToken:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
    usdToken:"0x0000000000000000000000000000000000000001",
    ethToken:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    priceDecimals:18,
    gasSymbol:"matic",
    chainIcon:chainIconPng,
    chainName:"Polygon",
    safeBlock: 3,
    loop: 5

}

let bundlerUrl="https://ethgo-polygon.fly.dev"

let chainInfo={
    chainId:137,
    name:"polygon",
    currency:"MATIC",
    explorerUrl: 'https://polygonscan.com/',
    explorerName: 'Polygonscan',
    rpcUrl:"https://polygon.blockpi.network/v1/rpc/public"
}


let optionBusiness={
    underlyingAssets:[
        {
            name:"MATIC",
            address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
            priceInterval:0.1,
            isGasToken:true,
            decimals:18,
            decimalsShow: 6,
            img:maticPng,
            assetType:0,
            isSellPut:false,
            isSellCall:true,
           },
        
        {
            name:"ETH",
            img:ethPng,
            address:"0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
            priceInterval:100,
            isGasToken:false,
            decimals:18,
            decimalsShow: 6,
            assetType:1,
            isSellPut:true,
            isSellCall:true,
        },
        {
            name:"WBTC",
            img:wbtcPng,
            address:"0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
            priceInterval:500,
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
            name:"USDC",
            img:usdcPng,
            address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
            isGasToken:false,
            decimals:6,
            decimalsShow: 2,
            assetType:1,
            isSellPut:true,
            isSellCall:true,           
        },
        {
            name:"USDT",
            img:usdtPng,
            address:"0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
            isGasToken:false,
            decimals:6,
            decimalsShow: 2,
            assetType:1,
            isSellPut:true,
            isSellCall:true,
        },

    ],//行权资产
    premiumAssets:[
        {
            name:"USDT",
            img:usdtPng,
            address:"0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
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
            address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
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

let tokens=[
    {
     name:"MATIC",
     address:"0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
     priceId:"0x5de33a9112c2b700b8d30b8a3402c103578ccfa2765696471cc672bd5cf6ac52",
     decimals:18,
     decimalsShow: 6,
     img:maticPng,
     isGasToken:true,
     isShowAsset:true,
     isAble:true,
     type:1,
     isSellPut:false,
     isSellCall:true,
    },
    {
    name:"ETH",
    address:"0x7ceB23fD6bC0adD59E62ac25578270cFf1b9f619",
    priceId:"0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    decimals:18,
    decimalsShow: 6,
    img:ethPng,
    isGasToken:false,
    isShowAsset:true,
    isAble:true,
    type:1,
    isSellPut:true,
    isSellCall:true,
    },
    {
    name:"WBTC",
    address:"0x1BFD67037B42Cf73acF2047067bd4F2C47D9BfD6",
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
     name:"USDT",
     address:"0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
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
     address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174",
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


const polygon={
    contractData:contractData,
    bundlerUrl:bundlerUrl,
    chainInfo:chainInfo,
    tokens:tokens,
    remark:remark,
    optionBusiness:optionBusiness
}





export {polygon}
