# ABC Co. Next.js

Next.js 16 + microCMS で構築されたコーポレートサイトです。

> **Note:** これはポートフォリオ用に作成した架空の企業サイトです。作中に登場する「ABC Co.」等の会社名・サービス内容・採用情報は実在しません。

## 技術スタック

- [Next.js 16](https://nextjs.org)（App Router）
- [React 19](https://react.dev)
- [TypeScript](https://www.typescriptlang.org)
- [Tailwind CSS 4](https://tailwindcss.com)
- [microcms-js-sdk](https://github.com/microcmsio/microcms-js-sdk)（記事・カテゴリ・求人・お問い合わせの取得/登録）
- [lucide-react](https://lucide.dev)（アイコン）
- [Resend](https://resend.com)（お問い合わせ通知メール送信）

## ディレクトリ構成

```
app/
  page.tsx                 トップページ
  blog/                    ブログ一覧・カテゴリ別一覧・記事詳細
  updates/                 お知らせ一覧
  company/                 会社概要
  service/                 サービス紹介
  recruit/                 採用情報一覧・詳細
  contact/                 お問い合わせフォーム・送信完了
  (legal)/                 プライバシーポリシー・利用規約
components/                共通UIコンポーネント（記事カード、ナビ、もっと見るボタンによる追加読み込み等）
lib/
  microcms-client.ts        microCMSクライアント・共通データ取得関数
  cms-types.ts               microCMSのコンテンツ型定義
constants.ts                 サイト名・サイトURLなどのサイト全体設定
```

## セットアップ

### 1. 依存関係のインストール

```bash
pnpm install
```

### 2. 環境変数の設定

プロジェクトルートに `.env` を作成し、以下の値を設定してください。

| 変数名 | 用途 |
| --- | --- |
| `MICROCMS_SERVICE_DOMAIN` | microCMSのサービスドメイン |
| `NEXT_PUBLIC_MICROCMS_API_KEY` | microCMSのAPIキー |
| `RESEND_API_KEY` | Resendのお問い合わせ通知メール送信用APIキー |
| `CONTACT_TO_EMAIL` | お問い合わせ通知の送信先メールアドレス |
| `NEXT_PUBLIC_SITE_URL` | サイトの公開URL（未設定時は `http://localhost:3000`） |

microCMSには以下のエンドポイントが必要です。

- `blogs`：ブログ/お知らせ記事（`category`で`updates`とその他を区別）
- `categories`：ブログカテゴリ一覧
- `recruitments`：採用職種一覧
- `contact`：お問い合わせ内容の保存先

### 3. 開発サーバーの起動

```bash
pnpm dev
```

[http://localhost:3040](http://localhost:3040) で確認できます（ポート3040で起動します）。

## その他のコマンド

```bash
pnpm build   # 本番ビルド
pnpm start   # 本番サーバー起動
pnpm lint    # ESLint実行
```
