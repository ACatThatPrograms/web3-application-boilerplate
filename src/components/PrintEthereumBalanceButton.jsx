import React from 'react';
import { Form } from 'semantic-ui-react';
import ethAdapter from '../eth/ethAdapter';
import { useSelector, useDispatch } from 'react-redux';
import { APPLICATION_ACTIONS } from '../redux/actions';

export default function PrintEthereumBalanceButton() {

    const { web3Connected, ethBalance } = useSelector(state => ({ ethBalance: state.application.balances.ethereum, web3Connected: state.application.web3Connected }))
    const dispatch = useDispatch();

    const printBalance = async () => {
        let balance = await ethAdapter.getEthereumBalance(true)
        dispatch(APPLICATION_ACTIONS.setEthereumBalance(balance))
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