import { DefineWorkflow, Schema } from "slack-cloud-sdk/mod.ts";

export const NewProjWorkflow = DefineWorkflow("new_channel", {
  title: "Create new project",
  description: "Create a new project channel from a message.",
  input_parameters: {
    projtitle: {
      type: Schema.types.string,
      description: "New channel name. All lowercase, no spaces.",
    },
    purpose: {
      type: Schema.types.string,
      description: "Write a short description about your project",
    },
    user: {
      type: Schema.slack.types.user_id,
      description: "Invite yourself or another user to the project channel",
    },
  },
});

const createChannelStep = NewProjWorkflow.addStep(
  Schema.slack.functions.CreateChannel,
  {
    channel_name: NewProjWorkflow.inputs.projtitle,
    is_private: false,
  },
);
const updateTopicStep = NewProjWorkflow.addStep(
  Schema.slack.functions.UpdateChannelTopic,
  {
    channel_id: createChannelStep.outputs.channel_id,
    topic: NewProjWorkflow.inputs.purpose,
  },
);
const inviteUserStep = NewProjWorkflow.addStep(
  Schema.slack.functions.InviteUserToChannel,
  {
    channel_id: createChannelStep.outputs.channel_id,
    user_id: NewProjWorkflow.inputs.user,
  },
);
NewProjWorkflow.addStep(Schema.slack.functions.SendMessage, {
  channel_id: createChannelStep.outputs.channel_id,
  message:
    `Welcome <@${inviteUserStep.outputs.user_id}> :tada:\n You've started a new project: *#${NewProjWorkflow.inputs.projtitle}*. The topic of this channel is: *${updateTopicStep.outputs.topic}*`,
});
