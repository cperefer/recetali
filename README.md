# Recetali

## Descripción

Recetali is a web app for creating and consulting cooking recipes.

## Instalation and usage

### 1. Clone repo

```bash
git clone https://github.com/cperefer/recetali.git
```

### 2. Install dependencies

```bash
cd recetali && npm install
```

### 3. Environment setup

```bash
cp .env.template .env
npm run db:migrate
npm run db:seed
```

### 4. Development

```bash
npm run dev
```
