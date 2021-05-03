import React, {useState} from 'react';
import { PaginatedResults } from './PaginatedResults';


// card for each, grid, pagination
const Results = ({results, currPage}) => {
  const perPage = 15;
  const indexOfLastItem = currPage*perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  // console.log(results);
  const currResults = results.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div style={{marginTop: '45px', paddingLeft: '25px'}}>
      <h2 style={{marginBottom: '35px'}}>Available Slots:</h2>
      {/* <div style={{display: 'flex', justifyContent: 'center'}}> */}
      <PaginatedResults sessions={currResults} />
      {/* </div> */}
    </div>
  );
}

export default Results;