/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from "@wordpress/block-editor";

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save({ attributes }) {
	return (
		<div
			className="grid_container"
			style={{ display: "grid", gridTemplateColumns: "50% 50%" }}
		>
			{attributes.images.map((url, index) => {
				if (!(url.startsWith("http://") || url.startsWith("https://"))) {
					url = "https://" + url;
				}
				if (
					index == attributes.images.length - 1 &&
					attributes.images.length % 2 != 0
				) {
					return (
						<img
							key={attributes.images.length}
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
	);
}
