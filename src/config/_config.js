import * as contractsConfig from './contracts';
import * as networkConfig from './network';

// Page imports
import { PageOne, PageTwo, PageThree, ContractTest } from 'pages'
// Icon Import
import AdbIcon from '@mui/icons-material/Adb';

// Ethereum Configuration
const ethereum_configuration = {
    CONTRACTS: contractsConfig.CONTRACTS,
    CONTRACT_ABIS: contractsConfig.CONTRACT_ABIS,
    CONTRACT_ADDRESSES: contractsConfig.CONTRACT_ADDRESSES,
    CONTRACT_NAMES: contractsConfig.CONTRACT_NAMES,
    ETHEREUM_NETWORK_BY_ID: networkConfig.ETHEREUM_NETWORK_BY_ID,
    ETHEREUM_NETWORK_NAMES: networkConfig.ETHEREUM_NETWORK_NAMES,
    ETH_HTTP_PROVIDER: (() => {
        switch (process.env.REACT_APP__ENVIRONMENT) {
            case "LOCAL": return process.env.REACT_APP__ETHEREUM_ENDPOINT_LOCAL
            case "STAGING": return process.env.REACT_APP__ETHEREUM_ENDPOINT_STAGING
            case "PRODUCTION": return process.env.RECT_APP__ETHEREUM_ENDPOINT_PRODUCTION
            default: return "https://localhost:8545";
        }
    })()
}

const site_configuration = {
    copyriteName: "Web3BoilerCOPY", // Copyrite business name title
    webView: {
        headerLinkSpacing: 2, //sx.mx applied to header links in webView
        headerHeight: 1, // sx.my applied to header links in webView
    },
    navIcon: <AdbIcon />, // NavBar Icon
    navTitle: "Web3Boiler", // NavBar Text
    title: "Web3Boiler", // Browser Document Title
    pages: [
        {
            name: "PAGE_ONE",
            display: "Page 1",
            render: PageOne
        },
        {
            name: "PAGE_TWO",
            display: "Page 2",
            render: PageTwo,
        },
        {
            name: "PAGE_THREE",
            display: "Page 3",
            render: PageThree
        },
        {
            name: "CONTRACT_TEST",
            display: "Contract Test",
            render: ContractTest
        },
    ]

}

export const configuration = {
    site: site_configuration,
    ethereum: ethereum_configuration,
}