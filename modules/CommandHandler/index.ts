import {
  Client,
  Collection,
  ApplicationCommandOptionData,
  ApplicationCommandType,
  ChatInputCommandInteraction,
  PermissionResolvable,
} from 'discord.js'

export class SlashCommandHandler {
  client: Client
  public constructor(client: Client) {
    this.client = client
  }

  public module: Collection<string, SlashCommand> = new Collection()
}

export class SlashCommand {
  name: string = ''
  // @ts-ignore
  nameLocalizations?: { [Locale]: string }
  description: string = ''
  // @ts-ignore
  descriptionLocalizations?: { [Locale]: string }
  type?: ApplicationCommandType = ApplicationCommandType.ChatInput
  options?: ApplicationCommandOptionData[]
  defaultPermission?: PermissionResolvable
  execute(interaction: ChatInputCommandInteraction): void {}
}
