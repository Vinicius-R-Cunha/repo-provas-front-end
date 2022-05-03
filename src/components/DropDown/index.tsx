import { useState } from "react";
import { Container } from "./style";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";

export default function DropDown({ title, items, selected, setSelected, disabled }: any) {
    const [open, setOpen] = useState(false);

    function handleSelection(e: any) {
        setSelected(e.target.outerText);
    }

    return (
        <Container>
            <div
                tabIndex={0}
                className={`dd-header ${disabled ? 'disabled' : ''}`}
                role="button"
                onClick={() => items.length > 0 && setOpen(!open)}
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
                            <li key={item.id}>
                                <button type="button" onClick={e => {
                                    if (!disabled) {
                                        handleSelection(e);
                                        setOpen(false);
                                    }
                                }}>
                                    <span>{item.name}</span>
                                </button>
                            </li>
                        )
                    })}
                </ul>
            }
        </Container>
    );
}