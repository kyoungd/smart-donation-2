import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import config from 'config/SiteConfig';

import styled from 'styled-components';

const SIconButtons = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    div {
      padding: 0px;
      margin: 0px;
    }
`;

function handleDelete() {
  alert('You clicked the delete icon.'); // eslint-disable-line no-alert
}

export default function IconButtons(data, listName = 'rootEdit') {
  return (
    <SIconButtons>
      <IconButton aria-label="Edit" onClick={()=> {
        console.log('CampaignControl-handleEdit: ', data.id);
        this.setState ({
          pageState: config.pageState[config.siteState][listName],
          pageEntityId: data.id
        });
      }}>
        <CreateIcon />
      </IconButton>
      <IconButton aria-label="Delete" onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </SIconButtons>
  );
}
