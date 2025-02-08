import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import ProductList from "./pages/ProductList";

const Layout = () => {
  const location = useLocation();
  const showNavbar = location.pathname !== "/"; // Navbar nie będzie widoczny na Home

  return (
    <>
      {showNavbar && <Navbar />}
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/catalog" component={ProductList} />
      </Switch>
    </>
  );
};

const App = () => {
  return (
    <Router>
      <Layout />
    </Router>
  );
};

export default App;
