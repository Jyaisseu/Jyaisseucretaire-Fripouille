const {
    joinVoiceChannel,
} = require('@discordjs/voice');

module.exports.run = async(client, interaction) => {
    if(!interaction.member.voice.channel) return interaction.reply('Connectez vous à un salon vocal !');
    const connexion = joinVoiceChannel({
        channelId: interaction.member.voice.channel.id, 
        guildId: interaction.guild.id,
        adapterCreator: interaction.guild.voiceAdapterCreator
    });
    connexion.destroy();
    interaction.reply('La musique a correctement été arrêtée !');
};

module.exports.help = {
    name: 'stop'
};
