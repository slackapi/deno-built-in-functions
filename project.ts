import { Project } from "slack-cloud-sdk/mod.ts";
import { NewProjWorkflow } from "./workflows/project_wf.ts";
import { NewProjectShortcut } from "./triggers/new_channel_shortcut.ts";

Project({
  name: "Project Organizer",
  description: "A demo showing how to create a channel from a message trigger",
  icon: "assets/icon.png",
  runtime: "deno1.x",
  botScopes: ["commands", "chat:write", "chat:write.public"],
  functions: [],
  workflows: [NewProjWorkflow],
  triggers: [NewProjectShortcut],
  tables: [],
  outgoingDomains: [],
});
