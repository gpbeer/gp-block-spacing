# GP Block Spacing

Add custom spacing components to gutenberg blocks.

## Requirements
* PHP 7.2 or higher
* Wordpress version 5 or higher
* Composer [Composer](https://getcomposer.org/doc/00-intro.md#downloading-the-composer-executable).
* NodeJs with npm [Node.js](https://nodejs.org/).

## Development
All the required npm and composer packages will be automatically installed after the command :
* `npm install`

## PHP Code quality
* `composer lint` to run coding standards checks.

### Front Installation
To add the necessary packages run `npm install`. Here are the other list of npm scripts for testing.

* `npm run build` : Transform your code to minified version optimized for production with best performance.
* `npm run check-engines` : Check npm compatibility.
* `npm run check-licenses` : Validate that all dependencies of a project are compatible with the project’s own license.
* `npm run lint:css` : Enforce coding standards for CSS files.
* `npm run lint:css-fix` : Automatically fix several lint-css errors.
* `npm run lint:js` : Enforce coding standards for Javascript files.
* `npm run lint:js-fix` : Automatically fix several lint-js errors.
* `npm run lint:pkg-json` : Lint for packaje.json.
* `npm run format:js` : Prettier js files.
* `npm run makepot` : Generate language translations for PHP and JS files.
* `npm run start` : Start compiling javascript and stylesheets according to the configurations. Automatically rebuild if you make changes to the code and you will see errors on console, if there are any.

### Install package using **`COMPOSER`**
Add to your `composer.json`
```
"repositories": [
   ...
    {
      "type": "vcs",
      "url": "https://github.com/german-pichardo/gp-block-spacing.git"
    }
],
```

Install directly using the command line
```bash
composer require gp/gp-block-spacing
```

### Development wordpress coding helper
https://make.wordpress.org/core/handbook/best-practices/coding-standards/

## Add Additional blocks to use custom padding

```JavaScript
/**
 * Add custom padding to other blocks
 * @todo Mobile version do not apply to dynamic blocks
 * @param {Array} blocks Available blocks.
 *
 * @return {Array} Filtered blocks array.
 */
function filterBlocksPadding( blocks ) {

	const addBlocks = [
                          			'my/my-block-1',
                          			'my/my-block-2',
                          		];

    blocks = [ ...blocks, ...addBlocks ];

    return blocks;

}
wp.hooks.addFilter('gp-block-spacing.allowed-blocks-padding', 'my/block-padding', filterBlocksPadding);
```

## Add Additional blocks to use custom margin

```JavaScript
/**
 * Add custom margin to other blocks
 * @todo Mobile version do not apply to dynamic blocks
 * @param {Array} blocks Available blocks.
 *
 * @return {Array} Filtered blocks array.
 */
function filterBlocksMargin( blocks ) {

	const addBlocks = [
                          			'my/my-block-1',
                          			'my/my-block-2',
                          		];

    blocks = [ ...blocks, ...addBlocks ];

    return blocks;

}
wp.hooks.addFilter('gp-block-spacing.allowed-blocks-margin', 'my/block-margin', filterBlocksMargin);
```
