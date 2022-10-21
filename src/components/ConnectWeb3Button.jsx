import { useTheme } from "@emotion/react"
import { Typography } from "@mui/material"
import ethAdapter from "eth/ethAdapter"
import { useSelector } from "react-redux"
import { splitStringWithEllipses } from "utils/string"

export function ConnectWeb3Button() {

    const { web3Connected, web3Accounts } = useSelector(s => ({ web3Connected: s.ethereum.connected, web3Accounts: s.ethereum.accounts }))
    const theme = useTheme()

    return (
        <Typography sx={{ fontWeight: 800, color: theme.palette.secondary.main }} onClick={!web3Connected ? () => {ethAdapter.connectToWeb3Wallet()} : () => {}}>
            {web3Connected ? (<>
                {splitStringWithEllipses(web3Accounts[0], 5)}
            </>) : (<>
                Connect
            </>)}
        </Typography>
    )


}