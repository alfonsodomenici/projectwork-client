import {isTokenValid} from "./jwt.js";

window.location.href = isTokenValid() ? "posts.html" : "login.html";
