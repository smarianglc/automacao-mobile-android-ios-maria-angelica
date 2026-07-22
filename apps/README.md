# Apps

Coloque aqui os binários do `native-demo-app` baixados em
https://github.com/webdriverio/native-demo-app/releases (aba **Assets** da release mais recente):

- `android.apk` — build Android (arquivo `.apk`)
- `ios-simulator.zip` — build de iOS para simulador (arquivo `.zip` ou `.app`)

Os nomes acima são os esperados por padrão em `config/wdio.android.app.conf.js` e
`config/wdio.ios.app.conf.js`. Se baixar um arquivo com outro nome, ajuste as variáveis de
ambiente `ANDROID_APP_PATH` / `IOS_APP_PATH`, ou renomeie o arquivo.

Os binários **não são versionados** neste repositório (ver `.gitignore`) por serem arquivos
grandes e específicos de cada release do app de demonstração.
