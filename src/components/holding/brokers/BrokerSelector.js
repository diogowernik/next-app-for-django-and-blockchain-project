import React, { useEffect } from 'react';
import Select from 'react-select';
import { useFetchBrokers } from '@/hooks/fetch/useFetchBrokers';

export const BrokerSelector = ({ token, selectedBroker, setSelectedBroker }) => {
    const { brokers, loading, error } = useFetchBrokers(token);

    useEffect(() => {
        if (brokers.length > 0 && !selectedBroker) {
            setSelectedBroker(brokers[0]);
        }
    }, [brokers, selectedBroker]);

    const brokerOptions = brokers.map(broker => ({
        value: broker.id,
        label: broker.name
    }));

    const handleSelectBroker = option => {
        setSelectedBroker(brokers.find(broker => broker.id === option.value));
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <p>Error loading data: {error}</p>;

    return (
        <Select
            options={brokerOptions}
            value={brokerOptions.find(option => option.value === selectedBroker?.id)}
            onChange={handleSelectBroker}
            className="basic-single"
            classNamePrefix="select"
        />
    );
};
