import { useState } from "react";
import { xverseManager } from '@/services/wallets';
import { BitcoinNetworkType } from "sats-connect";

const SendBitcoin = ({ network }) => {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const onSendBtcClick = async () => {
    if (!xverseManager.isReady) {
      alert("Wallet is not connected.");
      return;
    }

    try {
      const transaction = await xverseManager.sendTransaction({
        recipient,
        amount: BigInt(amount) // Assuming the amount is to be entered in satoshis
      });

      if (transaction) {
        alert(`Transaction successful! Transaction ID: ${transaction.txid}`);
      } else {
        alert("Transaction failed!");
      }
    } catch (error) {
      alert(`Error sending Bitcoin: ${error.message}`);
    }
  };

  const sendDisabled = recipient.length === 0 || amount.length === 0;

  return (
    <div className="container">
      <h3>Send Bitcoin</h3>
      {network !== BitcoinNetworkType.Testnet && (
        <div>Only available on testnet</div>
      )}
      <p>
        <b>Recipient address</b>
        <br />
        <input
          value={recipient}
          onChange={e => setRecipient(e.target.value)}
          placeholder="Enter recipient's address"
        />
      </p>
      <p>
        <b>Send amount (in satoshis)</b>
        <br />
        <input
          type="number"
          value={amount}
          onChange={e => setAmount(e.target.value)}
          placeholder="Enter amount to send"
        />
      </p>
      <button onClick={onSendBtcClick} disabled={sendDisabled}>
        Send BTC
      </button>
    </div>
  );
};

export default SendBitcoin;
