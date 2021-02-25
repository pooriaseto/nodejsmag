import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  makeStyles
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import Page from '../../../components/Page';
import Toolbar from './Toolbar';
import ArticleCard from './ArticleCard';
import data from './data';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  },
  articleCard: {
    height: '100%'
  }
}));

const ArticleList = () => {
  const classes = useStyles();
  const [articles] = useState(data);

  return (
    <Page
      className={classes.root}
      title="Articles"
    >
      <Container maxWidth={false}>
        <Toolbar />
        <Box mt={3}>
          <Grid
            container
            spacing={3}
          >
            {articles.map((article) => (
              <Grid
                item
                key={article.id}
                lg={4}
                md={6}
                xs={12}
              >
                <ArticleCard
                  className={classes.articleCard}
                  article={article}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mt={3}
          display="flex"
          justifyContent="center"
        >
          <Pagination
            color="primary"
            count={3}
            size="small"
          />
        </Box>
      </Container>
    </Page>
  );
};

export default ArticleList;
