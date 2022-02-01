import { Container } from 'semantic-ui-react';

export function PageWrap({ children }) {

    return (

        <Container className="mt-12">

            {children}

        </Container>

    )

}