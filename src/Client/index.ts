import { Command, DiscommandClient, LoadType, ModuleType } from 'discommand'
import { GatewayIntentBits, Partials } from 'discord.js'
import path from 'path'
import Dokdo from 'dokdo'
import config from '../../config.json'
import { ClientLoger, LogLevel } from '../../modules/Loger'

declare module 'discord.js' {
  interface Client {
    dokdo: Dokdo
    clientLoger: ClientLoger
  }
}

export class MgStManagerClient extends DiscommandClient {
  public constructor() {
    super(
      {
        intents: [
          GatewayIntentBits.Guilds,
          GatewayIntentBits.GuildMessages,
          GatewayIntentBits.MessageContent,
          GatewayIntentBits.GuildMembers,
        ],
        partials: [Partials.Channel],
      },
      {
        directory: {
          commandFolderDirectory: path.join(__dirname, '..', 'Commands'),
        },
        loadType: LoadType.Folder,
      }
    )
  }

  public dokdo: Dokdo = new Dokdo(this, {
    prefix: 'abcd!',
    aliases: ['dokdo', 'dok', 'eval'],
    noPerm(message) {
      message.reply({ content: 'You not bot developer!' })
    },
  })

  public clientLoger: ClientLoger = new ClientLoger(this, {
    logLevel: LogLevel.development,
  })

  public start() {
    this.login(config.bot.token)
    this.loadAll()
    this.clientLoger.on()
    this.on('messageCreate', msg => {
      if (msg.author.bot) return
      this.dokdo.run(msg)
    })
  }

  public reloadAll() {
    const CommandName = this.CommandHandler.modules.map(a => {
      if (a instanceof Command) return a.name
      else return
    })
    for (const Command of CommandName) {
      this.CommandHandler.modules.delete(Command!)
    }
  }
}
