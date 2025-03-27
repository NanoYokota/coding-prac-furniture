// remove-file.mjs
import fs from 'fs';
import path from 'path';

// npm_config_local_prefixが設定される
const projectRoot = process.env.npm_config_local_prefix || process.cwd();
const absoluteProjectRoot = fs.realpathSync(projectRoot);

const argPrefix = '--path=';
const filePathArg = process.argv.find((arg) => arg.startsWith(argPrefix));

if (!filePathArg) {
  console.error('エラー: --path=... の形式で削除対象のファイル／ディレクトリを指定してください。');
  process.exit(1);
}

const filePathValue = filePathArg.replace(argPrefix, '').trim();
const resolvedPath = path.resolve(absoluteProjectRoot, filePathValue);

// シンボリックリンクなど実パスを解決
let absoluteTargetPath;
try {
  absoluteTargetPath = fs.realpathSync(resolvedPath);
} catch (err) {
  console.warn(`ファイル/ディレクトリが見つかりませんでした: ${resolvedPath}`);
  process.exit(0);
}

// プロジェクト外へのアクセスを防ぐ
if (!absoluteTargetPath.startsWith(absoluteProjectRoot + path.sep)) {
  console.error('エラー: 指定されたパスはプロジェクト外部です。削除しません。');
  process.exit(1);
}

try {
  fs.rmSync(absoluteTargetPath, { recursive: true, force: true });
  console.log(`削除しました: ${absoluteTargetPath}`);
} catch (err) {
  console.error('削除に失敗しました:', err);
  process.exit(1);
}
