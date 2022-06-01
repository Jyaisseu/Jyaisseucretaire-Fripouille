const {
    joinVoiceChannel,
} = require('@discordjs/voice');

module.exports.run = async(Client, interaction) => {
    if(!interaction.member.voice.channel) return interaction.reply('Connectez vous à un salon vocal !');
    if(!interaction.guild.me.voice.channel) return interaction.reply('Le bot ne joue actuellement pas de musique !');
    if(interaction.guild.me.voice.channel.id !== interaction.member.voice.channel.id) return interaction.reply('Vous devez être connecté dans le même salon vocal que le bot !');

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
