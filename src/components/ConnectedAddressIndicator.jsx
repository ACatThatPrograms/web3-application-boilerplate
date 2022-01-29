import React from 'react';
import { useSelector } from 'react-redux';

export default function ConnectedAddressIndicator() {

    const { connectedAccount } = useSelector(state => ({
        connectedAccount: state.ethereum.connectedAccount,
    }))

    return (
        <div className="text-sm bg-blue-100 text-blue-500 p-2 border-2 border-blue-300 rounded-lg font-bold">
          Web3 Address: {connectedAccount ? connectedAccount : "Not connected"}
        </div>
    )

}