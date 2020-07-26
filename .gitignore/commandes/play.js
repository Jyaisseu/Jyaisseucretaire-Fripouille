const ytdl = require('ytdl-core');

module.exports.run = async (bot, message, args) => {
    if(!message.member.voiceChannel)
        return message.channel.send("Connectez-vous au salon vocal Musique !");
    if(message.guild.me.voiceChannel)
        return message.channel.send("Le bot est déjà en train de jouer une musique !");
    if(!args[0])
        return message.channel.send("Vous n'avez pas précisé de lien YouTube !");

    const validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("L'URL n'est pas valide !");

    const info = await ytdl.getInfo(args[0]);
    const connection = await message.member.voiceChannel.join();
    const dispatcher = await connection.playStream(
        ytdl(args[0], { filter: 'audioonly'})
    );
    message.channel.send(`Musique jouée: ${info.videoDetails.title}.`);
};

module.exports.help = {
    name: "play"
}
