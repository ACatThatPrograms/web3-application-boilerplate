import React from 'react';
import ethAdapter from "eth/ethAdapter"

export function Home() {

    const get = async () => {
        let storedInt = await ethAdapter.contractMethods.STORAGE.retrieve_view();
        console.log(ethAdapter.contractMethods.STORAGE.retrieve_view);
        console.log(storedInt);
    }

    React.useEffect( () => {
        get();    
    }) 

    return (
        <h1>Home</h1>
    )
}