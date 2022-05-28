const {
    joinVoiceChannel,
} = require('@discordjs/voice');

module.exports.run = async(Client, message) => {
    if(!message.member.voice.channel) return message.channel.send('Connectez vous à un salon vocal !');
    if(!message.guild.me.voice.channel) return message.channel.send('Le bot ne joue actuellement pas de musique !');
    if(message.guild.me.voice.channel.id !== message.member.voice.channel.id) return message.channel.send('Vous devez être connecté dans le même salon vocal que le bot !');

    const connexion = joinVoiceChannel({
        channelId: message.member.voice.channel.id, 
        guildId: message.guild.id,
        adapterCreator: message.guild.voiceAdapterCreator
    });
    connexion.destroy();
    message.channel.send('La musique a correctement été arrêtée !');
};

module.exports.help = {
    name: 'stop'
};
