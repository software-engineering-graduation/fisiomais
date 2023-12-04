function getId(url) {
    try {
        return url.split('v=')[1].split('&')[0];
    }
    catch {
        return url.split('youtu.be/')[1];
    }
}

export const getYouTubeVideoEmbedUrl = (url) => {
    const videoId = getId(url);
    return 'https://www.youtube.com/embed/' + videoId;
}