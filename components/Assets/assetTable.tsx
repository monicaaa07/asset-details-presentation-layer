import React, { useContext, useState } from 'react';
import { Table, DatePicker, Select, Input, AutoComplete, Dropdown, Menu } from 'antd';
import { Asset, Tag, Enrich, Owner } from './types'; 
import { FilteredAssetsContext } from './context/FilteredAssetsContext';
import { useGetMinCreatedDate } from './hooks/useGetMinCreatedDate';
import { useGetAssetNameOptions } from './hooks/useGetAssetNameOptions';
import useFilterAssetTable from './hooks/useFilterAssetTable';
import { assetOptions } from './locale';
import { renderCreatedDate, renderTags, renderOwnerName, renderCrownJewelIcon } from './utils';
import { Dayjs } from 'dayjs';
import useOverrideIsCrownJewel from './hooks/useOverrideIsCrownJewel';


const { RangePicker } = DatePicker;
const { Option } = Select;

const AssetTable: React.FC = () => {
    const { filteredAssets } = useContext(FilteredAssetsContext);
    const minCreated = useGetMinCreatedDate();
    const nameOptions = useGetAssetNameOptions();
    const [selectedAssetTypes, setSelectedAssetTypes] = useState<string[]>([]);
    const [searchText, setSearchText] = useState<string>('');
    const [filterDates, setFilterDates] = useState<[Dayjs | null, Dayjs | null]>([null, null]);
    const { handleCrownJewelOverride } = useOverrideIsCrownJewel();

    useFilterAssetTable({filterDates, searchText, selectedAssetTypes});

    const handleDateChange = (dates: [Dayjs | null, Dayjs | null]) => {
        setFilterDates(dates);
    };

    const handleSearch = (value: string) => {
        setSearchText(value);
    };

    const handleAssetTypeChange = (value: string[]) => {
        setSelectedAssetTypes(value);
    };

    const overrideIsCrownJewel = (assetId: string) => (
        <Menu onClick={({ key }) => handleCrownJewelOverride(assetId, key === 'true')}>
            <Menu.Item key="true">True</Menu.Item>
            <Menu.Item key="false">False</Menu.Item>
        </Menu>
    );

    return (
            <Table
                pagination={{ hideOnSinglePage: true }}
                dataSource={filteredAssets}
                columns={[
                    {
                        title: 'id',
                        dataIndex: '_id',
                        key: 'id',
                    },
                    {
                        title: 'Creation Date',
                        dataIndex: 'created',
                        key: 'created',
                        render: (created: string) => renderCreatedDate(created),
                        filterDropdown: () => (
                            <div style={{ padding: 8 }}>
                                {minCreated && (
                                    <RangePicker
                                        allowEmpty={[false, true]}
                                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                                        // @ts-ignore
                                        onChange={handleDateChange} 
                                        defaultPickerValue={minCreated}
                                        value={filterDates}
                                    />
                                )}
                            </div>
                        ),
                    },
                    {
                        title: 'Criticality',
                        dataIndex: 'criticalityFactor',
                        key: 'criticality',
                        sorter: (a: Asset, b: Asset) => a.criticalityFactor - b.criticalityFactor,
                        sortOrder: 'ascend',
                    },
                    {
                        title: 'Type',
                        dataIndex: ['enrich', 'assetType'],
                        key: 'type',
                        filterDropdown: () => (
                            <div style={{ padding: 8 }}>
                                <Select
                                    mode="multiple"
                                    showSearch
                                    value={selectedAssetTypes}
                                    onChange={handleAssetTypeChange}
                                    placeholder="Select asset types"
                                    allowClear
                                    style={{ width: '100%' }}
                                >
                                    {assetOptions.map(type => (
                                        <Option key={type.label} value={type.value}>{type.label}</Option>
                                    ))}
                                </Select>
                            </div>
                        )
                        
                    },
                    {
                        title: 'Env',
                        dataIndex: ['enrich', 'env'],
                        key: 'env',
                    },
                    {
                        title: 'Is Crown Jewel',
                        dataIndex: 'enrich',
                        key: 'isCrownJewel',
                        render: (enrich: Enrich, asset: Asset) => (
                            <Dropdown overlay={overrideIsCrownJewel(asset._id)} trigger={['click']}>
                                <span style={{ cursor: 'pointer' }}>
                                    {renderCrownJewelIcon(enrich.isCrownJewel, enrich.crownJewelIndicator)}
                                </span>
                            </Dropdown>
                        ),
                    },
                    {
                        title: 'Asset Name',
                        dataIndex: 'name',
                        key: 'assetName',
                        filterDropdown: () => (
                            <div style={{ padding: 8 }}>
                                <AutoComplete
                                    value={searchText}
                                    options={nameOptions.map(option => ({ value: option.value, label: option.label }))}
                                    onSearch={handleSearch}
                                    onSelect={handleSearch}
                                    onChange={handleSearch}
                                    placeholder="Search asset name"
                                    allowClear
                                    style={{ width: '100%' }}
                                >
                                    <Input.Search size="middle" />
                                </AutoComplete>
                            </div>
                        ),
                    },
                    {
                        title: 'Owner Name',
                        dataIndex: 'owner',
                        key: 'ownerName',
                        render: (owner: Owner) => renderOwnerName(owner),
                    },
                    {
                        title: 'Tags',
                        dataIndex: 'tags',
                        key: 'tags',
                        render: (tags: Tag[]) => renderTags(tags),
                    },
                ]}
                onHeaderRow={() => ({
                    style: { background: '#f5f5f5' },
                })}
            />
    );
};

export default AssetTable;
