import { StorageSolInteraction } from "components";
import { Segment } from "semantic-ui-react";

export function Lander() {

    return (

        <Segment className="text-left">

            <div className="absolute top-2 right-4">
            </div>

            <div className="text-2xl font-bold">
                Base Web3 Application Boilerplate
                <div className="text-sm text-gray-500">
                    Ethers.JS Demo Button Below:
                </div>
            </div>

            <div className="mt-4">
                <StorageSolInteraction />
            </div>

        </Segment>

    )

}