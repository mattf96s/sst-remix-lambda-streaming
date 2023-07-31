import { StackContext, Api, RemixSite } from "sst/constructs";

export function API({ stack }: StackContext) {
  const site = new RemixSite(stack, "Site", {
    path: "packages/my-remix-app/",
    runtime: "nodejs18.x",
    nodejs: {
      format: "esm",
    },
    edge: false,
    timeout: 30,
    memorySize: 512,
    waitForInvalidation: stack.stage === "prod",
    dev: {
      deploy: true,
    },
    environment: {
      NODE_ENV: process.env.NODE_ENV || "development",
    },
  });

  stack.addOutputs({
    URL: site.url || "localhost",
  });
}
