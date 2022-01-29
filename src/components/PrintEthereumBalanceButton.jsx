import React from 'react';
import { Form } from 'semantic-ui-react';
import ethAdapter from '../eth/ethAdapter';
import { useSelector } from 'react-redux';

export default function PrintEthereumBalanceButton() {

    const { web3Connected, ethBalance } = useSelector(state => ({ ethBalance: state.ethereum.balances.ethereum, web3Connected: state.ethereum.connected }))

    const printBalance = async () => {
        await ethAdapter.updateEthereumBalance();
    }

    return (

        <Form size="mini">
            <Form.Input
                actionPosition="left"
                action={{
                    size: "small",
                    content: "Print ETH Balance",
                    onClick: printBalance,
                    disabled: !web3Connected,
                }}
                value={web3Connected ? (Number(ethBalance).toFixed(5) + " Ether") : "Not Connected"}
                readOnly
            />
        </Form>

    )

}