'use client'
import { forwardRef, useEffect } from "react";

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

export const IceSelector = forwardRef(({ drink, ice, soy, handleIceChange, initialAmt = '' }, ref) => {

    useEffect(() => {
        if (initialAmt !== '') {
            ice(initialAmt)
        }
    }, [initialAmt, ice]);

    return (
        <div ref={ref} className="">
            {!restrictionsMap[drink.restrictions]?.includes('IceNotAdjustable') && (
                <>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold my-10 justify-center mx-5">
                            <div className='flex'>
                                <p className='text-red-500'>*</p>
                                Ice Level:
                            </div>
                            <select 
                                value={ice} 
                                onChange={handleIceChange}
                                className="block w-11/12 justify-center mx-auto mt-1 bg-white border border-gray-300 text-gray-700 h-10 px-3 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option disabled>Select an Ice Level</option>
                                {!restrictionsMap[drink.restrictions]?.includes('GreaterThanLessIce') && !soy && (
                                    <option value="No ice" className="bg-white text-gray-900">No Ice</option>
                                )}
                                <option value="Less ice" className="bg-white text-gray-900">Less Ice</option>
                                <option value="Regular ice" className="bg-white text-gray-900">Regular Ice</option>
                                <option value="Extra ice" className="bg-white text-gray-900">Extra Ice</option>
                                {!restrictionsMap[drink.restrictions]?.includes('NotAvailableHot') && !soy && (
                                    <option value="Hot" className="bg-white text-gray-900">Hot + $.50 (Only Available In Medium Sizes)</option>
                                )}
                            </select>
                        </label>
                    </div>
                </>
            )}
            {!restrictionsMap[drink.restrictions]?.includes('NotAvailableHot') && (
                <p className='w-fit mx-auto truncate text-gray-700 text-xs pb-10'>*Hot drinks are only available in Medium Sizes.</p>
            )}
        </div>
    );
});

IceSelector.displayName = 'IceSelector';

export default IceSelector
