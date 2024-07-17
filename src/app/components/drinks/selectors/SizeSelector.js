'use client';
import { forwardRef } from "react";

const restrictionsMap = {
    0: [],
    1: ['MediumSizeOnly'],
    2: ['GreaterThanLessIce', 'NotAvailableHot'],
    3: ['GreaterThan0PercentSugar'],
    4: ['IceNotAdjustable', 'NotAvailableHot'],
    5: ['SugarNotAdjustable'],
    6: ['GreaterThanLessIce', 'NotAvailableHot', 'GreaterThan0PercentSugar'],
    7: ['MediumSizeOnly', 'IceNotAdjustable', 'NotAvailableHot', 'SugarNotAdjustable'],
    8: ['SugarNotAdjustable', 'GreaterThanLessIce', 'NotAvailableHot']
};

export const SizeSelector = forwardRef(({ drink, size, handleSizeChange, ice }, ref) => {
    return (
        <div ref={ref}>
            {!restrictionsMap[drink.restrictions]?.includes('MediumSizeOnly') && (
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-10 justify-center mx-5">
                        <div className='flex'>
                            <p className='text-red-500'>*</p>
                            Size:
                        </div>
                        <select 
                            value={size} 
                            onChange={handleSizeChange}
                            className="block w-11/12 justify-center mx-auto mt-1 bg-white border border-gray-300 text-gray-700 h-10 px-3 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                        >
                            <option disabled>Select a Size</option>
                            <option value="Medium" className="bg-white text-gray-900">Medium</option>
                            {(!restrictionsMap[drink.restrictions]?.includes('MediumSizeOnly') && ice !== "Hot") && (
                                <option value="Large" className="bg-white text-gray-900">Large + $0.50</option>
                            )}
                        </select>
                    </label>
                </div>
            )}
        </div>
    );
});

