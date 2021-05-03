import React from 'react';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import { Grid } from '@material-ui/core';

// name, min_age_limit, vaccine, capacity, fee_type, fee
const SessionCard = ({name, vaccine, min_age, paid, capacity, fee}) => {
  return (
    <Card style={{backgroundColor: '#3f51b519', minWidth: '160px'}}>
      <CardContent>
        <h4 style={{
          marginTop: '0px',
        }}>
          {name}
        </h4>
        <h6 style={{
          marginTop: '-12px',
        }}>
          **{vaccine}**
        </h6>
        <h5
        style={{
          marginTop: '-9px',
        }}>
          Minimum Age: {min_age}
        </h5><h5
        style={{
          marginTop: '-15px',
        }}>
          Capacity: {capacity}
        </h5>
        <h5
        style={{
          marginTop: '-15px',
        }}>
          Fee: ₹{fee}
        </h5>
      </CardContent>
    </Card>
  );
}

export const PaginatedResults = ({sessions}) => {
  return (
    <Grid container spacing={4} style={{
      paddingRight: '10px',
      marginBottom: '20px',
      width: '90%',
      // backgroundColor: 'yellow'
    }}>
      {
        sessions.map((session, idx) => (
          <Grid item xs={12} sm={6} md={6} lg={4}>
            <SessionCard
              name = {session.name}
              vaccine = {session.vaccine}
              min_age = {session.min_age_limit}
              paid = {session.fee_type === "Free" ? false : true}
              capacity = {session.available_capacity}
              fee = {session.fee}
              key={session.center_id}
            />
          </Grid>
        ))
      }
    </Grid>
  );
}
