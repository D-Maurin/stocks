import { ReactNode } from "react"
import styled from "styled-components"

const HeaderContainer = styled.div`
    background-color: var(--light);
    position: sticky;
    top: 0;
    z-index: 1000;
`

const HeaderTitle = styled.div`
    font-size: 2em;
    font-weight: 500;
    color: var(--primary);
`

const HeaderWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 1.4rem 1rem 0.8rem 1rem;
    align-items: center;
`

const Line = styled.div`
    margin: 0 1rem;
    border-bottom: solid var(--secondary) 1px;
`

const Buttons = styled.div`
    display: flex;
    gap: 8px;
    align-items: center;
`

const Header = ({ title, buttons }: { title: string; buttons: ReactNode }) => {
    return (
        <HeaderContainer>
            <HeaderWrapper>
                <HeaderTitle>{title}</HeaderTitle>
                <Buttons>{buttons}</Buttons>
            </HeaderWrapper>
            <Line />
        </HeaderContainer>
    )
}

export default Header
