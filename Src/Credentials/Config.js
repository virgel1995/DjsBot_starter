module.exports = {
	PREFIX: "!",
    developersIds: ["799984138111287337"],
    botToken: "your bot token",
	mongo_URL: "your mongo db url",
	COINS:{
		PER_MESSAGE:{
			ENABLED: true, //enable or disable add coins every message
			AMOUNT: 100 //add 100 coins per message
		},
		RANDOM:{//add random coins 
			ENABLED: true,
		}
	},
	ECONOMY: {
    ENABLED: true,
    CURRENCY: "₪",
    DAILY_COINS: Math.floor(Math.random() * 500) , // coins to be received by daily command
  },
EMBED_COLORS: {
    BOT_EMBED: "#068ADD",
    TRANSPARENT: "#36393F",
    SUCCESS: "#00A56A",
    ERROR: "#D61A3C",
    WARNING: "#F7E919",
  },
	CACHE_SIZE: {
    GUILDS: 100,
    USERS: 10000,
    MEMBERS: 10000,
  },
}