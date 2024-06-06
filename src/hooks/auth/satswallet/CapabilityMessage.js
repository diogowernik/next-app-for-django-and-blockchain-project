import React from 'react';


export const CapabilityMessage = ({ capabilityState, capabilities }) => {
    let message = "";
    switch(capabilityState) {
        case "loading":
            message = "Checking capabilities...";
            break;
        case "cancelled":
            message = "Capability check cancelled by wallet. Please refresh the page and try again.";
            break;
        case "missing":
            message = "Could not find an installed Sats Connect capable wallet. Please install a wallet and try again.";
            break;
        default:
            if (!capabilities) {
                message = "Something went wrong with getting capabilities";
            }
    }

    return message ? (
        <div style={{ padding: 30 }}>
            <h1>Sats Connect Test App - {message}</h1>
        </div>
    ) : null;
};

