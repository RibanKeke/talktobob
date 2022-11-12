import { preRenderRoutes } from "../../services/Navigation";
import { Navigation } from "../../services/Navigation/Navigation.interface";

const defaultNavigationState: Navigation = preRenderRoutes();

export { defaultNavigationState };
