import { SSTConfig } from "sst";
import { SpiceJarPhotos } from "./stacks/spice-photos-stack";

export default {
  config(_input) {
    return {
      name: "kitchen-ai",
      region: "us-east-1",
    };
  },
  stacks(app) {
    app.stack(SpiceJarPhotos);
  }
} satisfies SSTConfig;
