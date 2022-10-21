import { configuration } from 'config/_config';
import React from 'react';

export const ConfigurationContext = React.createContext(configuration);

export function ConfigurationContextProvider({ children }) {
    return (
        <ConfigurationContext.Provider value={configuration}>
            {children}
        </ConfigurationContext.Provider>
    )
}