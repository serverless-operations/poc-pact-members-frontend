# poc-pact-members-web
Sample web application for spiking Pact contract testing

## Pact テストのデモ実行手順
Consumer 側 Web アプリのテストを実行して Pact ファイルを生成、ブローカーへアップロードします。

### 実行環境
- Node.js `v12.13.0` 以上
- Yarn `1.22.0` 以上

### 依存関係のセットアップ
```shell
yarn setup
```

### 環境変数の設定
`.env` ファイルを作成して以下の環境変数をセットします
```
MEMBERS_API_BASE_URL=
PACT_BROKER_ENDPOINT=
PACT_BROKER_TOKEN=
```

### Pact テストの実行
```shell
yarn test:pact
```

### Pact ファイルをブローカーへ送信する
```shell
yarn test:publish
```

