 module.exports = {
    "extends": "airbnb",

    "overrides": [
        {
          "files": ["src/**/*.js", "src/*.js"],
          "rules": {
            "camelcase": "off",
            "prefer-const": "off",
            "no-underscore-dangle": "off",
            "no-plusplus": "off",
            "func-names": "off",
            "max-len": "off",
            "class-methods-use-this": "off",
            "no-restricted-syntax": "off",
            "no-alert": "off",
            "no-param-reassign": "off",
          }
        }
      ]
};