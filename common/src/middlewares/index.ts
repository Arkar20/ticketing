import { errorHandler } from "./error-handler";
import { validationHandler } from "./validation-handler";
import { currentUser } from "./currentUser";
import { requireAuth } from "./requireAuth";

const auth = [currentUser, requireAuth];

export { errorHandler, validationHandler, currentUser, requireAuth, auth };
