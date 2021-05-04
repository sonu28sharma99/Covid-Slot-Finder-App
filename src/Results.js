import React from 'react';
import { PaginatedResults } from './PaginatedResults';

const Results = ({results, currPage}) => {
  const perPage = 15;
  const indexOfLastItem = currPage*perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currResults = results.slice(indexOfFirstItem, indexOfLastItem);
  // console.log(results);
  return (
    <div style={{marginTop: '45px', paddingLeft: '25px'}}>
      {results.length !== 0 ? (
        <>
          <h2 style={{marginBottom: '35px'}}>Available Centers:</h2>
          <PaginatedResults sessions={currResults} />
        </>
      ) : (
        <h2 style={{color: 'red'}}>No slots available for the details you provided. Try something else.</h2>
      )}
    </div>
  );
}

export default Results;