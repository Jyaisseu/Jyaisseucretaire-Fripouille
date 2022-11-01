module.exports.run = async (client, interaction) => {
    interaction.reply(`Et bah coucou à toi aussi, ${interaction.user.username} !`);
};

module.exports.help = {
    name: 'coucou'
};
