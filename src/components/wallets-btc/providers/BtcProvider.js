import { getAddress, AddressPurpose } from "sats-connect";

export class BtcProvider {
  constructor(providerName, network) {
    this.providerName = providerName.toLowerCase();
    this.network = network;
    this.events = {};
  }

  async requestAccounts() {
    if (this.providerName === "unisat") {
      const unisat = window.unisat;
      const accounts = await unisat.requestAccounts();
      const publicKeys = await Promise.all(accounts.map(() => unisat.getPublicKey()));
      return { accounts, publicKeys };
    } else if (this.providerName === "xverse") {
      const response = await getAddress({
        payload: {
          purposes: [AddressPurpose.Ordinals, AddressPurpose.Payment],
          message: `Connect With ${this.providerName}`,
          network: { type: this.network },
        },
      });
      const addresses = response?.addresses || [];
      const accounts = addresses.map(addr => addr.address);
      const publicKeys = addresses.map(addr => addr.publicKey);
      return { accounts, publicKeys };
    }
    throw new Error("Unsupported provider");
  }

  on(event, handler) {
    this.events[event] = handler;
    if (event === "accountsChanged") {
      window.addEventListener("accountsChanged", handler);
    }
    if (event === "chainChanged") {
      window.addEventListener("chainChanged", handler);
    }
  }

  off(event, handler) {
    if (event === "accountsChanged") {
      window.removeEventListener("accountsChanged", handler);
    }
    if (event === "chainChanged") {
      window.removeEventListener("chainChanged", handler);
    }
  }

  async getNetwork() {
    return this.network;
  }
}
