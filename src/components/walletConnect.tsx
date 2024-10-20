import { 
    ConnectWallet, 
    Wallet, 
    WalletDropdown, 
    WalletDropdownBasename, 
    WalletDropdownDisconnect 
} from '@coinbase/onchainkit/wallet'; 
import {
    Address,
    Avatar,
    Name,
    Identity,
    EthBalance,
} from '@coinbase/onchainkit/identity';
import { color } from '@coinbase/onchainkit/theme';

interface WalletComponentsProps {
    setWalletAddress: (address: string) => void;
}

export function WalletComponents({ setWalletAddress }: WalletComponentsProps) {
    return (
        <div className="flex justify-end">
            <Wallet>
                <ConnectWallet>
                    <Avatar className="h-6 w-6" />
                    <Name />
                </ConnectWallet>
                <WalletDropdown>
                    <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                        <Avatar />
                        <Name />
                        <Address className={color.foregroundMuted} />
                        <EthBalance />
                    </Identity>
                    <WalletDropdownBasename />
                    <WalletDropdownDisconnect />
                </WalletDropdown>
            </Wallet>
        </div>
    );
}