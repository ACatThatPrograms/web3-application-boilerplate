import React from 'react';
import { Container, Box } from '@mui/material';
import { Copyright, NavigationBar } from './components'

// Pages
import { Home } from './pages';
import { useDispatch, useSelector } from 'react-redux';
import { APPLICATION_ACTIONS } from 'redux/actions';
import { ThemeProvider } from '@mui/system';

import { theme } from 'theme/MUITheme';

import { ConfigurationContext } from 'context/ConfigurationContext';

export default function App() {

    const dispatch = useDispatch()
    const configuration = React.useContext(ConfigurationContext);
    const pages = configuration.site.pages;
    const { currentPage, setPage } = useSelector(s => ({
        currentPage: s.application.activePage,
        setPage: (page) => dispatch(APPLICATION_ACTIONS.setActivePage(page))
    }))

    // Apply site-wide configs
    React.useEffect(() => {
        console.log(`MUI THEME:`, theme);
        document.title = configuration.site.title;
    }, [])

    const navigate = (page) => {
        setPage(page)
    }

    const renderPage = () => {
        for (let page of configuration.site.pages) {
            if (currentPage === page.name) {
                return <page.render />
            }
        }
        return <Home />
    }

    return (
        <ThemeProvider theme={theme}>
            <NavigationBar pages={pages} navigate={navigate} />
            <Container maxWidth="lg">
                {renderPage()}
            </Container>
            <Box sx={{ my: 4 }}>
                <Copyright />
            </Box>
        </ThemeProvider>
    );
}