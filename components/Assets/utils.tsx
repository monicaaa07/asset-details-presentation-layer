// tableUtils.ts

import React from 'react';
import { Tag, Owner } from './types';
import { icons } from './locale';
import dayjs from 'dayjs';

// Function to render created date
export const renderCreatedDate = (created: string) => {
    return dayjs(created).format('YYYY-MM-DD HH:mm:ss'); // Adjust format as needed
};

// Function to render tags
export const renderTags = (tags: Tag[]) => {
    const uniqueTags = Array.from(new Set(tags.map(tag => tag.value))); // Extract unique tag values
    return uniqueTags.join(', '); // Join unique tag values with comma
};

// Function to render owner name
export const renderOwnerName = (owner: Owner) => {
    return owner && owner.name ? owner.name : 'Unknown'; // Default to 'Unknown' if owner or name is missing
};

// Function to render crown jewel icon based on conditions
export const renderCrownJewelIcon = (isCrownJewel: boolean, crownJewelIndicator: string) => {
    if (isCrownJewel && crownJewelIndicator === 'OVERRIDE') {
        return <img src={icons.red} alt="Red Icon" style={{ width: 20, height: 20 }} />;
    } else if (isCrownJewel) {
        return <img src={icons.green} alt="Green Icon" style={{ width: 20, height: 20 }} />;
    } else if (!isCrownJewel && crownJewelIndicator === 'OVERRIDE') {
        return <img src={icons.blue} alt="Blue Icon" style={{ width: 20, height: 20 }} />;
    } else {
        return <img src={icons.gray} alt="Gray Icon" style={{ width: 20, height: 20 }} />;
    }
};
