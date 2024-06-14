export class EIP1193Provider {
  constructor() {
    this.request = async (payload) => {
      // Implementação da solicitação
    };

    this.on = (eventName, callback) => {
      // Implementação do ouvinte de eventos
    };
  }
}

export class EIP6963ProviderInfo {
  constructor(uuid, name, icon, rdns) {
    this.uuid = uuid;
    this.name = name;
    this.icon = icon;
    this.rdns = rdns;
  }
}

export class EIP6963ProviderDetail {
  constructor(info, provider) {
    this.info = info;
    this.provider = provider;
  }
}

export class EVMProviderDetected extends EIP6963ProviderDetail {
  constructor(info, provider, accounts, request) {
    super(info, provider);
    this.accounts = accounts;
    this.request = request;
  }
}

export class EIP6963AnnounceProviderEvent extends Event {
  constructor(detail) {
    super('eip6963:announceProvider');
    this.detail = detail;
  }
}
