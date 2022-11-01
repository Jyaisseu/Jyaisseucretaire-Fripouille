const ytdl = require('ytdl-core');
const {
    joinVoiceChannel,
    createAudioPlayer,
    createAudioResource
} = require('@discordjs/voice');

module.exports.run = async (client, interaction) => {
    if(!interaction.member.voice.channel) return interaction.reply('Connectez-vous à un salon vocal !');
    
    const validate = await ytdl.validateURL(interaction.options.getString('lien'));
    if(!validate) return interaction.reply("L'URL YouTube n'est pas valide !");
    interaction.reply('Recherche de la musique en cours...');

    const info = await ytdl.getInfo(interaction.options.getString('lien'));
    interaction.editReply(`Musique jouée : ${info.videoDetails.title}.`);

    const connexion = joinVoiceChannel({
        channelId: interaction.member.voice.channel.id,
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator
    });

    const stream = ytdl(interaction.options.getString('lien'), {
        filter: 'audioonly',
        quality: 'highestaudio',
        highWaterMark: 1 << 25
    });
    const player = createAudioPlayer();
    const ressource = createAudioResource(stream);

    player.play(ressource);
    connexion.subscribe(player);
};

module.exports.help = {
    name: 'play'
};
