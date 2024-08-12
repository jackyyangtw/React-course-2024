import { createContext, useState, useContext } from "react";
import AccordionItem from "./AccordionItem";
import AccordionTitle from "./AccordionTitle";
import AccordionContent from "./AccordionContent";

const AccordionContext = createContext();
export const useAccordionContext = () => {
    const ctx = useContext(AccordionContext);
    if (!ctx) {
        throw new Error(
            "AccordionItem should be used inside Accordion component"
        );
    }
    return ctx;
};

export default function Accordion({ children, ...props }) {
    const [openItemId, setOpenItemId] = useState(null);
    const toggleItem = (id) => {
        setOpenItemId((prevId) => (prevId === id ? null : id));
    };
    const contextValue = {
        openItemId,
        toggleItem,
    };
    return (
        <AccordionContext.Provider value={contextValue}>
            <ul {...props}>{children}</ul>
        </AccordionContext.Provider>
    );
}

Accordion.Item = AccordionItem;
Accordion.Title = AccordionTitle;
Accordion.Content = AccordionContent;
