import { Banner, Container, Content } from "./styles";

import { CategoryCarousel, OffersCarousel } from "../../components";



export function HomePage() {

    return (
        <main>

            <Banner>
                <h1>Seja bem vindo(a)!</h1>
            </Banner>

            <Container>
                <Content>

                    <CategoryCarousel />

                    <OffersCarousel />
                </Content>
            </Container>
        </main>
    )
}