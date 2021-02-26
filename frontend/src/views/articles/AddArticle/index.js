import React from 'react';
import {
    Box,
    Container,
    Grid,
    Typography,
    makeStyles
} from '@material-ui/core';
import Page from '../../../components/Page';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Toolbar from './Toolbar';

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.dark,
        minHeight: '100%',
        paddingBottom: theme.spacing(3),
        paddingTop: theme.spacing(3)
    }
}));

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const AddArticle = () => {
    const [activeTab, setActiveTab] = React.useState(0);
    const handleChange = (event, newValue) => {
        setActiveTab(newValue);
    };
    const classes = useStyles();

    return (
        <Page
            className={classes.root}
            title="Add new article"
        >
            <Container maxWidth={false}>
                <Toolbar />
                <Box mt={4}>
                    <Paper>
                        <Tabs
                            value={activeTab}
                            indicatorColor="primary"
                            textColor="primary"
                            onChange={handleChange}
                            aria-label="disabled tabs example"
                        >
                            <Tab label="Base" />
                            <Tab label="Image" />
                            <Tab label="Categories" />
                            <Tab label="Status" />
                        </Tabs>
                        <TabPanel value={activeTab} index={0}>
                            Page One
                    </TabPanel>
                        <TabPanel value={activeTab} index={1}>
                            Page Two
                    </TabPanel>
                        <TabPanel value={activeTab} index={2}>
                            Page Three
                    </TabPanel>
                        <TabPanel value={activeTab} index={3}>
                            Page Four
                    </TabPanel>
                    </Paper>
                </Box>
            </Container>
        </Page>
    );
};

export default AddArticle;