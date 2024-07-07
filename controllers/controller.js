const Model = require('../models/model')
class Controller {
    //show tables labels controller
    static async showLabels (req, res) {
        try {
            const label = await Model.showDataLabels()
            res.render('Labels', { label })
        } catch (error) {
            throw error
        }
    }

    //show tables labels detail controller
    static async showLabelsDetails (req, res) {
        try {
            const labelDetail = await Model.showDataLabelsDetails()
            res.render('DetailLabels', { labelDetail })
        } catch (error) {
            throw error
        }
    }

    //show tables song controller
    static async showSong(req, res) {
        const { title } = req.query;
        try {
            let song;
            let errors = [];

            if (title) {
                song = await Model.searchSongByName(title);
                if (song.length === 0) {
                    errors.push('Song Not Found');
                    song = await Model.showDataSong();
                }
            } else {
                song = await Model.showDataSong();
            }
            res.render('Songs', { song, errors });
        } catch (error) {
            throw error;
        }
    }

    //show song by id controller
    static async searchSongByID (req, res) {
        const { id } = req.params
        try {
            const songDetail = await Model.showDataSongsDetails(id)
            res.render('DetailsSongs', { songDetail })
        } catch (error) {
            throw error
        }
    }

    //show form song controller
    static async showFormSong(req, res) {
        try {
            const formSong = await Model.showFormSong()
            res.render('AddSong', { formSong, errors : [] })
        } catch (error) {
            throw error
        }
    }

    //add song controller
    static async addSong (req, res) {
        const {title, bandName, duration, genre, createdDate, lyric, imageUrl, totalVote, LabelId} = req.body
        const errors = []
        try {
            if (!title || title.length > 100) {
                errors.push("Title maximum character is 100");
            }
    
            if (!duration || +duration < 60) {
                errors.push("Minimum duration is 60 seconds");
            }
    
            if (!imageUrl || imageUrl.length > 50) {
                errors.push("Image URL maximum character is 50");
            }
    
            if (!lyric || lyric.length < 10) {
                errors.push("Minimum words in lyric is 10");
            }
            if (!createdDate || new Date(createdDate) > new Date()) {
                errors.push("Maximum created date is today");
            } 
            if (errors.length > 0) {
                const formSong = await Model.showFormSong();
                res.render('AddSong', { formSong, errors});
            } else{
                await Model.addDataSong(title, bandName, +duration, genre, createdDate, lyric, imageUrl, totalVote, LabelId);
                res.redirect('/Songs');
            }
        } catch (error) {
            throw error
        }
    }

    //show form edit song contoller
    static async showFormSongEditById (req, res) {
        const { id } = req.params
        try {
            const formSong = await Model.showFormSong()
            const formEditSong = await Model.showDataSongEditById(id)
            res.render('FormEditSong', { formEditSong, formSong })
        } catch (error) {
            throw error
        }
    }

    //edit song controller
    static async editSong(req, res) {
        const {title, bandName, duration, genre, createdDate, lyric, imageUrl, totalVote, LabelId} = req.body
        const { id } = req.params
        try {
            const editSongFromDatabase = await Model.editDataSong(id, title, bandName, duration, genre, createdDate, lyric, imageUrl, totalVote, LabelId)
            res.redirect('/Songs')
        } catch (error) {
            throw error
        }
    }

    //delete song controller
    static async deleteSong (req, res) {
        const { id } = req.params
        try {
            const deleteSongFromDatabase = await Model.deleteDataSong(id)
            res.redirect('/Songs')
        } catch (error) {
            throw error
        }
    }

    // add a vote controller
    static async addVote (req, res){
        const { id } = req.params
        try {
            await Model.addVote(id)
            res.redirect(`/songs/${id}`)
        } catch (error) {
            throw error
        }
    }
}

module.exports = Controller