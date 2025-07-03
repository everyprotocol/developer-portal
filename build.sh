(
    cd polkadot-js-ui/ &&
    yarn build &&
    yarn polkadot-dev-copy-to polkadot-js-apps
) && (
    cd polkadot-js-common/ &&
    yarn build &&
    yarn polkadot-dev-copy-to polkadot-js-apps
) && (
    cd polkadot-js-apps/ &&
    yarn build:www
)
