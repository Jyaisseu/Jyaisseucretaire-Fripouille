module.exports.run = async (client, interaction, economie, acquerreur) => {
    const member = acquerreur
    const debutant = interaction.guild.roles.cache.find(role => role.name === 'Débutant');
    const actif = interaction.guild.roles.cache.find(role => role.name === 'Actif');
    const hyperactif = interaction.guild.roles.cache.find(role => role.name === 'Hyperactif');
    const hermite = interaction.guild.roles.cache.find(role => role.name === 'Hermite');
    const empereur = interaction.guild.roles.cache.find(role => role.name === 'Empereur');
    const dieu = interaction.guild.roles.cache.find(role => role.name === 'Dieu');

    if(economie.level === 2){
        member.roles.add(debutant);
        client.channels.cache.find(channel => channel.name === '💬général').send(`Félicitations à ${acquerreur} pour avoir obtenu le grade ${debutant} ! Bienvenue dans le club !`);
    }else if(economie.level === 10){
        member.roles.remove(debutant);
        member.roles.add(actif);
        client.channels.cache.find(channel => channel.name === '💬général').send(`Félicitations à ${acquerreur} pour avoir obtenu le grae ${actif} ! Tu es un de nos membres les plus fidèles !`);
    }else if(economie.level === 20){
        member.roles.remove(debutant);
        member.roles.remove(actif);
        member.roles.add(hyperactif);
        client.channels.cache.find(channel => channel.name === '💬général').send(`Félicitations à ${acquerreur} pour avoir obtenu le grade ${hyperactif} ! Il ne faudrait pas que tu oublies ta vie sociale quand même !`);
    }else if(economie.level === 50){
        member.roles.remove(debutant);
        member.roles.remove(actif);
        member.roles.remove(hyperactif);
        member.roles.add(hermite);
        client.channels.cache.find(channel => channel.name === '💬général').send(`Mes amis, nous avons un nouveau ${hermite}... ${acquerreur} a décidé de passer sa vie sur le serveur !`);
    }else if(economie.level === 80){
        member.roles.remove(debutant);
        member.roles.remove(actif);
        member.roles.remove(hyperactif);
        member.roles.remove(hermite);
        member.roles.add(empereur);
        client.channels.cache.find(channel => channel.name === '💬général').send(`L'heure est grave... ${acquerreur} est sacré ${empereur} de ce serveur ! Gloire à lui !`);
    }else if(economie.level === 100){
        member.roles.remove(debutant);
        member.roles.remove(actif);
        member.roles.remove(hyperactif);
        member.roles.remove(hermite);
        member.roles.remove(empereur);
        member.roles.add(dieu);
        client.channels.cache.find(channel => channel.name === '💬général').send(`Sa venue nous était annoncée... ${acquerreur} s'éveille en tant que dieu tout puissant sur le serveur ! Que gloire et fierté lui soit alloué !`);
    };
};

module.exports.help = {
    name: 'grade'
};
