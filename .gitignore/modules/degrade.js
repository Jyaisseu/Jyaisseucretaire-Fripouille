module.exports.run = async (client, interaction, economie, perdant) => {
    debutant = interaction.guild.roles.cache.find(role => role.name === 'Débutant');
    actif = interaction.guild.roles.cache.find(role => role.name === 'Actif');
    hyperactif = interaction.guild.roles.cache.find(role => role.name === 'Hyperactif');
    hermite = interaction.guild.roles.cache.find(role => role.name === 'Hermite');
    empereur = interaction.guild.roles.cache.find(role => role.name === 'Empereur');
    dieu = interaction.guild.roles.cache.find(role => role.name === 'Dieu');

    if(economie.level < 2) {
        perdant.roles.remove(debutant, actif, hyperactif, hermite, empereur, dieu);
        client.channels.cache.find(channel => channel.name === '💬général').send(`${perdant} a perdu tous ses grades !`);
    }else if((economie.level >= 2) && (economie.level < 10) && (!perdant.roles.cache.some(role => role.name === 'debutant'))) {
        perdant.roles.remove(actif);
        perdant.roles.remove(hyperactif);
        perdant.roles.remove(hermite);
        perdant.roles.remove(empereur);
        perdant.roles.remove(dieu);
        perdant.roles.add(debutant);
        client.channels.cache.find(channel => channel.name === '💬général').send(`${perdant} redescend au grade ${débutant} !`);
    }else if((economie.level >= 10) && (economie.level < 20) && (!perdant.roles.cache.some(role => role.name === 'Actif'))) {
        perdant.roles.remove(hyperactif);
        perdant.roles.remove(hermite);
        perdant.roles.remove(empereur);
        perdant.roles.remove(dieu);
        perdant.roles.add(actif);
        client.channels.cache.find(channel => channel.name === '💬général').send(`${perdant} redescend au grade ${actif} !`);
    }else if((economie.level >= 20) && (economie.level < 50) && (!perdant.roles.cache.some(role => role.name === 'Hyperactif'))) {
        perdant.roles.remove(hermite);
        perdant.roles.remove(empereur);
        perdant.roles.remove(dieu);
        perdant.roles.add(hyperactif);
        client.channels.cache.find(channel => channel.name === '💬général').send(`${perdant} redescend au grade ${hyperactif} !`);
    }else if((economie.level >= 50) && (economie.level < 80) && (!perdant.roles.cache.some(role => role.name === 'hermite'))) {
        perdant.roles.remove(empereur);
        perdant.roles.remove(dieu);
        perdant.roles.add(hermite);
        client.channels.cache.find(channel => channel.name === '💬général').send(`${perdant} redescend au grade ${hermite} !`);
    }else if((economie.level >= 80) && (economie.level < 100) && (!perdant.roles.cache.some(role => role.name === 'empereur'))) {
        perdant.roles.remove(dieu);
        perdant.roles.add(empereur);
        client.channels.cache.find(channel => channel.name === '💬général').send(`${perdant} redescend au grade ${empereur} !`);
    }
};

module.exports.help = {
    name: 'degrade'
};
