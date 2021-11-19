<?php
/** 
 * Plugin Name: Vimeo Extended
 * Plugin URI: https://github.com/marincarroll/wp-vimeo-extended
 * Description: Extend the core Vimeo block to include editor controls for embed parameters and playback on scroll.
 * Version: 1.0.0
 * Author: Marin Carroll
 * Author URI: https://github.com/marincarroll
 * License: GPL v2 or later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: mcve
 */

defined( 'ABSPATH' ) or die( 'No, thank you.' );

define( 'MCVE_URL', plugin_dir_url( __FILE__ ) );
define( 'MCVE_PATH', plugin_dir_path( __FILE__ ) );
define( 'MCVE_ASSET', include( MCVE_PATH . 'build/index.asset.php' ) );

require MCVE_PATH . '/inc/filter-block.php';
require MCVE_PATH . '/inc/enqueue.php';
