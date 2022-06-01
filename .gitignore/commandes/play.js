const ytdl = require('ytdl-core');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');

module.exports.run = async (Client, interaction) => {
    if(!interaction.member.voice.channel) return interaction.reply('Connectez-vous à un salon vocal !');
    if(interaction.guild.me.voice.channel) return interaction.reply('Le bot est déjà en train de jouer une musique !');

    const validate = await ytdl.validateURL(interaction.options.getString('lien'));
    if(!validate) return interaction.reply("L'URL YouTube n'est pas valide !");

    const info = await ytdl.getInfo(interaction.options.getString('lien'));
    const connexion = joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator
    });

    const stream = ytdl(interaction.options.getString('lien'), {
        filter: 'audioonly'
    });
    const player = createAudioPlayer();
    const ressource = createAudioResource(stream);

    player.play(ressource);
    connexion.subscribe(player);

    interaction.reply(`Musique jouée : ${info.videoDetails.title}.`);
};

module.exports.help = {
    name: 'play'
};
