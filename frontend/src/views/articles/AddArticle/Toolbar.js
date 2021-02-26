import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import {
  Box,
  Button,
  makeStyles
} from '@material-ui/core';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  root: {},
  button: {
    marginRight: theme.spacing(1)
  }
}));

const Toolbar = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <div
      className={clsx(classes.root, className)}
      {...rest}
    >
      <Box
        display="flex"
        justifyContent="flex-end"
      >
        <a href="https://www.google.com" target="_blank">
          <Button
            className={classes.button}
            color="secondary"
            variant="contained">
            Show on blog
          </Button>
        </a>
        <Link to="/app/articles">
          <Button
            color="primary"
            variant="contained">
            Back to list
          </Button>
        </Link>
      </Box>
    </div>
  );
};

Toolbar.propTypes = {
  className: PropTypes.string
};

export default Toolbar;
