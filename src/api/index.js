import Vue from "vue";
import speedsouls from "./speedsouls";
import { SnackbarProgrammatic as Snackbar } from "buefy";

function showError(error) {
  const snameback = Snackbar.open({
    indefinite: true,
    message: error.message,
    type: "is-danger",
    position: "is-bottom",
    actionText: "CLOSE",
    queue: false,
    onAction: () => {
      snameback.close();
    }
  });
}

function errorHandler(response) {
  if (!response.ok) showError(new Error("Something broke"));
  return response;
}

Vue.use(speedsouls, {
  errorHandler
});
