# Protocolo Zero

Site local independente, inspirado no layout e nos efeitos da referência Low Ticket Academy. O conteúdo foi organizado em torno do Protocolo Zero: a página não exibe VSL, depoimentos, fotos ou vídeos da referência.

## Executar

`npm install`

`npm run dev -- --port 5175`

Para gerar a versão de produção: `npm run build`. Para visualizá-la: `npm run preview -- --port 4175`.

## Arquivos principais

- `index.html`: conteúdo, navegação, oferta e perguntas frequentes.
- `src/reference.css`: estilos da referência e componentes visuais próprios do Protocolo Zero.
- `src/interactions.js`: navegação móvel, entrada de elementos, efeito da barra e destaque dos cartões.
- `public/ai-logos`: 16 logos PNG locais e os créditos/licença MIT do pacote Lobe Icons.

O site não oferece checkout. Os botões navegam para o conteúdo ou para a seção de dúvidas, pois o link de compra ainda não existe. Logotipos de ferramentas são identificadores visuais; não indicam parceria, acesso incluso ou endosso. As fontes usam Google Fonts e precisam de conexão com a internet. `vite.config.js` serve e empacota apenas os logotipos e a folha de fontes necessários; mídias antigas da referência não são servidas nem incluídas na entrega.

As versões anteriores em `protocolo-zero` e `protocolo-zero-krepling` foram mantidas separadas.
