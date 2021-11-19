<?php
/** 
 * Enqueue in editor
 */
function mcve_enqueue_block_editor_assets() {
	wp_enqueue_script(
		'mcve-block', 
		MCVE_URL . 'build/index.js', 
		MCVE_ASSET['dependencies'],
		MCVE_ASSET['version']
	);
}
add_action('enqueue_block_editor_assets', 'mcve_enqueue_block_editor_assets');

/** 
 * Enqueue on front-end
 */
function mcve_enqueue_scripts() {
	if ( has_block('core/embed') ) {  	
		global $post;
        $content = $post->post_content;

		if( strpos($content, '"providerNameSlug":"vimeo"') ) {
			wp_enqueue_style(
				'mcve-style',
				MCVE_URL . 'build/style-index.css',
				[],
				MCVE_ASSET['version']
			);

			wp_enqueue_script(
				'mcve-vimeo-sdk',
				'https://player.vimeo.com/api/player.js'
			);

			$path = 'assets/js/custom-scripts.js';
			wp_enqueue_script(
				'mcve-vimeo-custom',
				MCVE_URL . $path,
				[ 'mcve-vimeo-sdk' ],
				filemtime( MCVE_PATH . $path ),
				true
			);
		}
	}
}
add_action('wp_enqueue_scripts', 'mcve_enqueue_scripts');