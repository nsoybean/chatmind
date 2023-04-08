import axios from 'axios'
import general from '../helper/general'

export class OpenAiAPI {
  static async postChatCompletion(data, bearerToken, cancelToken) {
    let config = {
      headers: {
        Authorization: 'Bearer ' + bearerToken
      },
      cancelToken: cancelToken.token
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
