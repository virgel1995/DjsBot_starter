
const { getSettings } = require("./Schema/Guild");
const { getUser } = require("./Schema/User");

async function findUser(id) {
let db =  await getUser(id)
	return db;
}

async function findGuild(id){
	let db = await guildConfig.findById({
	guildId: id,
})

	return db;
}

async function addCoins(id, coins) {
	let credits = findUser(id).coins;
	let db =  await userConfig.findOneAndUpdate(
		{discordId: id},										{coins: credits + coins},
	 // { new: true }
)
	return db ;
}
async function removeCoins(id, coins) {
	let credits = findUser(id).coins;
	let db =  await userConfig.findOneAndUpdate(
		{discordId: id},										{coins: credits - coins},
	  { new: true }
)
	return db ;
}
async function transferCoins(sendId, receivedId , coins) {
  let senderCredits = findUser(sendId).coins;
	let receierCredits = findUser(receivedId).coins;
let del = await userConfig.findOneAndUpdate(
		{discordId: sendId},										{coins: senderCredits - coins},
	  { new: true }
)
let add = 	await userConfig.findOneAndUpdate(
		{discordId: receivedId},						{coins: receierCredits + coins},
	  { new: true }
)
return {del , add }
	
}
module.exports = {
	findUser, 
	findGuild,
	addCoins, 
	removeCoins,
	transferCoins
}