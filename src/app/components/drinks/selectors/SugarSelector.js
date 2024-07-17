'use client'
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

// export const SugarSelector = forwardRef(({drink, sugar, handleSugarChange}, ref) =>{


// export const SugarSelector = ({ drink, sugar, handleSugarChange }) =>
  export const SugarSelector = forwardRef(({ drink, sugar, handleSugarChange }, ref) => {
    return (
        <div ref={ref}>
            {!restrictionsMap[drink.restrictions]?.includes('SugarNotAdjustable') && (
                <>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-10 justify-center mx-5">
                            <div className='flex'>
                                <p className='text-red-500'>*</p>
                                Sugar Level:
                            </div>
                            <select 
                                value={sugar} 
                                onChange={handleSugarChange}
                                className="block w-11/12 justify-center mx-auto mt-1 bg-white border border-gray-300 text-gray-700 h-10 px-3 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option disabled>Select a Sugar Level</option>
                                <option value="100" className="bg-white text-gray-900">100% (Regular)</option>
                                <option value="70" className="bg-white text-gray-900">70%</option>
                                <option value="50" className="bg-white text-gray-900">50%</option>
                                <option value="30" className="bg-white text-gray-900">30%</option>
                                <option value="130" className="bg-white text-gray-900">130% + $.50</option>
                                {!restrictionsMap[drink.restrictions]?.includes('GreaterThan0PercentSugar') && (
                                    <option value="0" className="bg-white text-gray-900">0%</option>
                                )}
                            </select>
                        </label>
                    </div>
                </>
            )}
        </div>
    );
});

SugarSelector.displayName = 'SugarSelector';

export default SugarSelector