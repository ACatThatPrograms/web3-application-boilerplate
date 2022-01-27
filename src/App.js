import React from 'react';

/** Component Import */
import ToggleDebugModeButton from "./components/ToggleDebugModeButton";
import ConnectWalletButton from "./components/ConnectWalletButton";
import PrintEthereumBalanceButton from './components/PrintEthereumBalanceButton';
import StorageSolInteraction from './components/StorageSolInteraction';
import ConnectedAddressIndicator from './components/ConnectedAddressIndicator';
import { Container, Segment } from 'semantic-ui-react';

/* 
    Everything from <<< to >>> below can be removed for your application contect. 
    Leave the GlobalProvider as an outer wrapping component
*/

function App() {
    return (

        <Container className="mt-8">

            {/*<<<*/}
            <Segment>

                <div className="absolute top-2 right-4">
                    <ConnectedAddressIndicator />
                </div>

                <div className="text-2xl font-bold">
                    Base Web3 Application Boilerplate
                    <div className="text-sm text-gray-500">
                        Ethers.JS Demo Button Below:
                    </div>
                </div>

                <div className="mt-4">
                    <ConnectWalletButton />
                </div>

                <div className="mt-4 w-40">
                    <PrintEthereumBalanceButton />
                </div>

                <div className="mt-4">
                    <ToggleDebugModeButton />
                </div>

                <div className="mt-4">
                    <StorageSolInteraction />
                </div>

            </Segment>

            {/**>>>*/}
        </Container>

    );
}

export default App;
