import Header from "./components/Header.jsx";
// import Login from "./components/Login.jsx";
// import Signup from "./components/Signup.jsx";
import StateLogin from "./components/StateLogin.jsx";

function App() {
    return (
        <>
            <Header />
            <main>
                {/* <Signup /> */}
                <StateLogin></StateLogin>
                {/* <Login /> */}
            </main>
        </>
    );
}

export default App;
