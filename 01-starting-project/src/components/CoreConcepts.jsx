import { CORE_CONCEPTS } from "../data";
import CoreConcept from "./CoreConcept";
import Section from "./Section";
export default function CoreConcepts() {
    return (
        <Section id="core-concepts" title="Core Concepts">
            {/* <ul>
            {CORE_CONCEPTS.map(({ title, image, description }) => (
                <CoreConcept
                    key={title}
                    image={image}
                    title={title}
                    description={description}
                />
            ))}
        </ul> */}
            <ul>
                {CORE_CONCEPTS.map((item) => (
                    <CoreConcept key={item.title} {...item} />
                ))}
            </ul>
        </Section>
    );
}
