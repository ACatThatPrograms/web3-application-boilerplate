import { Menu, Label, Image } from "semantic-ui-react";
import { Link, useLocation } from 'react-router-dom';
import { ReactComponent as AppLogo } from 'assets/Logo.svg';
import ConnectWalletButton from "components/buttons/ConnectWalletButton";
import { useSelector } from "react-redux";
import ethIcon from 'assets/eth-diamond-purple.png';

export function HeaderMenu() {

    const MiddleMenu = () => {

        const location = useLocation();
        const isActive = path => (location.pathname === path)

        return (
            <Menu secondary className="space-x-2 flex items-center" stackable >
                <Menu.Item as={Link} to="/" content="Home" active={isActive('/')} />
                <Menu.Item as={Link} to="/about" content="About" active={isActive('/about')} />
                <Menu.Item as={Link} to="/app" content="App" active={isActive('/app')} />
            </Menu>
        )
    }

    const Logo = () => {
        return (
            <div className="w-20">
                <AppLogo />
            </div>
        )
    }

    const Web3HeaderPanel = () => {

        const { connected, balances } = useSelector(state => ({ connected: state.ethereum.connected, balances: state.ethereum.balances }))

        const Web3Balances = () => {
            return (
                <Label size="small" className="bg-blue-200 flex justify-between items-center md:mb-0 mb-2 px-6">
                    <div>
                        <Image inline src={ethIcon} size="mini" className="w-3 mr-8" />
                    </div>
                    <div className="text-gray-700">{balances.ethereum} <span className="ml-2 text-gray-500">ETH</span> </div>
                </Label>
            )
        }

        return (
            <div className="flex flex-col md:flex-row">
                <div className="flex justify-center w-52 md:mr-8 mr-0">
                    {!!connected && <Web3Balances />}
                </div>
                <ConnectWalletButton />
            </div>
        )
    }

    return (

        <div className="flex justify-between items-center w-full px-6">

            <div className="hidden md:block flex items-center">
                <Logo />
            </div>

            <div className="flex items-center">
                <MiddleMenu />
            </div>

            <div className="flex items-center">
                <Web3HeaderPanel />
            </div>

        </div>

    )

}