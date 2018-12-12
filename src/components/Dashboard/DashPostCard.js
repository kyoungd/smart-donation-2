import React from 'react';
import Card from '@material-ui/core/Card';
import CloseIcon from  '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import styled from 'styled-components';
import { Subline } from 'components';
import ApprovalButton from './ApprovalButton';

const uuidv1 = require('uuid/v1');

const RootPage = styled.div`
  padding-top: 2em;
  padding-bottom: 2em;
  margin-bottom: 1em;
  max-width: 120em;
  overflow-x: auto;
  div {
    max-width: 960px;
    margin: 10px;
  }
  h3 {
    margin-top: 0.5em;
  }
`;

const NameDiv = styled.div `
  display: flex;
  flex-direction: row;
  padding-top: 0.1em;
  justify-content: center;
  margin: 0;
`;

const CloseIconDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0;
  padding: 0;
`;


const PostVideo = styled.div`
  display: flex;
  flex-direction: row;
  padding-top: 0.1em;
  justify-content: center;
  margin: 0;
`;

const PostContent = styled.div`
  display:block;
`;

export default function DashPostCard ({product, onReturnToSublevelList, readOnly=false}) {

  console.log('DashPostCard  ---', product);
  const createdOn = product.createdOn ? product.createdOn : (product.productCreatedOn ? product.productCreatedOn : '');
  const subline = `CREATED ON: ${createdOn.length > 10 ? createdOn.slice(0,10) : createdOn}`;
  return (
    <RootPage key={uuidv1()}>
      <Card>
        <Subline sectionTitle>
          <CloseIconDiv>
            <div>{subline}</div>
            <IconButton 
              aria-label="closebutton"
              onClick={onReturnToSublevelList}
            >
              <CloseIcon fontSize="large" />
            </IconButton>
          </CloseIconDiv>
        </Subline>
        <NameDiv>{ product.name }</NameDiv>
        <CardContent>
          <PostVideo dangerouslySetInnerHTML={{ __html: product.video }} />
          <PostContent>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2">
                Product
              </Typography>
              <PostContent dangerouslySetInnerHTML={{ __html: product.html }} />
            </CardContent>
          </PostContent>
          < ApprovalButton product={product} onReturnToSublevelList={onReturnToSublevelList} readOnly={readOnly} />
        </CardContent>
      </Card>
    </RootPage>
  );
}
