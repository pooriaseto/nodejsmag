import React from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  makeStyles,
  Card,
  CardActions,
  CardContent,
  Divider,
  Grid,
} from '@material-ui/core';

import clsx from 'clsx';
import Page from '../../components/Page';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const RegisterView = () => {
  const classes = useStyles();
  const navigate = useNavigate();

  return (
    <Page className={classes.root} title="Register">
      <Container maxWidth="lg">
        <Grid container>
          <Grid item
            lg={4}
            md={6}
            xs={12}>
            <Card>
              <CardContent>
                <Formik
                  initialValues={{
                    email: '',
                    firstName: '',
                    lastName: '',
                    password: '',
                    policy: false
                  }}
                  validationSchema={
                    Yup.object().shape({
                      email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                      firstName: Yup.string().max(255).required('First name is required'),
                      lastName: Yup.string().max(255).required('Last name is required'),
                      password: Yup.string().max(255).required('password is required'),
                      policy: Yup.boolean().oneOf([true], 'This field must be checked')
                    })
                  }
                  onSubmit={() => {
                    navigate('/app/dashboard', { replace: true });
                  }}
                >
                  {({
                    errors,
                    handleBlur,
                    handleChange,
                    handleSubmit,
                    isSubmitting,
                    touched,
                    values
                  }) => (
                    <form onSubmit={handleSubmit}>
                      <Box mb={3}>
                        <Typography
                          color="textPrimary"
                          variant="h2"
                        >
                          Register new user
                  </Typography>
                      </Box>
                      <TextField
                        error={Boolean(touched.firstName && errors.firstName)}
                        fullWidth
                        helperText={touched.firstName && errors.firstName}
                        label="First name"
                        margin="normal"
                        name="firstName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.firstName}
                        variant="outlined"
                        autoComplete="off"
                      />
                      <TextField
                        error={Boolean(touched.lastName && errors.lastName)}
                        fullWidth
                        helperText={touched.lastName && errors.lastName}
                        label="Last name"
                        margin="normal"
                        name="lastName"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        value={values.lastName}
                        variant="outlined"
                        autoComplete="off"
                      />
                      <TextField
                        error={Boolean(touched.email && errors.email)}
                        fullWidth
                        helperText={touched.email && errors.email}
                        label="Email Address"
                        margin="normal"
                        name="email"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="email"
                        value={values.email}
                        variant="outlined"
                        autoComplete="off"
                      />
                      <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                      />
                      <Box my={2}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Sign up now
                  </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default RegisterView;
