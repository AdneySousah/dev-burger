import { Outlet, Navigate } from "react-router-dom";
import { SideNavAdmin } from "../../components";
import { Container,ContainerAdmin } from "./styles";

export function AdminLayout() {

    const { admin: isAdmin } = JSON.parse(localStorage.getItem('devburger:UserData'))



    return isAdmin ?
        <Container>
            <ContainerAdmin>
            <SideNavAdmin />
            <main>
                <section>
                     <Outlet />
                </section>
            </main>
           
            </ContainerAdmin>
        </Container>
        : <Navigate to="/login" />

}