import AccountCircleIcon from "@mui/icons-material/AccountCircle"
import BallotIcon from "@mui/icons-material/Ballot"
import CloseIcon from "@mui/icons-material/Close"
import DashboardIcon from "@mui/icons-material/Dashboard"
import DesignServicesIcon from "@mui/icons-material/DesignServices"
import MedicalServicesIcon from "@mui/icons-material/MedicalServices"
import MenuIcon from "@mui/icons-material/Menu"
import { Backdrop, Paper, Tooltip } from "@mui/material"
import React, { ReactNode, useState } from "react"
import { Provider } from "react-redux"
import { Route, Routes, useLocation, useNavigate } from "react-router-dom"
import styled, { css } from "styled-components"
import ItemsTable from "./components/ItemsTable"
import ModelsTable from "./components/ModelsTable"
import {
    store,
    useLoadItemCategories,
    useLoadItems,
    useLoadModels,
} from "./store"
import GlobalStyle from "./style/GlobalStyle"

const Drawer = styled(Paper)`
    position: fixed;
    top: 1rem;

    left: 1rem;
    bottom: 1rem;
    transition: width 0.2s;

    z-index: 1200;
    overflow: hidden;
    border-radius: 1rem !important;
`

const DrawerContent = styled.div`
    height: 100%;
    background-color: var(--secondary);
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: space-between;
`

const Main = styled.div`
    padding: 0 0 0 98px;
    height: 100%;
    overflow: auto;
`

const MyList = styled.div`
    display: flex;
    flex-direction: column;
    overflow: auto;
    scrollbar-width: thin;
    min-height: 0;
    padding: 8px;
    gap: 4px;
`

const MyListItem = styled.div<{ open: boolean; current: boolean }>`
    --icon-width: 50px;
    --text-width: 300px;
    display: flex;
    align-items: center;

    ${({ current }) =>
        current
            ? css`
                  background-color: var(--primary);
                  color: var(--light);
              `
            : css`
                  background-color: transparent;
                  color: var(--primary);
                  :hover {
                      background-color: #ffffff33;
                  }
              `}

    border-radius: 8px;
    cursor: pointer;
    transition: max-width 0.2s, background-color 0.4s, color 0.4s;
    max-width: ${({ open }) =>
        open
            ? "calc(var(--icon-width) + var(--text-width))"
            : "var(--icon-width)"};
    overflow: hidden;
`

const MyListItemIcon = styled.div`
    min-width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const MyListItemText = styled.div`
    min-width: var(--text-width);
    font-size: 1.1em;
    font-weight: 500;
    padding: 4px 8px 4px 4px;
`

const OpenMenu = styled.div`
    display: flex;
    padding: 16px 20px;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;

    transition: background-color 0.2s;
    background-color: transparent;
    :hover {
        background-color: #ffffff33;
    }
`

const DataLoaderWrapper = ({ children }: { children: ReactNode }) => {
    const itemsReady = useLoadItems()
    const categoriesReady = useLoadItemCategories()
    const modelsReady = useLoadModels()

    if (itemsReady && categoriesReady && modelsReady) return <>{children}</>

    return <>loading</>
}

function App() {
    const menus = [
        {
            name: "Tableau de bord",
            icon: DashboardIcon,
            url: "/",
        },
        {
            name: "Matériel",
            icon: MedicalServicesIcon,
            url: "/matos",
        },
        {
            name: "Modèles",
            icon: DesignServicesIcon,
            url: "/models",
        },
        {
            name: "Articles",
            icon: BallotIcon,
            url: "/items",
        },
    ]

    const [open, setOpen] = useState(false)

    const navigate = useNavigate()
    const location = useLocation()

    return (
        <Provider store={store}>
            <GlobalStyle />
            <Drawer>
                <DrawerContent>
                    <OpenMenu onClick={() => setOpen(!open)}>
                        {open ? (
                            <CloseIcon htmlColor="var(--primary)" />
                        ) : (
                            <MenuIcon htmlColor="var(--primary)" />
                        )}
                    </OpenMenu>
                    <MyList>
                        {menus.map((m) => {
                            const current =
                                location.pathname === m.url ||
                                location.pathname.startsWith(m.url + "/")
                            const Icon = m.icon
                            return (
                                <MyListItem
                                    open={open}
                                    onClick={() => {
                                        navigate(m.url)
                                        setOpen(false)
                                    }}
                                    current={current}
                                >
                                    <Tooltip title={m.name} placement="right">
                                        <MyListItemIcon>
                                            <Icon />
                                        </MyListItemIcon>
                                    </Tooltip>
                                    <MyListItemText>{m.name}</MyListItemText>
                                </MyListItem>
                            )
                        })}
                    </MyList>
                    <div>
                        <AccountCircleIcon />
                    </div>
                </DrawerContent>
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: -1,
                    }}
                    open={open}
                    onClick={() => setOpen(false)}
                />
            </Drawer>

            <Main>
                <DataLoaderWrapper>
                    <Routes>
                        <Route path="/" element={null} />

                        <Route path="/items" element={<ItemsTable />} />
                        <Route path="/models" element={<ModelsTable />} />
                    </Routes>
                </DataLoaderWrapper>
            </Main>
        </Provider>
    )
}

export default App
