import { Command, DiscommandHandler } from 'discommand'
import { CacheType, ChatInputCommandInteraction } from 'discord.js'

export default class BanCommands extends Command {
  public constructor() {
    super()
    this.name = 'ban'
  }
  execute(
    interaction: ChatInputCommandInteraction<CacheType>,
    cmd: DiscommandHandler
  ): void {
    //@ts-ignore
    interaction.reply('a')
  }
}
