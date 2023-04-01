import axios from 'axios'

export class OpenAiAPI {
  static async postChatCompletion(data, bearerToken) {
    let config = {
      headers: {
        Authorization: 'Bearer ' + bearerToken
      }
    }
    return await axios.post(
      'https://api.openai.com/v1/chat/completions',
      data,
      config
    )
  }

  // call one of openAI's API to verify token
  static async verifyToken(bearerToken) {
    let config = {
      headers: {
        Authorization: 'Bearer ' + bearerToken
      }
    }
    return await axios.get('https://api.openai.com/v1/models/babbage', config)
  }
}
