<?php
/**
 * Plugin Name:     GP Block Spacing
 * Description:     Add custom spacing components to gutenberg blocks.
 * Version:         1.0.0
 * Author:          German PICHARDO
 * Text Domain:     gp-block-spacing
 * Domain Path:     /languages
 * Tested up to:    5.5.1
 *
 * @link            https://github.com/german-pichardo/gp-block-spacing
 * @package         GP\GP_Block_Spacing
 */

namespace GP\GP_Block_Spacing;

defined( 'ABSPATH' ) || exit;

define( 'GP_BLOCK_SPACING_FILE', __FILE__ );
define( 'GP_BLOCK_SPACING_DIR', plugin_dir_path( GP_BLOCK_SPACING_FILE ) );
define( 'GP_BLOCK_SPACING_URL', plugin_dir_URL( GP_BLOCK_SPACING_FILE ) );
define( 'GP_BLOCK_SPACING_URL_SHARED', GP_BLOCK_SPACING_URL . 'src/shared' );

// Plugin Global information.
require_once GP_BLOCK_SPACING_DIR . 'includes/class-info.php';

/**
 * The code that runs during plugin activation.
 */
function run_activation() {
	include_once GP_BLOCK_SPACING_DIR . 'includes/class-activator.php';
	Activator::activate();
}

register_activation_hook( __FILE__, __NAMESPACE__ . '\run_activation' );

/**
 * Begins execution of the plugin.
 */
function run_init() {
	include_once GP_BLOCK_SPACING_DIR . 'includes/class-init.php';
	new Init();
}

run_init();
