'use client'
import React, {useState,useEffect} from 'react';
import { Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { styled } from '@mui/system';
import { ReadCategory } from './readCategory';




const CustomSelect = styled(Select)({
  backgroundColor: '#8B0000', // dark red background
  outline: 'none',
  boxShadow: 'none',
  color: 'white',
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
    backgroundColor: ' #efefef ', // light blue on hover
  },
});

const Filter = ({ selectedCategory, setSelectedCategory }) => {

  // Have these as default categories
  const [categories,setCategories] = useState(['All', 'Smoothie', 'Milk Tea', 'Fresh Milk', 'Fruit Tea', 'Milk Foam', 'Sparklings']);

  const fetchCategories = async () => {
    try {
      const dbCategories = await ReadCategory();
      
      
      const newCategories = ['All', ...dbCategories.map(c => c.name)];

      setCategories(newCategories);

    } catch (error) {
      console.error('Error fetching drink:', error);
    }
  };

 

  useEffect(() => {
    fetchCategories();
  }, []);


  const handleChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  return (
    <FormControl fullWidth >
      <CustomSelect
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
