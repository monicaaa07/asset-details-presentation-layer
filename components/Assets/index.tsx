import { SourceAssetsContextProvider } from './context/SourceAssetsContext';
import { FilteredAssetsContextProvider } from './context/FilteredAssetsContext';
import AssetTable from './assetTable'; 
import React from 'react';

const Assets: React.FC = () => {
    return (
        <SourceAssetsContextProvider>
            <FilteredAssetsContextProvider>
                <AssetTable />
            </FilteredAssetsContextProvider>
        </SourceAssetsContextProvider>
    );
};


export default Assets;