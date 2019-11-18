// Configuration for StyleLint
// See: https://stylelint.io/user-guide/configuration/

module.exports = {
	extends: [
		'@wemake-services/stylelint-config-scss',
		'stylelint-config-css-modules',
		'stylelint-a11y/recommended',
	],
	plugins: ['stylelint-no-unsupported-browser-features', 'stylelint-a11y'],

	rules: {
		// ignore special `var-` css variables for `:export`
		'property-no-unknown': [
			true,
			{
				ignoreProperties: ['/^var-/'],
			},
		],

		// custom plugins to work with
		'plugin/no-unsupported-browser-features': [
			true,
			{
				severity: 'warning',
				ignore: ['flexbox'],
			},
		],

		// a11y
		'a11y/content-property-no-static-value': true,

		'plugin/stylelint-no-indistinguishable-colors': null,
		'csstools/use-nesting': null,
		'color-named': null,
		'a11y/selector-pseudo-class-focus': null,
		'a11y/media-prefers-reduced-motion': null,
		'plugin/no-low-performance-animation-properties': null,
		'no-eol-whitespace': null,
		'no-duplicate-selectors': null,
		'color-format/format': null,
		'scale-unlimited/declaration-strict-value': null,
		'font-weight-notation': null,
		'declaration-block-no-duplicate-properties': null,
	},
};
