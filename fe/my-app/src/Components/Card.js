function Card({video}) {
    let pat = new Date(video.published_at)
    return (
        <a href={`https://www.youtube.com/watch?v=${video.videoID}`} target="_blank">
            <div className="m-3 max-w-sm rounded overflow-hidden shadow-lg">
                <img className="w-full" src={video.thumbnail_urls.default.url} alt="Sunset in the mountains"/>
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{video.title}</div>
                    <p className="text-gray-700 text-base">
                        {video.description}
                    </p>
                    <p className="text-white rounded bg-blue-500 p-2 mt-2">
                        Published At : {pat.toDateString()}
                    </p>
                </div>
            </div>
        </a>
    )
}

export default Card;