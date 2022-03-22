import { Project } from "slack-cloud-sdk/mod.ts";
import { NewProjectShortcut } from "./triggers/new_project_shortcut.ts";

Project({
  name: "Project Organizer",
  description: "A demo showing how to create a channel from a message trigger",
  icon: "assets/icon.png",
  runtime: "deno1.x",
  botScopes: ["commands", "chat:write", "chat:write.public"],
  triggers: [NewProjectShortcut],
  tables: [],
  outgoingDomains: [],
});
