<?php
/**
 * Run on plugin install.
 *
 * @package GP\GP_Block_Spacing
 */

namespace GP\GP_Block_Spacing;

defined( 'ABSPATH' ) || exit;

/**
 * Fired during plugin activation
 */
class Activator {
	/**
	 * Activation
	 */
	public static function activate() {
		$requires_wp = '5.5';

		if ( ! is_wp_version_compatible( $requires_wp ) ) {
			$error_message = sprintf(
			/* translators: 1: Current WordPress version, 2: Version required by the uploaded theme. */
				__( 'Your WordPress version is %1$s, however the uploaded theme requires %2$s.' ),
				$GLOBALS['wp_version'],
				$requires_wp
			);

			wp_die(
				'<h2>' . $error_message . '</h2>', // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
				426
			);
		}
	}

}
