import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Lander, PageWrap } from 'components';

/**
 * Root application entry component.
 * @component
 * @example
 * ReactDOM.render( <App />, document.getElementById('roo
') );
 */
function App() {

    return (
        <Router>

            <PageWrap>

                <Routes>

                    <Route path="/" element={<Lander />} />

                </Routes>

            </PageWrap>

        </Router>
    );
}

export default App;
