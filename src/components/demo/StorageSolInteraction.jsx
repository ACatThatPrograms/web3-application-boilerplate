import React from 'react';
import { useSelector } from 'react-redux';
import { Segment, Form, Header } from 'semantic-ui-react';
import ethAdapter, { CONTRACT_NAMES } from 'eth/ethAdapter';

export function StorageSolInteraction() {

    const [storedValue, setStoredValue] = React.useState('');
    const [updateVal, setUpdateVal] = React.useState('');
    const [loader, setLoader] = React.useState(false);
    const { web3Connected } = useSelector(state => ({ web3Connected: state.ethereum.connected }));

    const setValue = async () => {
        let asNum;

        try {
            asNum = parseInt(updateVal);
        } catch (ex) {
            return;
        }

        setLoader(true);
        let setTx = await ethAdapter._trySend(CONTRACT_NAMES.STORAGE, 'store', [asNum]);
        await setTx.wait();
        getValue();
    }

    const getValue = async () => {
        let storedValue = await ethAdapter._tryCall(CONTRACT_NAMES.STORAGE, 'retrieve');
        setStoredValue(storedValue);
        setUpdateVal('');
        setLoader(false);
    }

    React.useEffect(() => {
        if (web3Connected) {
            getValue();
        }
    }, [web3Connected]);

    return (

        <Segment attached>

            <div>

                <Header textAlign="center" className="text-left">
                    Storage.Sol Interaction Demo
                    <Header.Subheader>
                        For demo, verify network is set to Goerli and dotenv has been copied to .env
                    </Header.Subheader>
                </Header>

                <div className="flex  mt-6">

                    <Form size="mini">

                        <Form.Input
                            actionPosition="left"
                            action={{
                                color: "blue",
                                size: "mini",
                                content: "Stored Value",
                                onClick: getValue,
                                disabled: true,
                            }}
                            value={web3Connected ? (storedValue) : ""}
                            readOnly
                        />

                        <Form.Input
                            action={{
                                color: "blue",
                                size: "mini",
                                content: "Update Value",
                                onClick: setValue,
                                disabled: !web3Connected,
                                loading: loader,
                            }}
                            placeholder="Must be a number!"
                            value={web3Connected ? (updateVal) : "No Wallet Detected"}
                            onChange={e => setUpdateVal(e.target.value)}
                        />

                    </Form>

                </div>

            </div>

        </Segment>

    )


}