import { DefineTrigger, TriggerTypes } from "slack-cloud-sdk/mod.ts";
import { NewProjWorkflow } from "../workflows/project_wf.ts";

export const NewProjectShortcut = DefineTrigger("new_project_shortcut", {
  type: TriggerTypes.MessageShortcut,
  name: "New Project channel",
  description: "Create a new channel for your project",
})
  .runs(NewProjWorkflow)
  .withInputs((ctx) => ({
    purpose: ctx.data.message.text,
  }));
