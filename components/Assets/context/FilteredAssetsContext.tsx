import React, { createContext, ReactNode, useState, useContext } from 'react';
import { SourceAssetsContext } from './SourceAssetsContext'; 
import { Asset } from '../types';

interface FilteredAssetContextProviderProps {
    children: ReactNode;
}

interface FilteredAssetContextValue {
    filteredAssets: Asset[];
    setFilteredAssets: React.Dispatch<React.SetStateAction<Asset[]>>;
}

const defaultValue: FilteredAssetContextValue = {
    filteredAssets: [],
    setFilteredAssets: () => {
      console.warn('setFilteredAssets was called without a provider');
    },
  };

export const FilteredAssetsContext = createContext<FilteredAssetContextValue >(defaultValue);

export const FilteredAssetsContextProvider: React.FC<FilteredAssetContextProviderProps> = ({ children }) => {
    const { sourceAssets } = useContext(SourceAssetsContext);
    const [filteredAssets, setFilteredAssets] = useState<Asset[]>(sourceAssets);

    return (
        <FilteredAssetsContext.Provider value={{ filteredAssets, setFilteredAssets }}>
            {children}
        </FilteredAssetsContext.Provider>
    );
};