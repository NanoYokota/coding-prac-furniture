import { createInterface } from 'readline';
import { execSync } from 'child_process';

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

// 質問を順に行うためのヘルパー関数
function askQuestion(query) {
  return new Promise((resolve) => {
    rl.question(query, (answer) => {
      resolve(answer);
    });
  });
}

(async () => {
  try {
    // パッケージマネージャを尋ねる
    const manager = await askQuestion('どちらを使用しますか？ (npm/yarn): ');

    // ユーザー入力を読み終わったので閉じる
    rl.close();

    // コマンドの選択
    let command = '';
    if (manager.trim().toLowerCase() === 'yarn') {
      // yarn
      command = "yarn";
    } else {
      // npm (デフォルト)
      command = "npm i";
    }

    console.log(`\n実行中: ${command}\n`);
    
    // コマンドを実行 (同期)
    execSync(command, { stdio: 'inherit' });
  } catch (error) {
    console.error('失敗しました:', error);
    rl.close();
    process.exit(1);
  }
})();
