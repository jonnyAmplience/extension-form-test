import { writable } from "svelte/store";
import "./app.css";
import App from "./App.svelte";
import { init } from "dc-extensions-sdk";

export const sdk = writable();

const initialise = async () => {
  const SDK = await init();

  SDK.connection.originalRequest = SDK.connection.request;
  SDK.connection.request = async function (action, params, options) {
    if (action === "context-get") {
      return {
        category: "CONTENT_FIELD",
        params: {
          instance: {
            image: "/image",
          },
          installation: {},
        },
        locales: {},
        stagingEnvironment: "",
        visualisation: "",
        readOnly: false,
        hub: {},
        contentItemId: "1",
        fieldSchema: {
          type: "object",
          properties: {
            caption: {
              title: "Hero Alt Text",
              type: "string",
              minLength: 0,
              maxLength: 200,
              "ui:extension": {
                url: "https://ai-image-caption.extensions.content.amplience.net",
                params: {
                  image: "/image",
                },
              },
            },
          },
        },
      };
    }
    if (action == "field-model-get") {
      return {
        title: "Hero Alt Text",
        type: "string",
        minLength: 0,
        maxLength: 200,
        "ui:extension": {
          url: "https://ai-image-caption.extensions.content.amplience.net",
          params: {
            image: "/image",
          },
        },
      };
    }
    return this.originalRequest(action, params, options);
  };

  sdk.set(SDK);

  const app = new App({
    target: document.getElementById("app"),
  });
};

initialise();
