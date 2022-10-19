const { EmbedBuilder, ApplicationCommandType,ApplicationCommandOptionType } = require("discord.js")
const { getUser } = require("@schemas/User");
const { diffHours, getRemainingTime } = require("@src/Credentials/Utils");
const { EMBED_COLORS, ECONOMY } = require("@src/Credentials/Config.js");


module.exports = {
    name: "transfer",
    type: ApplicationCommandType.ChatInput,
    description: "get daily coins",
	options: [
          {
            name: "user",
            description: "the user to whom coins must be transferred",
            type: ApplicationCommandOptionType.User,
            required: true,
          },
          {
            name: "coins",
            description: "the amount of coins to transfer",
            type: ApplicationCommandOptionType.Integer,
            required: true,
          },
        ],
    run: async(DiscordClient, interaction) => {
			const user = interaction.options.getUser("user");
      const coins = interaction.options.getInteger("coins");
      response = await transfer(interaction.user, user, coins);
	interaction.reply(response)
    }
}
async function transfer(self, target, coins) {
  if (isNaN(coins) || coins <= 0) return "Please enter a valid amount of coins to transfer";
  if (target.bot) return "You cannot transfer coins to bots!";
  if (target.id === self.id) return "You cannot transfer coins to self!";

  const userDb = await getUser(self);

  if (userDb.coins < coins) {
    return `Insufficientbalance! You only have ${userDb.coins}${ECONOMY.CURRENCY} in your bank account `;
  }

  const targetDb = await getUser(target);

  userDb.coins -= coins;
  targetDb.coins += coins;

  await userDb.save();
  await targetDb.save();

  const embed = new EmbedBuilder()
    .setColor(EMBED_COLORS.BOT_EMBED)
    .setAuthor({ name: "Updated Balance" })
    .setDescription(`You have successfully transferred ${coins}${ECONOMY.CURRENCY} to ${target.tag}`)
    .setTimestamp(Date.now());

  return { embeds: [embed] };
};