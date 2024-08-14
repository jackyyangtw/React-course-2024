import { createContext } from "react";
import { useContext } from "react";
const AccordionItemContext = createContext();
export const useAccordionItemContext = () => {
    const ctx = useContext(AccordionItemContext);
    if (!ctx) {
        throw new Error(
            "AccordionItem should be used inside Accordion component"
        );
    }
    return ctx;
};

export default function AccordionItem({ id, children }) {
    return (
        <AccordionItemContext.Provider value={id}>
            <li className="accordion-item">{children}</li>
        </AccordionItemContext.Provider>
    );
}
