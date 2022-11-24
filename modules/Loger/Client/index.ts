import { Client } from 'discord.js'
import config from '../../../config.json'

export enum LogLevel {
  production = 0,
  development = 1,
}

export class ClientLoger {
  options: { logLevel: LogLevel }
  client: Client
  public constructor(client: Client, options: { logLevel: LogLevel }) {
    this.options = options
    this.client = client
  }

  public on() {
    this.client.once('ready', () => {
      console.log(
        `[\x1b[32m${new Date().toISOString()}\x1b[37m] Bot name: \x1b[34m${
          this.client.user!.username
        }\x1b[37m`
      )
    })
    if (this.options.logLevel === LogLevel.development) {
      this.client.on('debug', content => {
        console.log(`[\x1b[32m${new Date().toISOString()}\x1b[37m] ${content}`)
      })
    }

    process.on('uncaughtException', err => {
      if (err) {
        const errorLogChannel = this.client.channels.cache.get(config.log.error)
        if (!errorLogChannel?.isTextBased()) return
        console.log(`[\x1b[32m${new Date().toISOString()}\x1b[37m] ${err}`)
        errorLogChannel.send({
          embeds: [
            {
              title: ':x: error',
              description: `\`\`\`${err}\`\`\``,
              timestamp: `${new Date().toISOString()}`,
              color: 0xff0000,
            },
          ],
        })
      }
    })
  }
}
