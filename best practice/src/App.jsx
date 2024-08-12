import Accordion from "./components/Accordion/Accordion";
function App() {
    return (
        <main>
            <section>
                <h2>Why</h2>
                <Accordion className="accoedioon">
                    <Accordion.Item>
                        <Accordion.Title id="get">
                            Why did the chicken cross the road?
                        </Accordion.Title>
                        <Accordion.Content id="get">
                            <p>To get to the other side!</p>
                        </Accordion.Content>
                    </Accordion.Item>
                    <Accordion.Item>
                        <Accordion.Title id="talk">
                            Why did the chicken go to the seance?
                        </Accordion.Title>
                        <Accordion.Content id="talk">
                            <p>To talk to the other side!</p>
                        </Accordion.Content>
                    </Accordion.Item>
                </Accordion>
            </section>
        </main>
    );
}

export default App;
