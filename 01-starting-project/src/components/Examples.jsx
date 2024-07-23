import { useState } from "react";
import { EXAMPLES } from "../data";
import TabButton from "./TabButton";
import Section from "./Section";
import Tabs from "./Tabs";

export default function Examples() {
    const [selected, setSelected] = useState("");
    const handleSelect = (selectedBtn) => {
        setSelected(selectedBtn);
    };
    let tabContent = <p>Please select a topic</p>;
    if (selected) {
        tabContent = (
            <div id="tab-content">
                <h3>{EXAMPLES[selected].title}</h3>
                <p>{EXAMPLES[selected].description}</p>
                <pre>
                    <code>{EXAMPLES[selected].code}</code>
                </pre>
            </div>
        );
    }
    return (
        <Section id="examples" title="Examples">
            <Tabs
                buttons={
                    <>
                        <TabButton
                            isSelected={selected === "components"}
                            onClick={() => handleSelect("components")}
                        >
                            components
                        </TabButton>
                        <TabButton
                            isSelected={selected === "jsx"}
                            onClick={() => handleSelect("jsx")}
                        >
                            JSX
                        </TabButton>
                        <TabButton
                            isSelected={selected === "props"}
                            onClick={() => handleSelect("props")}
                        >
                            props
                        </TabButton>
                        <TabButton
                            isSelected={selected === "state"}
                            onClick={() => handleSelect("state")}
                        >
                            state
                        </TabButton>
                    </>
                }
            >
                {tabContent}
            </Tabs>
        </Section>
    );
}
