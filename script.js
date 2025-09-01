// URL制限のための確認
(function() {
    const allowedDomain = "https://kongou173.github.io/Chatbot/"; // ここに許可するURLを正確に入力してください。例: "your-username.github.io"
    const currentDomain = window.location.hostname;

    if (currentDomain !== allowedDomain) {
        // 許可されたドメイン以外では動作を停止
        document.addEventListener('DOMContentLoaded', function() {
            document.body.innerHTML = `
                <div style="text-align: center; padding: 50px; font-family: Arial, sans-serif;">
                    <h1 style="color: #39c5bb;">chatbot</h1>
                    <p style="margin: 20px 0;">このWebアプリケーションは <a href="https://kongou173.github.io/Chatbot/" style="color: #39c5bb; text-decoration: none;">https://kongou173.github.io/Chatbot/</a> でのみ動作します。</p>
                    <p>正規のWebサイトにアクセスしてください。</p>
                </div>
            `;
        });
        // 既存のスクリプトの実行を防止
        window.initialize = function() {};
        return; // これ以降のスクリプトを実行しない
    }
})();


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

    // 現在の時間を取得してフォーマットする関数
    function getCurrentTime() {
        const now = new Date();
        const year = now.getFullYear();
        const month = now.getMonth() + 1; // getMonth()は0から始まるため1を足す
        const date = now.getDate();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const seconds = now.getSeconds();
        return `${year}年${month}月${date}日 ${hours}時${minutes}分${seconds}秒です。`;
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
            } else if (message.includes('時間') || message.includes('今何時')) {
                botResponse = getCurrentTime();
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
