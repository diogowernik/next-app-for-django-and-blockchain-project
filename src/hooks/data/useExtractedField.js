// @/hooks/data/useExtractedField

import React, { useState, useEffect } from 'react';

// Hook para extrair campos específicos como categorias ou brokers
export const useExtractedField = (portfolioAssets, fieldName) => {
    const [extractedFields, setExtractedFields] = useState([]);

    useEffect(() => {
        if (portfolioAssets) {
            const fieldValues = new Set();
            portfolioAssets.forEach(asset => {
                if (asset[fieldName]) {
                    fieldValues.add(asset[fieldName]);
                }
            });
            setExtractedFields([...fieldValues]);
        }
    }, [portfolioAssets, fieldName]);

    return extractedFields;
};


