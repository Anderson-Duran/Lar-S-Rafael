import { Router } from "express";
import UserCTRL from "../Control/UserCTRL.js";
import { authorization } from "../Authentication/auth.js";

// Creating an Express Router
const routerLogin = Router();

// Creating an instance of UserCTRL for handling user-related operations
const userCTRL = new UserCTRL();

// Defining routes with corresponding controller methods
routerLogin
    .post('/login', userCTRL.login)  // Route for user login
    .post('/signup', userCTRL.signUp)  // Route for user signup
    .get('/', authorization, userCTRL.queryUsers)  // Protected route for querying users (requires authorization)
    .delete('/exclude', authorization, userCTRL.deleteUser);  // Protected route for deleting a user (requires authorization)

// Exporting the router for use in other parts of the application
export default routerLogin;
