import React from 'react';
import { Button } from 'semantic-ui-react';
import ethAdapter from '../../eth/ethAdapter';
import { useSelector } from 'react-redux';

export default function ConnectWalletButton() {

    const { web3Connected, web3Connecting } = useSelector(state => ({
        web3Connected: state.ethereum.connected,
        web3Connecting: state.ethereum.connecting,
    }));

    const connect = () => {
        ethAdapter.connectToWeb3Wallet((err) => {
            if (err) {
                console.log("ERR", err);
            }
        })
    }

    return (

        <Button
            className="w-56 text-center"
            size="small"
            content={!web3Connected ? "Connect Web3" : "Web3 Connected"}
            onClick={!web3Connected ? connect : null}
            disabled={web3Connected}
            color={web3Connected ? "green" : null}
            loading={web3Connecting}
        />

    )

}