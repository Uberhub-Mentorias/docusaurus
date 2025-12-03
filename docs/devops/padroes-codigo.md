---
id: padroes-codigo
title: Padrões de Código
sidebar_label: 📝 Padrões de Código
sidebar_position: 5
---

# 📝 Padrões de Código

> Convenções e boas práticas para o projeto

---

## 📋 Convenções de Nomenclatura

| Tipo | Convenção | Exemplo |
|------|-----------|---------|
| **Componentes React** | PascalCase | `HomeScreen.js` |
| **Funções/variáveis** | camelCase | `loadData()` |
| **Constantes globais** | UPPER_SNAKE_CASE | `API_BASE_URL` |
| **Arquivos CSS** | kebab-case | `header-styles.css` |

---

## 📦 Ordem de Imports

```javascript
// 1. React e React Native
import React, { useState } from "react";
import { View, Text } from "react-native";

// 2. Bibliotecas de terceiros
import axios from "axios";
import { Button } from "react-native-paper";

// 3. Componentes locais
import Header from "../components/Header";

// 4. Serviços e utilitários
import { authService } from "../services/api";
```

---

## 🎨 Estilos

### Web (CSS)
```css
/* Arquivo separado: HomeScreen.css */
.container {
  display: flex;
  padding: 20px;
}
```

### Mobile (StyleSheet)
```javascript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
});
```

---

## ✅ Checklist de PR

- [ ] Código segue as convenções de nomenclatura
- [ ] Imports estão na ordem correta
- [ ] ESLint passa sem erros
- [ ] Build passa sem erros
- [ ] Testes passam (se aplicável)
