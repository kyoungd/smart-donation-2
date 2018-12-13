import React from 'react'
import styled from 'styled-components';
import CircularProgress from '@material-ui/core/CircularProgress';

const Content = styled.div`
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  div: {
    padding: 2em;
  }
`;

export default function() {
  return (
    <Content>
      <CircularProgress />
      <CircularProgress color="secondary" />
  </Content>
  );
}
