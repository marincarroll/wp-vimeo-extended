import createHigherOrderComponent from '@wordpress/compose';
import InspectorControls from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import addFilter from '@wordpress/hooks';
import __ from '@wordpress/i18n';

import './style.scss';

/**
 * Register custom attributes for core/embed
 */
const customEmbedAttributes = (settings) => {
	if (
		typeof settings.attributes !== 'undefined' &&
		settings.name == 'core/embed'
	) {
		settings.attributes = Object.assign(settings.attributes, {
			background: {
				type: 'boolean',
				default: false,
			},
			loop: {
				type: 'boolean',
				default: false,
			},
			scrollTrigger: {
				type: 'boolean',
				default: false,
			},
			scrollTriggerReverse: {
				type: 'boolean',
				default: false,
			},
		});
	}

	return settings;
};

addFilter(
	'blocks.registerBlockType',
	'mcve/custom-embed-attributes',
	customEmbedAttributes
);

/**
 * Add custom attribute controls to editor, if embed type is Vimeo
 */
const customVimeoControls = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		if (
			props.name != 'core/embed' ||
			props.attributes.providerNameSlug != 'vimeo'
		) {
			return <BlockEdit {...props} />;
		}

		const { setAttributes } = props;
		const { background, loop, scrollTrigger, scrollTriggerReverse } =
			props.attributes;

		return (
			<>
				<BlockEdit {...props} />
				<InspectorControls>
					<PanelBody
						title={__('Playback Controls', 'mcve')}
						initialOpen
					>
						<ToggleControl
							label={__('Play as Background?', 'mcve')}
							help={
								background
									? __(
											'Video will autoplay, audio muted, without controls',
											'mcve'
									  )
									: __('Video will behave normally', 'mcve')
							}
							checked={background}
							onChange={() =>
								setAttributes({ background: !background })
							}
						/>
						<ToggleControl
							label={__('Loop Video?', 'mcve')}
							help={
								loop
									? __('Video will loop', 'mcve')
									: __('Video will play once', 'mcve')
							}
							checked={loop}
							onChange={() => setAttributes({ loop: !loop })}
						/>
						{background && (
							<>
								<ToggleControl
									label={__('Play on Scroll', 'mcve')}
									help={__(
										'Video will play when scrolled over',
										'mcve'
									)}
									checked={scrollTrigger}
									onChange={() =>
										setAttributes({
											scrollTrigger: !scrollTrigger,
										})
									}
								/>
								{!loop && scrollTrigger && (
									<ToggleControl
										label={__(
											'Replay on Scroll Trigger',
											'mcve'
										)}
										help={
											scrollTriggerReverse
												? __(
														'Video will replay if scrolled over again',
														'mcve'
												  )
												: __(
														'Video will will only play once, and only if first scrolled over from above',
														'mcve'
												  )
										}
										checked={scrollTriggerReverse}
										onChange={() =>
											setAttributes({
												scrollTriggerReverse:
													!scrollTriggerReverse,
											})
										}
									/>
								)}
							</>
						)}
					</PanelBody>
				</InspectorControls>
			</>
		);
	};
}, 'customVimeoControls');

addFilter(
	'editor.BlockEdit',
	'mcve/custom-vimeo-controls',
	customVimeoControls
);
