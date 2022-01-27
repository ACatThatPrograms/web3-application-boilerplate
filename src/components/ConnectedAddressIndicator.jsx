import React from 'react';
import { useSelector } from 'react-redux';

export default function ConnectedAddressIndicator() {

    const { connectedAddress } = useSelector(state => ({
        connectedAddress: state.application.connectedAddress,
    }))

    return (
        <div className="text-sm bg-blue-100 text-blue-500 p-2 border-2 border-blue-300 rounded-lg font-bold">
          Web3 Address: {connectedAddress ? connectedAddress : "Not connected"}
        </div>
    )

}