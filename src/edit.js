/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from "@wordpress/i18n";

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps, InspectorControls } from "@wordpress/block-editor";
import { TextControl } from "@wordpress/components";
import { useState } from "@wordpress/element";

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import "./editor.scss";

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes }) {
	const [imageUrls, setImageUrls] = useState(attributes.images);

	return (
		<div {...useBlockProps()}>
			<div
				className="grid_container"
				style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
			>
				{imageUrls.map((url, index) => {
					if (!(url.startsWith("http://") || url.startsWith("https://"))) {
						url = "https://" + url;
					}
					if (index == imageUrls.length - 1 && imageUrls.length % 2 != 0) {
						return (
							<img
								key={imageUrls.length}
								className="gallery_image"
								src={url}
								style={{ gridColumnStart: -3, gridColumnEnd: -1 }}
							/>
						);
					} else {
						return <img key={index} className="gallery_image" src={url} />;
					}
				})}
			</div>

			<InspectorControls>
				<div className="control_container">
					<textarea
					rows="10" 
						onChange={(new_Value) => {
							setImageUrls(new_Value.target.value.split("\n"));
						}}
						value={imageUrls.join("\r\n")}
					></textarea>
					<br />
					<button
						onClick={() => {
							setAttributes({ images: imageUrls });
						}}
					>
						Save
					</button>
				</div>
			</InspectorControls>
		</div>
	);
}
