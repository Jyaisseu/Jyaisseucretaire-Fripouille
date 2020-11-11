const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {
    if(!message.member.voice.channel)
        return message.channel.send("Connectez-vous au salon vocal Musique !");
    if(message.guild.me.voice.channel)
        return message.channel.send("Le bot est déjà en train de jouer une musique !");
    if(!args[0])
        return message.channel.send("Vous n'avez pas précisé de lien YouTube !");

    const validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("L'URL Youtube n'est pas valide !");

    const info = await ytdl.getInfo(args[0]);
    const connection = await message.member.voice.channel.join();
    const dispatcher = await connection.play(
        ytdl(args[0], { filter: 'audioonly'})
    );
    message.channel.send(`Musique jouée: ${info.videoDetails.title}.`);
};

module.exports.help = {
    name: "play"
}
