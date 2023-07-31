import { StackContext, Api, RemixSite } from "sst/constructs";
import { Fn } from "aws-cdk-lib";
import * as origins from "aws-cdk-lib/aws-cloudfront-origins";

export function API({ stack }: StackContext) {
  const api = new Api(stack, "Api");

  const site = new RemixSite(stack, "Site", {
    path: "packages/my-remix-app/",
    runtime: "nodejs18.x",
    edge: false,
    timeout: 30,
    waitForInvalidation: stack.stage === "prod",
    dev: {
      deploy: true,
    },
    cdk: {
      distribution: {
        defaultBehavior: {
          origin: new origins.HttpOrigin(Fn.parseDomainName(api.url)),
        },
      },
    },
  });

  api.addRoutes(stack, {
    "ANY /{proxy+}": {
      type: "function",
      cdk: {
        function: site.cdk?.function,
      },
    },
  });

  stack.addOutputs({
    ApiEndpoint: api.url,
    URL: site.url || "localhost",
  });
}
