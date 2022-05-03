import React, { useState } from "react";
import { Container } from "./style";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

export default function DropDown({ title, items, selected, setSelected }: any) {
    const [open, setOpen] = useState(false);

    function handleSelection(e: any) {
        setSelected(e.target.outerText);
    }

    return (
        <Container>
            <div
                tabIndex={0}
                className="dd-header"
                role="button"
                onClick={() => setOpen(!open)}
            >
                <p>{selected === '' ? title : selected}</p>
                {open ?
                    <TiArrowSortedUp className="arrow" />
                    :
                    <TiArrowSortedDown className="arrow" />
                }
            </div>
            {open &&
                <ul className="dd-list">
                    {items?.map((item: any) => {
                        return (
                            <li key={item}>
                                <button type="button" onClick={e => {
                                    handleSelection(e);
                                    setOpen(false);
                                }}>
                                    <span>{item}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            }
        </Container>
    );
}