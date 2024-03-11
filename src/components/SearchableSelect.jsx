// SearchableSelect.js

"use client"
import useFetchAll from '@/hooks/useFetchAll';
import React from 'react';
import Select from 'react-select';


const SearchableSelect = ({tag,onChange, value,fil,uri }) => {
 
  let data
  const {cards} = useFetchAll(tag,fil)
  console.log("searched......",cards)
  data = cards

  return (
    <Select
      options={data}
      onChange={onChange}
      value={value?.id}
      isSearchable
      placeholder={`Search ${tag}`}
    />
  );
};

export default SearchableSelect;