export const initializeEVMProviders = (onAnnounceProvider) => {
    window.addEventListener("eip6963:announceProvider", onAnnounceProvider);
    window.dispatchEvent(new Event("eip6963:requestProvider"));
  
    return () => {
      window.removeEventListener("eip6963:announceProvider", onAnnounceProvider);
    };
  };
  
// const providersData = initializeEVMProviders(onAnnounceProvider);