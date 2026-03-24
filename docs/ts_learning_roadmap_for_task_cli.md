# TypeScript学習ロードマップ
対象:
- JavaScriptは理解している
- TypeScriptを学びたいエンジニア
- 今後バックエンドとフロントエンドの両方でTypeScriptを使いたい

## 学習方針
このロードマップは、TypeScriptを文法順に網羅学習するためのものではない。
実装を進めながら、必要になった知識を必要なタイミングで学ぶことを前提とする。

題材はタスク管理CLIアプリとする。

最終到達点:
- TypeScriptでドメインを実装できる
- Vitestでユニットテスト/モック/統合テストを書ける
- Zodで入力境界を検証できる
- Commander.jsでCLI層を実装できる
- npm workspacesで core / app / cli に分割できる

---

## 全体ロードマップ

### Phase 1: Taskドメインの最小実装
実装対象:
- TaskId
- TaskTitle
- TaskStatus
- Task
- createTask

学ぶ内容:
- 型注釈
- 型推論
- オブジェクト型
- 関数の型
- type
- Literal型
- Union型

ゴール:
- タスクを型で安全に表現できる

---

### Phase 2: ドメインルールと失敗表現
実装対象:
- completeTask
- reopenTask
- タイトルバリデーション
- Result型
- ドメインエラー型

学ぶ内容:
- Narrowing
- 判別可能Union
- unknown
- never
- Result型
- ドメインエラー
  1. タイトルは空文字・空白のみを禁止
  2. createTask は不正タイトルなら失敗
  3. completeTask は open -> completed のみ成功
  4. reopenTask は completed -> open のみ成功
- readonly

ゴール:
- 成功/失敗を型で扱える
- 失敗理由はドメインエラー型で区別する

---

### Phase 3: ドメインのVitestユニットテスト
実装対象:
- TaskTitle のテスト
- Task のテスト
- createTask のテスト
- completeTask / reopenTask のテスト

学ぶ内容:
- Vitest基本
- describe
- it
- expect
- 正常系/異常系
- テーブル駆動テスト

ゴール:
- ドメインルールをテストで固定できる

---

### Phase 4: UseCase層の追加
実装対象:
- TaskRepository interface
- CreateTaskUseCase
- ListTasksUseCase
- CompleteTaskUseCase
- ReopenTaskUseCase
- 入出力DTO

学ぶ内容:
- interface
- Repository
- DTO
- Promise
- async/await

ゴール:
- アプリケーション層を分離できる

---

### Phase 5: UseCase層のVitestテスト
実装対象:
- TaskRepository のモック
- UseCaseのユニットテスト
- 保存失敗ケースのテスト
- 呼び出し確認テスト

学ぶ内容:
- vi.fn
- vi.spyOn
- モック
- スタブ
- スパイ

ゴール:
- 外部依存を差し替えてUseCaseをテストできる

---

### Phase 6: Zodによる入力検証
実装対象:
- CreateTaskInputSchema
- CompleteTaskInputSchema
- ReopenTaskInputSchema
- ListTasksInputSchema

学ぶ内容:
- z.object
- z.string
- z.enum
- min/max
- optional
- parse
- safeParse

ゴール:
- 外部入力を安全にアプリ内部へ入れられる

補足:
- Zodは外部入力境界の検証を担当する
- ドメイン内部の業務ルール保持とは責務を分ける

---

### Phase 7: Commander.jsでCLI層追加
実装対象:
- task add <title>
- task list
- task complete <id>
- task reopen <id>
- --status option
- help表示

学ぶ内容:
- command
- argument
- option
- help
- usage
- stdout
- stderr
- exit code

ゴール:
- CLIとして使える形になる

補足:
- CLI層は業務ロジックを持たない
- CLIは入力受付、Zodによる検証、UseCase呼び出し、出力整形を担当する

---

### Phase 8: CLI統合テスト
実装対象:
- task add の統合テスト
- task list の統合テスト
- task complete の統合テスト
- task reopen の統合テスト
- 不正入力時の統合テスト
- help表示の統合テスト

学ぶ内容:
- プロセス実行
- stdout/stderr 検証
- 終了コード検証
- 統合テスト設計

ゴール:
- CLI全体として壊れていないことを確認できる

---

### Phase 9: npm workspacesで分割
実装対象:
- packages/core
- packages/app
- packages/cli
- ルート package.json
- ルート tsconfig.base.json
- packageごとの tsconfig.json

学ぶ内容:
- npm workspaces
- workspace scripts
- package間依存
- tsconfig分割
- Project References

ゴール:
- core / app / cli に責務分離できる

---

## タスク管理アプリの最終機能
必須機能:
- タスク追加
- タスク一覧表示
- タスク完了
- タスク再オープン

追加候補:
- statusで絞り込み
- 優先度 low | medium | high
- 期限日
- ソート
- 永続化方式の差し替え

---

## 設計方針
- 学習のための学習ではなく、実装を前に進めることを優先する
- TypeScriptの型とZodの実行時検証を分けて考える
- ドメインとCLIの責務を混ぜない
- 最初からworkspaces化しない
- 難しい型テクニックは必要になるまで後回しにする

後回しでよいもの:
- conditional types
- mapped types
- infer
- 複雑な型演算

優先して学ぶもの:
- Union
- Narrowing
- Result型
- Vitest基本
- interface
- Promise
- Zod
- Commander.js
- 統合テスト