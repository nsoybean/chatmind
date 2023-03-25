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
}
