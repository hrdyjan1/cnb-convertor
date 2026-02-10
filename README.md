# CNB Convertor

[![Expo](https://img.shields.io/badge/Expo-~54-000020?logo=expo&logoColor=white)](https://expo.dev/)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![React Native](https://img.shields.io/badge/React%20Native-0.81-61DAFB?logo=react&logoColor=black)
![Jest](https://img.shields.io/badge/tests-Jest-C21325?logo=jest&logoColor=white)
![Code style](https://img.shields.io/badge/code%20style-Biome-60A5FA)

Small Expo app that fetches **daily exchange rates from the Czech National Bank (ČNB)** and provides:

- **Currency converter**: convert an amount in **CZK** to a selected currency
- **Rates list**: browse all available currencies and their CZK rates
- **Last updated** indicator based on query refresh time

## Highlights

- **Live CNB rates** from the official `daily.txt` endpoint (pipe-delimited)
- **React Query caching** (stale time + GC time) with periodic refetch
- **Type-safe parsing** and validation with **Valibot**
- **Debounced input** for smooth conversions
- **Test coverage** for rate parsing & conversion logic with **Jest**

## Screens

- **Home**: entry point with navigation to tools
- **Converter**: CZK input + currency picker + formatted result
- **Rates**: scrollable list + pull-to-refresh

## Tech stack

- **Expo** (`expo`)
- **React Native** + **TypeScript**
- **React Navigation** (native stack)
- **@tanstack/react-query** (data fetching & caching)
- **styled-components** (UI)
- **Valibot** (runtime schema validation)
- **Jest** (`jest-expo`) + Testing Library
- **Biome** (formatting + linting)
- **Husky** (pre-commit hooks)

## Getting started

### Prerequisites

- **Node.js**: recent LTS recommended
- **npm** (comes with Node)
- **Expo Go** on your phone (optional, for running on device)

### Install

```bash
npm install
```

### Run

```bash
# start Metro / Expo dev server
npm run start
```

Then choose a platform:

```bash
npm run android
npm run ios
npm run web
```

## Scripts

```bash
npm run start        # Expo dev server
npm run android      # Run on Android
npm run ios          # Run on iOS
npm run web          # Run in browser

npm run test         # Jest test suite
npm run biome:check  # Biome lint/format check
```

## How it works

### CNB data source

Rates are fetched from the official CNB endpoint:

- `https://www.cnb.cz/en/financial-markets/foreign-exchange-market/central-bank-exchange-rate-fixing/central-bank-exchange-rate-fixing/daily.txt`

The response is plain text. After the first header line (date) and the column header, each rate line looks like:

```
Country|Currency|Amount|Code|Rate
```

This app parses each line and validates it against a runtime schema before it is used by the UI.

### Conversion formula

CNB provides rates as **CZK per `Amount` units** of a currency.

To convert from CZK to the selected currency, this app uses:

```text
result = CZK / (Rate / Amount)
```

Example:

```text
Rate = 23.50 CZK per 100 units
CZK  = 470

result = 470 / (23.50 / 100)
       = 470 / 0.235
       = 2000 units
```

## Project structure

```text
src/
  app/
    navigation/        # RootNavigator (Home / Converter / Rates)
    providers/         # QueryProvider (React Query)
  components/          # BaseScreen, FeatureCard, LastUpdatedLabel
  features/finance/
    api/               # fetchCnbRates + tests
    hooks/             # useCnbRates, useCurrencyConversion + tests
    schema/            # Valibot schemas for CNB response
  screens/             # HomeScreen, ConvertScreen, RatesScreen
  utils/               # formatting + conversion helpers
```

## Testing

```bash
npm test
```

## Notes

- **Base currency is CZK**.
- Rates are refreshed periodically via React Query (`staleTime` + `refetchInterval` are set in `useCnbRates`).

## Contributing

Issues and PRs are welcome. If you change formatting/linting rules, please run:

```bash
npm run biome:check
```

