document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatMessages = document.getElementById('chat-messages');

    // メッセージを画面に表示する関数
    function displayMessage(message, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(sender + '-message');
        messageDiv.textContent = message;
        chatMessages.appendChild(messageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight; // スクロールを一番下に移動
    }

    // ユーザーメッセージを送信し、ボットの応答を処理する関数
    function sendMessage() {
        const message = userInput.value.trim();
        if (message === '') return;

        // ユーザーのメッセージを表示
        displayMessage(message, 'user');
        userInput.value = '';

        // 500ミリ秒後にボットの応答をシミュレート
        setTimeout(() => {
            let botResponse = 'すみません、よくわかりません。'; // デフォルトの応答

            // ユーザーの入力に応じて応答を決定
            if (message.includes('こんにちは') || message.includes('こんにちわ')) {
                botResponse = 'こんにちは！何かお手伝いできることはありますか？';
            } else if (message.includes('ありがとう')) {
                botResponse = 'どういたしまして！';
            } else if (message.includes('天気')) {
                botResponse = '今日の天気は晴れです！';
            }

            // ボットの応答を表示
            displayMessage(botResponse, 'bot');
        }, 500);
    }

    // 「送信」ボタンがクリックされた時のイベント
    sendBtn.addEventListener('click', sendMessage);

    // Enterキーが押された時のイベント
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // 初期メッセージとしてチャットボットからの挨拶を表示
    displayMessage('こんにちは！何か質問はありますか？', 'bot');
});
