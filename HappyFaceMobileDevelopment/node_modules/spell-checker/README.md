## SPELL-CHECKER

Aplicativo Nodejs que permite validar a grafia de palavaras contidas dentro de um arquivo. 


## Instalação

Spell-checker depende do  [Node](http://nodejs.org/) e [npm](http://npmjs.org/). Pode ser instalado da seguinte maneira:

```
npm install -g spell-checker
```

## Arquivo de configuração

O Spell-checker necessita de um arquivo de configuração. Este arquivo deve conter os caminhos dos diretórios para serem validados, o dicionário de palavaras e os scripts (separados pela extensão dos arquivos) responsáveis por quebrar o conteúdo dos arquivos em palavras. As palavras fornecidas por estes scritps serão validadas contra o arquivo de dicionário configurado. 

O arquivo config.js é um exemplo de arquivo de configuração que pode ser utilizado com exemplo.

## Utilização

```
spell-checker nome_arquivo_configuracao.js
```
