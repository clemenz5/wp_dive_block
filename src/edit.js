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
	console.log(imageUrls.join("\r\n"));

	return (
		<div {...useBlockProps()}>
		<div  className="grid_container" style={{display: "grid", gridTemplateColumns: "50% 50%"}}>
				{imageUrls.map((url) => {
					return <img className="gallery_image" src={url} />;
				})}
			</div>
			
				<InspectorControls>
					<div className="control_container">
						<textarea
							onChange={(new_Value) => {
								console.log();
								setImageUrls(new_Value.target.value.trim().split("\n"));
							}}
							value={imageUrls.join("\r\n")}
						></textarea>
						<br />
						<button
							onClick={() => {
								setAttributes({images: imageUrls});
							}}
						>
							Save
						</button>
					</div>
				</InspectorControls>
		</div>
	);
}
