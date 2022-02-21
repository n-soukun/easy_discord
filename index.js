const { Client } = require('discord.js')
const dotenv = require('dotenv')

//.envファイルの読み込み
dotenv.config()

const client = new Client({
    intents: ["GUILDS", "GUILD_MESSAGES"],
})

//プレフィックス
const prefix = "!"

//ボットの準備が完了すると実行
client.once("ready", client => {
    console.log(`${client.user.username} is ready!`)
})

//メッセージが作成されると実行
client.on("messageCreate", message => {

    //コマンドでない場合は終了
    if(!message.content.startsWith(prefix)) return

    //メッセージを解析
    const content = message.content.slice(prefix.length)
    const args = content.split(' ')
    const word = args.shift()

    //指定されたコマンドを実行
    switch (word) {

        case "calc":
            const formula = args[0]
            //参考：https://wordpress.ideacompo.com/?p=14876
            const check = formula.match(/[^\d\+\-\*\/~\(\)\{\}\.]/g)
            if (check === null) {
                const anser = Function(`return (${formula})`)()
                message.channel.send(`答え: ${anser}`)
            } else {
                message.channel.send("❌数式が不正です")
            }
            break
        
        case "good":
            message.react("👍")
            break

        case "ping":
            const ping = client.ws.ping
            message.channel.send(`ping: ${ping}ms`)
            break
    
        default:
            message.channel.send("❌このコマンドは存在しません")
            break
    }
})

//ログイン
client.login(process.env.DISCORD_TOKEN)