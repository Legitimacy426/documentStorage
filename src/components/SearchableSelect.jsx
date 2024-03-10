// SearchableSelect.js

"use client"
import useFetchAll from '@/hooks/useFetchAll';
import React from 'react';
import Select from 'react-select';


const SearchableSelect = ({tag,onChange, value, }) => {
 
  let data
  switch(tag) {
    case "folders":
      const {cards} = useFetchAll(tag)
      console.log("seatrched",cards)
      data = cards
      break;
    case "vehicles":
      const {vd} = useFetchAll(tag)
      data = vd
  break
    case "policies":
     
    const {pd} = useFetchAll(tag)
    data = pd
    break
    case "quotes":
      const {qd} = useFetchAll(tag)
      data = qd
  break
    default:
   data = []
  }

  return (
    <Select
      options={data}
      onChange={onChange}
      value={value?._id}
      isSearchable
      placeholder={`Search ${tag}`}
    />
  );
};

export default SearchableSelect;