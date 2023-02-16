function isBot(userAgent) {
    const bots = [
      "googlebot",
      "bingbot",
      "yandexbot",
      "duckduckbot",
      "slurp",
      "baiduspider",
      "facebot",
      "ia_archiver",
      "twitterbot",
    ];

    const agent = userAgent.toLowerCase();
  
    for (const bot of bots) {
      if (agent.indexOf(bot) > -1) {
        return true;
      }
    }
  
    return false;
  }
  
  module.exports = isBot;
  