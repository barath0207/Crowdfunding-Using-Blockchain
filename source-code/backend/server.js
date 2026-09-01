function App() {
    return (
        <Router>
         <Routes>

          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/add-project" element={<AddProject />} />
          <Route path="/view-projects" element={<ViewProject />} />
          <Route path="/home" element={<Home />} />
          <Route path="/" element={<Login />} />
          <Route path="/about" element={<About/>}/>
          <Route path="/contact" element={<Contact/>}/>
         </Routes>
     </Router>
    );
}


export default App;




BACKEND SOURCE CODE:

const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const cors = require("cors");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");


dotenv.config();
