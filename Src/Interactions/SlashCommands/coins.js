const { EmbedBuilder, ApplicationCommandType,ApplicationCommandOptionType } = require("discord.js")
const { getUser } = require("@schemas/User");
const { EMBED_COLORS, ECONOMY } = require("@src/Credentials/Config.js");
module.exports = {
    name: "credits",
    type: ApplicationCommandType.ChatInput,
    description: "shows you credits count",
	options: [
          {
            name: "user",
            description: "name of the user",
            type: ApplicationCommandOptionType.User,
            required: false,
          },
        ],
    run: async(DiscordClient, interaction) => {
const user = interaction.options.getUser("user") || interaction.user;
      response = await balance(user);
  interaction.reply(response);
    }
}

async function balance (user) {
  const economy = await getUser(user);

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setAuthor({ name: user.username })
    .setThumbnail(user.displayAvatarURL())
    .addFields(
      {
        name: "Wallet",
        value: `${economy?.coins || 0}${ECONOMY.CURRENCY}`,
        inline: true,
      },
      {
        name: "Net Worth",
        value: `${(economy?.coins || 0)}${ECONOMY.CURRENCY}`,
        inline: true,
      }
    );

  return { embeds: [embed] };
};