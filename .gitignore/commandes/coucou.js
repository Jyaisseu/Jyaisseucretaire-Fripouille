module.exports.run = async (Client, interaction) => {
    interaction.reply(`Et bah coucou à toi aussi, ${interaction.user.username} !`);
};

module.exports.help = {
    name: 'coucou'
};
