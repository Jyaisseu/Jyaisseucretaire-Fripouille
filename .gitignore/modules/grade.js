module.exports.run = async (Client, message, economie, acquerreur) => {
    const member = acquerreur
    const debutant = message.guild.roles.cache.find(role => role.name === 'Débutant');
    const actif = message.guild.roles.cache.find(role => role.name === 'Actif');
    const hyperactif = message.guild.roles.cache.find(role => role.name === 'Hyperactif');
    const hermite = message.guild.roles.cache.find(role => role.name === 'Hermite');
    const empereur = message.guild.roles.cache.find(role => role.name === 'Empereur');
    const dieu = message.guild.roles.cache.find(role => role.name === 'Dieu');

    if(economie.level === 2){
        member.roles.add(debutant);
        Client.channels.cache.find(channel => channel.name === '💬général').send(`Félicitations à ${acquerreur} pour avoir obtenu le grade ${debutant} ! Bienvenue dans le club !`);
    }else if(economie.level === 10){
        member.roles.remove(debutant);
        member.roles.add
        Client.channels.cache.find(channel => channel.name === '💬général').send(`Félicitations à ${acquerreur} pour avoir obtenu le grae ${actif} ! Tu es un de nos membres les plus fidèles !`);
    }else if(economie.level === 20){
        member.roles.remove(debutant);
        member.roles.remove(actif);
        member.roles.add(hyperactif);
        Client.channels.cache.find(channel => channel.name === '💬général').send(`Félicitations à ${acquerreur} pour avoir obtenu le grade ${hyperactif} ! Il ne faudrait pas que tu oublies ta vie sociale quand même !`);
    }else if(economie.level === 50){
        member.roles.remove(debutant);
        member.roles.remove(actif);
        member.roles.remove(hyperactif);
        member.roles.add(hermite);
        Client.channels.cache.find(channel => channel.name === '💬général').send(`Mes amis, nous avons un nouveau ${hermite}... ${acquerreur} a décidé de passer sa vie sur le serveur !`);
    }else if(economie.level === 80){
        member.roles.remove(debutant);
        member.roles.remove(actif);
        member.roles.remove(hyperactif);
        member.roles.remove(hermite);
        member.roles.add(empereur);
        Client.channels.cache.find(channel => channel.name === '💬général').send(`L'heure est grave... ${acquerreur} est sacré ${empereur} de ce serveur ! Gloire à lui !`);
    }else if(economie.level === 100){
        member.roles.remove(debutant);
        member.roles.remove(actif);
        member.roles.remove(hyperactif);
        member.roles.remove(hermite);
        member.roles.remove(empereur);
        member.roles.add(dieu);
        Client.channels.cache.find(channel => channel.name === '💬général').send(`Sa venue nous était annoncée... ${acquerreur} s'éveille en tant que dieu tout puissant sur le serveur ! Que gloire et fierté lui soit alloué !`);
    };
};

module.exports.help = {
    name: 'grade'
};