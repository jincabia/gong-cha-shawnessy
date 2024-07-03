import React from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';

const categories = ['All', 'Smoothie', 'Milk Tea', 'Fresh Milk', 'Fruit Tea', 'Milk Foam', 'Sparklings'];

const CustomSelect = styled(Select)({
    backgroundColor: '#8B0000', // dark red background
    outline: 'none',
    boxShadow: 'none',
    color: 'white',
    '&:hover': {
      backgroundColor: '#FF6347', // tomato color on hover
    },
    '&.Mui-focused': {
      backgroundColor: '#8B0000', // maintain background color on focus
      outline: 'none',
      boxShadow: 'none',
    },
    '& .MuiSelect-icon': {
      color: 'white', // color of the dropdown icon
    },
  });

const CustomMenuItem = styled(MenuItem)({
  '&:hover': {
    backgroundColor: '#8B0000', // light blue on hover
  },
});

const Filter = ({ selectedCategory, setSelectedCategory }) => {
  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <FormControl fullWidth>
      {/* <InputLabel id="category-select-label" style={{ color: 'white' }}>Category</InputLabel> */}
      <CustomSelect
        // labelId="category-select-label"
        value={selectedCategory}
        onChange={handleChange}
      >
        {categories.map(category => (
          <CustomMenuItem key={category} value={category}>
            {category}
          </CustomMenuItem>
        ))}
      </CustomSelect>
    </FormControl>
  );
};

export default Filter;
