from {
     transform: rotate(0deg);

    }
    to {
        transform: rotate(360deg);
    }
}


@media (prefers-reduced-motion: no-preference) {
    a:nth-of-type(2) .logo {
        animation: logo-spin infinite 20s linear;
    }
}


.card {
    padding: 2em;
}


.read-the-docs {
    color: #888;
}
App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import AddProject from "./components/AddProject";
