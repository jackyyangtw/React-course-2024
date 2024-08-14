import Accordion from "./components/Accordion/Accordion";
import SearchableList from "./components/SearchableList/SearchableList";
import Place from "./Place";
import savannaImg from "./assets/african-savanna.jpg";
import amazonImg from "./assets/amazon-river.jpg";
import caribbeanImg from "./assets/caribbean-beach.jpg";
import desertImg from "./assets/desert-dunes.jpg";
import forestImg from "./assets/forest-waterfall.jpg";

const PLACES = [
    {
        id: "african-savanna",
        image: savannaImg,
        title: "African Savanna",
        description: "Experience the beauty of nature.",
    },
    {
        id: "amazon-river",
        image: amazonImg,
        title: "Amazon River",
        description: "Get to know the largest river in the world.",
    },
    {
        id: "caribbean-beach",
        image: caribbeanImg,
        title: "Caribbean Beach",
        description: "Enjoy the sun and the beach.",
    },
    {
        id: "desert-dunes",
        image: desertImg,
        title: "Desert Dunes",
        description: "Discover the desert life.",
    },
    {
        id: "forest-waterfall",
        image: forestImg,
        title: "Forest Waterfall",
        description: "Listen to the sound of the water.",
    },
];
function App() {
    return (
        <main>
            <section>
                <h2>Why</h2>
                <Accordion className="accordioon">
                    <Accordion.Item id="get">
                        <Accordion.Title>
                            Why did the chicken cross the road?
                        </Accordion.Title>
                        <Accordion.Content>
                            <p>To get to the other side!</p>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item id="talk">
                        <Accordion.Title>
                            Why did the chicken go to the seance?
                        </Accordion.Title>
                        <Accordion.Content>
                            <p>To talk to the other side!</p>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </section>
            <section>
                <SearchableList items={PLACES} itemKeyFn={(item) => item.id}>
                    {(place) => <Place item={place} />}
                </SearchableList>
                <SearchableList
                    items={["item1", "item2"]}
                    itemKeyFn={(item) => item}
                >
                    {(item) => <div>{item}</div>}
                </SearchableList>
            </section>
        </main>
    );
}

export default App;
