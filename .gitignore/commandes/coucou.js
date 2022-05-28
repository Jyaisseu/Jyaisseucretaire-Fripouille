module.exports.run = async (Client, message) => {
    message.channel.send(Èt bah coucou à toi aussi, ${message.author.username} !`);
};

module.exports.help = {
    name: 'coucou'
};
