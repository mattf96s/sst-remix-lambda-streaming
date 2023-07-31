import { SSTConfig } from "sst";
import { API } from "./stacks/MyStack";

export default {
  config(_input) {
    return {
      stage: "matt",
      name: "remix-streaming",
      region: "eu-west-1",
      profile: "predictive_insights",
    };
  },
  stacks(app) {
    app.stack(API);
    app.setDefaultRemovalPolicy("destroy"); // change to retain for production environment
    app.setDefaultFunctionProps({
      runtime: "nodejs18.x",
    });
  },
} satisfies SSTConfig;
