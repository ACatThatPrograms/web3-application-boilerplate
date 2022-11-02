import { useTheme } from "@emotion/react"
import { Typography } from "@mui/material"
import { getEthAdapter } from "eth-adapter";
import { useSelector } from "react-redux"
import { splitStringWithEllipses } from "utils/string"

export function ConnectWeb3Button() {

    useSelector(s => ({})) // Hook into reducer updates so equalize works properly
    const ethAdapter = getEthAdapter();
    const theme = useTheme()
    const { web3Connected, web3Accounts } = ({
        web3Connected: ethAdapter.connected,
        web3Accounts: ethAdapter.accounts
    })

    // onClick={!web3Connected ? () => { console.log('hi'); ethAdapter.connectToWeb3Wallet() } : () => { console.log('no') }}
    return (
        <Typography sx={{ fontWeight: 800, color: theme.palette.secondary.secondary }}
            onClick={ () => console.log('hi')}

        >
            {web3Connected ? (<>
                {splitStringWithEllipses(web3Accounts[0], 5)}
            </>) : (<>
                Connect
            </>)}
        </Typography>
    )


}