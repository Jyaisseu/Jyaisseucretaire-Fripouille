const Discord = require("discord.js");
const ytdl = require('ytdl-core');

module.exports.run = async (client, message) => {
    if(!message.member.voice.channel)
        return message.channel.send("Connectez-vous au salon vocal Musique !")
    if(!message.guild.me.voice.channel)
        return message.channel.send("Le bot ne joue pas de musiques actuellement !")
    if(message.guild.me.voice.channel.id !== message.member.voice.channel.id)
        return message.channel.send("Vous devez être connecté dans le même salon vocal que le bot !")
    message.guild.me.voice.channel.leave();
    message.channel.send("La musique a correctement été arrêtée !");
}

module.exports.help = {
    name: "stop"
}
