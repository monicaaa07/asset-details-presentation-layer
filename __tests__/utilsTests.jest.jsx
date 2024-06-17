
import '@testing-library/jest-dom'
import { renderCreatedDate, renderOwnerName, renderTags, renderCrownJewelIcon } from '../components/Assets/utils';
import { render } from '@testing-library/react';
import {  icons } from '../components/Assets/locale';

describe('renderCreatedDate', () => {
    test('formats date correctly', () => {
        const inputDate = '2024-06-17T14:32:00Z';
        const expectedOutput = '2024-06-17 14:32:00';
        expect(renderCreatedDate(inputDate)).toBe(expectedOutput);
    });

    test('handles invalid date input', () => {
        const inputDate = 'invalid-date';
        const expectedOutput = 'Invalid Date';
        expect(renderCreatedDate(inputDate)).toBe(expectedOutput);
    });

    test('handles empty date input', () => {
        const inputDate = '';
        const expectedOutput = 'Invalid Date';
        expect(renderCreatedDate(inputDate)).toBe(expectedOutput);
    });

    test('handles null date input', () => {
        const inputDate = null;
        const expectedOutput = 'Invalid Date';
        expect(renderCreatedDate(inputDate)).toBe(expectedOutput);
    });

});

describe('renderOwnerName function', () => {
    it('should render owner name when owner is provided', () => {
        const owner = { name: 'John Doe' };
        const expected = 'John Doe';
        expect(renderOwnerName(owner)).toBe(expected);
    });

    it('should handle missing name and return "Unknown"', () => {
        const owner = { name: undefined };
        const expected = 'Unknown';
        expect(renderOwnerName(owner)).toBe(expected);
    });

    it('should handle missing owner and return "Unknown"', () => {
        const owner = undefined;
        const expected = 'Unknown';
        expect(renderOwnerName(owner)).toBe(expected);
    });
});

describe('renderTags function', () => {
    it('should render unique tags separated by comma', () => {
        const tags = [
            { value: 'apple' },
            { value: 'orange' },
            { value: 'banana' },
            { value: 'apple' }
        ];
        const expected = 'apple, orange, banana';
        expect(renderTags(tags)).toBe(expected);
    });

    it('should handle empty array and return empty string', () => {
        const tags = [];
        const expected = '';
        expect(renderTags(tags)).toBe(expected);
    });

    it('should handle all duplicate tags and return single tag value', () => {
        const tags = [
            { value: 'apple' },
            { value: 'apple' },
            { value: 'apple' }
        ];
        const expected = 'apple';
        expect(renderTags(tags)).toBe(expected);
    });
});



describe('renderCrownJewelIcon function', () => {
    it('should render red icon for crown jewel with OVERRIDE', () => {
        const { container } = render(renderCrownJewelIcon(true, 'OVERRIDE'));
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', icons.red);
        expect(imgElement).toHaveAttribute('alt', 'Red Icon');
    });

    it('should render green icon for crown jewel without OVERRIDE', () => {
        const { container } = render(renderCrownJewelIcon(true, 'OTHER'));
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', icons.green);
        expect(imgElement).toHaveAttribute('alt', 'Green Icon');
    });

    it('should render blue icon for non-crown jewel with OVERRIDE', () => {
        const { container } = render(renderCrownJewelIcon(false, 'OVERRIDE'));
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', icons.blue);
        expect(imgElement).toHaveAttribute('alt', 'Blue Icon');
    });

    it('should render gray icon for non-crown jewel without OVERRIDE', () => {
        const { container } = render(renderCrownJewelIcon(false, 'OTHER'));
        const imgElement = container.querySelector('img');
        expect(imgElement).toBeInTheDocument();
        expect(imgElement).toHaveAttribute('src', icons.gray);
        expect(imgElement).toHaveAttribute('alt', 'Gray Icon');
    });
});
