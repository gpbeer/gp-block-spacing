<?php
/**
 * Enqueue block assets.
 *
 * @package GP\GP_Block_Spacing
 */

namespace GP\GP_Block_Spacing;

defined( 'ABSPATH' ) || exit;

/**
 * Class Block_Assets
 */
class Block_Assets {
	/**
	 * The script handle prefix.
	 *
	 * @var string Plugin slug gp-block-spacing
	 */
	private $handle_prefix;

	/**
	 * Init hooks.
	 */
	public function init() {
		$this->handle_prefix = (string) Info::get_plugin_slug();

		add_action( 'enqueue_block_editor_assets', [ $this, 'block_localization' ] );
		add_action( 'enqueue_block_assets', [ $this, 'enqueue_block_assets' ] );
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 */
	public function enqueue_block_assets() {
		$this->block_assets();
		$this->editor_assets();
	}

	/**
	 * Get asset metadata.
	 *
	 * @param string $handle Asset handle to reference.
	 *
	 * @return array
	 */
	public static function get_asset_metadata( $handle ) {
		$asset_file            = GP_BLOCK_SPACING_DIR . 'build/' . $handle . '.asset.php';
		$asset                 = is_readable( $asset_file ) ? require $asset_file : [];
		$asset['dependencies'] = isset( $asset['dependencies'] ) ? $asset['dependencies'] : [];
		$asset['version']      = isset( $asset['version'] ) ? $asset['version'] : Info::get_plugin_version();

		return $asset;
	}

	/**
	 * Enqueue block assets for use within Gutenberg in frontend.
	 */
	public function block_assets() {
		$asset   = self::get_asset_metadata( 'style-index' );
		$version = $asset['version'];

		// Styles.
		wp_enqueue_style(
			$this->handle_prefix . '-frontend',
			GP_BLOCK_SPACING_URL . 'build/style-index.css',
			[],
			$version
		);
	}

	/**
	 * Enqueue block assets for use within editor.
	 */
	public function editor_assets() {
		if ( ! is_admin() ) {
			return;
		}

		// Styles.
		$asset   = self::get_asset_metadata( 'index' );
		$version = $asset['version'];

		wp_enqueue_style(
			$this->handle_prefix . '-editor',
			GP_BLOCK_SPACING_URL . 'build/index.css',
			[],
			$version
		);

		// Scripts.
		$dependencies = $asset['dependencies'];

		wp_enqueue_script(
			$this->handle_prefix . '-editor',
			GP_BLOCK_SPACING_URL . 'build/index.js',
			array_merge( $dependencies, [ 'wp-api', 'wp-compose' ] ),
			$version,
			false
		);
	}

	/**
	 * Enqueue localization data for our blocks.
	 */
	public function block_localization() {
		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( $this->handle_prefix );
		}
	}
}
