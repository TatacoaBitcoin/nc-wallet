# Tatacoa Wallet

A non-custodial Bitcon wallet powered by Breez SDK. Built on React Native and tested on Android.

Tatacoa Wallet includes the following features:

- Send and receive Bitcoin Lightning
- QR code scanning
- Invoice decoding
- Wallet recovery
- Copy invoice from/to clipboard
- Support for numerous fiat currencies
- Multilanguage support (ES, EN)

## TODOs

- [x] Send/receive Lightning
- [ ] LNURL-Auth
- [ ] On-chain support
- [ ] Submarine swaps

## Build

Set environment variables

```
// .env
BREEZ_API_KEY=***
DEVICE_KEY=***
DEVICE_CERTIFICATE_BASE64=***
DEVICE_KEY_BASE64=***
TATACOA_UPLOAD_STORE_FILE=tatacoa_nc_wallet.keystore
TATACOA_UPLOAD_KEY_ALIAS=nc_wallet
TATACOA_UPLOAD_STORE_PASSWORD=***
TATACOA_UPLOAD_KEY_PASSWORD=***
```

Set node version

    $ nvm use

Install dependencies

    $ yarn install

Run bundler [Metro](https://reactnative.dev/docs/metro)

    $ yarn start --reset-cache

Launch application on device/emulator

    $ yarn android
