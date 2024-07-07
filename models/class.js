class Label {
    constructor(id, name, since, city) {
        this.id = id
        this.name = name
        this.since = since
        this.city = city
    }

    //getter formated date with ISO indonesia
    get formattedDate () {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return this.since.toLocaleDateString('id-ID', options);
    }
}


class LabelDetailDuration extends Label{
    constructor(id, name, since, city, averageDuration, minDuration, maxDuration) {
        super(id, name, since, city)
        this.averageDuration = averageDuration
        this.minDuration = minDuration
        this.maxDuration = maxDuration
    }
}

class Song {
    constructor(id, title, bandName, duration, genre, totalVote) {
        this.id = id
        this.title = title
        this.bandName = bandName
        this.duration = duration
        this.genre = genre 
        this.totalVote = totalVote
    }
}

class SongDetail extends Song {
    constructor(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, LabelName){
        super(id, title, bandName, duration, genre, totalVote)
        this.createdDate = createdDate
        this.lyric = lyric
        this.imageUrl = imageUrl
        this.LabelId = LabelId
        this.LabelName = LabelName
    }

    // getter formated date to YYYMMDD
    get formattedDateYYMMDD() {
        const year = this.createdDate.getFullYear();
        let month = this.createdDate.getMonth() + 1;
        let day = this.createdDate.getDate();

        if (month < 10) {
            month = `0${month}`;
        }
        if (day < 10) {
            day = `0${day}`;
        }

        return `${year}-${month}-${day}`;
    }

    get formattedDate () {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return this.createdDate.toLocaleDateString('id-ID', options);
    }
}


class Factory {
    static createLabel(id, name, since, city) {
        const date = new Label(id, name, since, city)
        const formattedSince = date.formattedDate
        return new Label(id, name, formattedSince, city)
    }

    static createDetailLabel(id, name, since, city, averageDuration, minDuration, maxDuration) {
        const date = new Label(id, name, since, city)
        const formattedSince = date.formattedDate
        return new LabelDetailDuration(id, name, formattedSince, city, averageDuration, minDuration, maxDuration)
    }

    static createSong(id, title, bandName, duration, genre, totalVote) {
        return new Song(id, title, bandName, duration, genre, totalVote)
    }

    static createDetailSong(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, LabelName) {
        //instanciate for get formatted date
        const date = new SongDetail(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, LabelName)
        const formattedSince = date.formattedDate

        return new SongDetail(id, title, bandName, duration, genre, totalVote, formattedSince, lyric, imageUrl, LabelId, LabelName)
    }

    static createDetailsSongForm(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, LabelName){
        //instanciate for get formatted to date YYMMDD
        const date = new SongDetail(id, title, bandName, duration, genre, totalVote, createdDate, lyric, imageUrl, LabelId, LabelName)
        const formattedSince = date.formattedDateYYMMDD
        
        return new SongDetail(id, title, bandName, duration, genre, totalVote, formattedSince, lyric, imageUrl, LabelId, LabelName)
    }
}

module.exports = Factory