import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { useFetchAssetData } from '../hooks/useFetchAssetData';
import { Asset } from '../types';

interface SourceAssetContextProviderProps {
    children: ReactNode; 
}

export const SourceAssetsContext = createContext<{ sourceAssets: Asset[] | undefined; setSourceAssets: React.Dispatch<React.SetStateAction<Asset[] | undefined>> }>({
    sourceAssets: undefined,
    setSourceAssets: () => {//default value
    }
});

export const SourceAssetsContextProvider: React.FC<SourceAssetContextProviderProps> = ({ children }) => {
    const { assets: initialAssets, loading, error } = useFetchAssetData();
    const [sourceAssets, setSourceAssets] = useState<Asset[] | undefined>(initialAssets);

    useEffect(() => {
        setSourceAssets(initialAssets);
    }, [initialAssets]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <SourceAssetsContext.Provider value={{ sourceAssets, setSourceAssets }}>
            {children}
        </SourceAssetsContext.Provider>
    );
};
