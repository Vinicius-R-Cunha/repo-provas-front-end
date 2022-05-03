import { useContext, useState } from "react";
import SearchContext from "../../contexts/SearchContext";
import { Tabs } from "../../pages/HomePage";
import { Container } from "./style";

interface NavMenuProps {
    selectedTab: Tabs;
    setSelectedTab: React.Dispatch<React.SetStateAction<"disciplinas" | "instrutores" | "adicionar">>;
}

export default function NavMenu({ selectedTab, setSelectedTab }: NavMenuProps) {

    const { setSearchInput } = useContext(SearchContext);

    return (
        <Container>
            <button
                className={selectedTab === 'disciplinas' ? 'selected' : ''}
                onClick={() => {
                    setSelectedTab('disciplinas');
                    setSearchInput('');
                }}
            >
                disciplinas
            </button>
            <button
                className={selectedTab === 'instrutores' ? 'selected' : ''}
                onClick={() => {
                    setSelectedTab('instrutores');
                    setSearchInput('');
                }}
            >
                pessoa instrutora
            </button>
            <button
                className={selectedTab === 'adicionar' ? 'selected' : ''}
                onClick={() => {
                    setSelectedTab('adicionar');
                    setSearchInput('');
                }}
            >
                adicionar
            </button>
        </Container>
    )
}