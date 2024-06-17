import React, { createContext, ReactNode, useState, useContext } from 'react';
import { SourceAssetsContext } from './SourceAssetsContext'; 
import { Asset } from '../types';

interface FilteredAssetContextProviderProps {
    children: ReactNode;
}

interface FilteredAssetContextValue {
    filteredAssets: Asset[] | undefined;
    setFilteredAssets: React.Dispatch<React.SetStateAction<Asset[] | undefined>>;
}

export const FilteredAssetsContext = createContext<FilteredAssetContextValue | undefined>(undefined);

export const FilteredAssetsContextProvider: React.FC<FilteredAssetContextProviderProps> = ({ children }) => {
    const { sourceAssets } = useContext(SourceAssetsContext);
    const [filteredAssets, setFilteredAssets] = useState<Asset[] | undefined>(sourceAssets);

    return (
        <FilteredAssetsContext.Provider value={{ filteredAssets, setFilteredAssets }}>
            {children}
        </FilteredAssetsContext.Provider>
    );
};