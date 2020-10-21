module.exports = {
    'env': {
        'browser': true,
        'commonjs': true,
        'es2021': true,
    },
    'extends': [
        'plugin:vue/essential',
        'google',
    ],
    'parserOptions': {
        'ecmaVersion': 12,
    },
    'plugins': [
        'vue',
    ],
    'rules': {
        'linebreak-style': 0,
        'indent': ['error', 4],
    },
};
