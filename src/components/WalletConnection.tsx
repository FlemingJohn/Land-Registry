import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface WalletConnectionProps {
  account: string | null;
  connectWallet: () => void;
}

const WalletConnection = ({ account, connectWallet }: WalletConnectionProps) => {
  const truncateAddress = (address: string) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <div>
      {account ? (
        <Badge className="bg-retro-terminal text-retro-dark font-terminal border-2 border-retro-terminal">
            <span className="mr-2">CONNECTED:</span>
            {truncateAddress(account)}
        </Badge>
      ) : (
        <Button
            onClick={connectWallet}
            className="font-terminal text-retro-terminal bg-retro-dark border-2 border-retro-terminal hover:bg-retro-terminal hover:text-retro-dark"
        >
            CONNECT_WALLET.EXE
        </Button>
      )}
    </div>
  );
};

export default WalletConnection;
