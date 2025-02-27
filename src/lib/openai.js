import axios from "axios";

class OpenaiClient{
    constructor(){
        this.apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        console.log('API Key:', this.apiKey);

        if (!this.apiKey) {
            console.error("OpenAI APIキーが設定されていません。環境変数REACT_APP_OPENAI_API_KEYを設定してください。");
        }
    };

    async completion(messages) {
        const requestData = {
            model: 'gpt-3.5-turbo',
            messages,
        };
    
        try {
            const response = await axios.post(
                'https://api.openai.com/v1/chat/completions',
                requestData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${this.apiKey}`,
                    },
                }
            );
            return response.data.choices[0].message.content;
        } catch (error) {
            console.error('APIリクエストに失敗しました:', error.response ? error.response.data : error.message);
            throw new Error('OpenAI APIのリクエストに失敗しました。');
        }
    }
}

const openai = new OpenaiClient();
export default openai;