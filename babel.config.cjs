module.exports = function (api) {
    api.cache(true);
    api.retainLines = true;
    const presets = [ '@babel/preset-env' ];
    const plugins = [
        [
            "module-resolver",
            {
                "alias": {
                    "modern-linq": "./index.esm.js"
                }
            }
        ],
        [
            "@babel/plugin-proposal-private-methods",
            { "loose": true }
        ]
    ];
    return {
        presets,
        plugins
    }
};
