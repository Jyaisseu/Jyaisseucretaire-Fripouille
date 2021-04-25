const Discord = require("discord.js");
const mongoose = require("mongoose");
const Eco = require("C:/Users/JOCELYN/Documents/Discord/Jyaisseucrétaire/jojo_la_fripouille/modules/economie");

module.exports.run = async (client, message) => {
    Eco.findOne({
        User_ID: message.author.id
    }, (err, economie) => {
        if(economie.pseudo === message.author.username) {
            return message.channel.send("Votre pseudo n'a pas besoin d'être mise à jour !");
        }else{
            economie.pseudo = message.author.username
            message.channel.send("Votre pseudo a bien été mise à jour !")
            economie.save()
        }})
}

module.exports.help = {
    name: "rename"
}