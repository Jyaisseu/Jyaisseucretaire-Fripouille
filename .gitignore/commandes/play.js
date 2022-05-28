const ytdl = require('ytdl-core');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');

module.exports.run = async (Client, message, args) => {
    if(!message.member.voice.channel) return message.channel.send('Connectez-vous à un salon vocal !');
    if(message.guild.me.voice.channel) return message.channel.send('Le bot est déjà en train de jouer une musique !');
    if(!args[0]) return message.channel.send("Vous n'avez pas précisé de lien YouTube !");

    const validate = await ytdl.validateURL(args[0]);
    if(!validate) return message.channel.send("L'URL YouTube n'est pas valide !");

    const info = await ytdl.getInfo(args[0]);
    const connexion = joinVoiceChannel({
        channelId: message.member.voice.channel.id,
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    });

    const stream = ytdl(args[0], {
        filter: 'audioonly'
    });
    const player = createAudioPlayer();
    const ressource = createAudioResource(stream);

    player.play(ressource);
    connexion.subscribe(player);

    message.channel.send(`Musique jouée : ${info.videoDetails.title}.`);
};

module.exports.help = {
    name: 'play'
};
