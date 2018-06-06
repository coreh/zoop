# zoop - Cliente Não-oficial para API Zoop

<p align="center">
🇺🇸 <a href="README.md">English README</a>
<br><br>
<a href="https://www.npmjs.com/package/@coreh/zoop"><img src="https://img.shields.io/npm/v/@coreh/zoop.svg"></a>
<a href="LICENSE"><img src="https://img.shields.io/npm/l/@coreh/zoop.svg?label=licença"></a>
<a href="https://travis-ci.org/coreh/zoop/"><img src="https://img.shields.io/travis/coreh/zoop.svg?label=compilação"></a>
<a href="https://coveralls.io/github/coreh/zoop"><img src="https://img.shields.io/coveralls/github/coreh/zoop.svg?label=cobertura%20de%20testes"></a>
<a href="https://david-dm.org/coreh/zoop"><img src="https://img.shields.io/david/coreh/zoop.svg?label=dependências"></a>
</p>

## Sobre

- Isomórfico (Browser, Node, ReactNative)
- Definições dos tipos em TypeScript

## Instalação

```bash
npm install @coreh/zoop
```

## Uso

```javascript
import Zoop from '@coreh/zoop';

// Criar Cliente da API
const zoop = new Zoop(API_KEY);

// Endpoint do Marketplace
const marketplace = zoop.marketplace(MARKETPLACE_ID);

// Endpoint do Buyer
const buyer = marketplace.buyer(BUYER_ID);

// Recuperar Informações do Buyer (assíncrono)
const buyerInfo = await buyer.get();

// Listar Buyers (iterador assíncrono)
for await (const buyerInfo of marketplace.listBuyers()) {
    // ...
}
```

## Endpoints Implementados

- Marketplace (Recuperar)
- Buyer (Criar, Recuperar, Listar)
- Transaction (Recuperar, Listar)

## Licença

MIT
