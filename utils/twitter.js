const { TwitterApi } = require('twitter-api-v2');

const client = new TwitterApi({
  appKey: process.env.TWITTER_CONSUMER_KEY,
  appSecret: process.env.TWITTER_CONSUMER_SECRET,
  accessToken: process.env.TWITTER_ACCESS_TOKEN,
  accessSecret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const cutToFit = text => text.length < 281 ? text : text.substring(0, ).substring(0, 230) + '(...)\n\nLeia tudo em devsakae.tech/tigrebot'

const postTweet = async text => {
  try {
    const tweet = await client.v2.tweet(cutToFit(text));
    return console.info('Tweet postado! Veja em https://twitter.com/Tigrelog/status/' + tweet.data.id)
  } catch (error) {
    return console.error(`Failed to post tweet: ${error}`);
  }
}

const postMediaTweet = async ({ media, text }) => {
  try {
    const source = Buffer.from(media.data, 'base64');
    const mediaId = await client.v1.uploadMedia(source, { mimeType: media.mimetype });
    const tweet = await client.v2.tweet({ text: cutToFit(text), media: { media_ids: [mediaId] } });
    return console.info('Tweet postado! Veja em https://twitter.com/Tigrelog/status/' + tweet.data.id)
  } catch (error) {
    return console.error(`Failed to post tweet: ${error}`);
  }
}

module.exports = {
  postTweet,
  postMediaTweet,
}