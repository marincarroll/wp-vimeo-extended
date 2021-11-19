<?php
/** 
 * Filter Vimeo block markup to add embed parameters and/or ScrollTrigger attributes
 */
function mcve_vimeo_block( $block_content, $block ) {
	$attrs = $block['attrs'];
	if ( $block['blockName'] == 'core/embed' && $attrs['providerNameSlug'] == 'vimeo' ) {
		$block_content = mcve_vimeo_embed_html( $block_content, $block['attrs'] );
	}

	return $block_content;
}
add_action( 'render_block', 'mcve_vimeo_block', 10, 2 );

function mcve_vimeo_embed_html( $video, $atts ) {
	//Note: Boolean parameters must be numbers
	$params = array(
		'byline' => 0,
		'title'  => 0,
		'loop'   => $atts['loop'] ? 1 : 0
	);

	$fig_atts = '';
	if( $atts['background'] ) {
		$bg_params = array(
			'controls'    => 0,
			'muted'       => 1,
			'playsinline' => 1,
			'autoplay'    => !$atts['scrollTrigger'] ? 1 : null,
		);
		$params = array_merge( $params, $bg_params );
		$fig_atts .= ' data-background';

		if ( $atts['scrollTrigger'] ) {
			$fig_atts .= ' data-st';
			$fig_atts .= $atts['scrollTriggerReverse'] ? ' data-st-reverse' : '';
		}
	}

	preg_match('/src="(.+?)"/', $video, $matches);
	$src = $matches[1];
	$new_src = add_query_arg( $params, $src );

	$video = str_replace( $src, $new_src, $video );
	$video = str_replace('<figure', '<figure' . $fig_atts, $video);	
	
	return $video;
}

	