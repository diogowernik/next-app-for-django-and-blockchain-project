
import { useState, useEffect } from "react";
import { getCapabilities } from "sats-connect";


// Hook para verificar capacidades
export const useCapabilityCheck = (network) => {
    const [capabilityState, setCapabilityState] = useState("loading");
    const [capabilities, setCapabilities] = useState(new Set());
  
    useEffect(() => {
      const runCapabilityCheck = async () => {
        let runs = 0;
        const MAX_RUNS = 20;
        setCapabilityState("loading");
  
        while (runs < MAX_RUNS) {
          try {
            await getCapabilities({
              onFinish(response) {
                setCapabilities(new Set(response));
                setCapabilityState("loaded");
              },
              onCancel() {
                setCapabilityState("cancelled");
              },
              payload: {
                network: { type: network },
              },
            });
            break;
          } catch (e) {
            runs++;
            if (runs === MAX_RUNS) {
              setCapabilityState("missing");
            }
          }
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      };
  
      runCapabilityCheck();
    }, [network]);
  
    return {
      capabilityState,
      capabilities
    };
  };