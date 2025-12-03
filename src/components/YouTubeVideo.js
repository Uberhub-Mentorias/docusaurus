import PropTypes from "prop-types";

export default function YouTubeVideo({
	id,
	title = "Vídeo",
	width = "100%",
	maxWidth = "800px",
	height = "450px",
}) {
	return (
		<div style={{ margin: "20px 0" }}>
			<iframe
				width={width}
				height={height}
				src={`https://www.youtube.com/embed/${id}`}
				title={title}
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
				allowFullScreen
				style={{
					maxWidth: maxWidth,
					display: "block",
					margin: "0 auto",
					border: "none",
					borderRadius: "8px",
				}}
			/>
			<p style={{ textAlign: "center", fontSize: "0.9em", color: "#666" }}>{title}</p>
		</div>
	);
}

YouTubeVideo.propTypes = {
	id: PropTypes.string.isRequired,
	title: PropTypes.string,
	width: PropTypes.string,
	maxWidth: PropTypes.string,
	height: PropTypes.string,
};
