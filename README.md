# laravel-mix を利用したローカル開発環境

## overview

## installation

本ドキュメントでの環境導入については、全て Mac を前提としています。
Windows ユーザーの方は、各自ツール等を調べ、導入してください。

### homebrew（ + yarn）

[公式サイト](https://brew.sh/index_ja)

公式サイトの説明にある通り、以下のコマンドをターミナルで実行する。

```shell
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```

インストール後、動作確認のため以下のコマンドを実行する。

```shell
brew --version
```

brew コマンドのバージョン番号が返却されていれば、無事インストール出来ている。

続いて yarn をインストールするため、以下のコマンドを実行する。

```shell
brew install yarn --ignore-dependencies
```

インストール出来たか確認するため、以下のコマンドを実行する。

```shell
yarn -v
```

バージョン番号が返却されていれば、無事にインストール出来ている。

### node（anyenv + nodenv）

[anyenv 公式サイト](https://github.com/anyenv/anyenv)
[nodenv 公式サイト](https://github.com/nodenv/nodenv)

こちらも公式の手順に従って導入する。

```shell
brew install anyenv
echo 'eval "$(anyenv init -)"' >> ~/.zshrc
anyenv init
exec $SHELL -l
```

動作確認のため、以下のコマンドを実行する

```shell
anyenv
```

バージョン番号が返却されていれば無事にインストールされている。

#### マニフェストディレクトリの作成

anyenv の定義ファイルを格納するためのディレクトリを作成する必要があるので、以下のコマンドを実行

```shell
anyenv install --init
```

`Do you want to checkout ? [y/N]:` と聞かれるが、`y`とタイプして実行すればいい。

#### anyenv のプラグイン

`anyenv-update` プラグインと、`anyenv-git` プラグインを導入する。
これらは、anyenv を利用して導入した nodenv などのツールを一括でアップデートしてくれたり、便利な機能を提供してくれる。

まずは、これらプラグインを格納するためのディレクトリを作成するため、以下のコマンドを実行する。

```shell
mkdir -p ~/.anyenv/plugins
```

続いて、2 つのプラグインを一気にインストールする。

```shell
git clone https://github.com/znz/anyenv-update.git ~/.anyenv/plugins/anyenv-update
git clone https://github.com/znz/anyenv-git.git ~/.anyenv/plugins/anyenv-git
```

それぞれの使い方については、公式を参照。

[anyenv-update](https://github.com/znz/anyenv-update)
[anyenv-git](https://github.com/znz/anyenv-git)

続いて、nodenv をインストールするため、以下のコマンドを実行する。

```shell
anyenv install nodenv
exec $SHELL -l
```

無事インストール出来たか、以下のコマンドで確認する。

```shell
anyenv versions
```

`nodenv`という文字列が表示されていれば、とりあえずインストールは無事にできている。

本プロジェクトでは、node `14.16.1 ` を利用しているため、以下のコマンドでインストールする。

```shell
nodenv install 14.16.1
exec $SHELL -l
```

無事にインストールが出来ているか確認するため、以下のコマンドを実行する

```shell
anyenv versions
```

nodenv のツリーに、`14.16.1` が表示されていれば、無事にインストール出来ている。

### プロジェクトの初期化

以下のコマンドで、必要なモジュール類をローカル環境へインストールする。

```shell
yarn install
```

### ディレクトリ構造

- dist
- node_modules
- prod
- src
  - assets
    - img
    - js
    - scss
  - pug
    - extends
    - includes
- .browserslistrc
- .node-version
- imagemin.js
- package.json
- README.md
- webpack.mix.js
- yarn.lock

開発に際し、原則として更新するのは `src` ディレクトリのみとなる。
`dist` ディレクトリはローカル開発環境、またはステージング環境用ファイルが生成され、 `prod` ディレクトリは商用環境用のソースコードが生成される。
