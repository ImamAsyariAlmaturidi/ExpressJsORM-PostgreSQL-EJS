const fs = require('fs').promises
const pool = require('../config/setup')
const seedingLabel = async () => {
    try {
        const labelsData = JSON.parse(await fs.readFile('./data/labels.json', 'utf-8'))
        const label = labelsData.map((el) => {
            const { name, since, city} = el
            return `('${name}', '${since}', '${city}')`
    })

    const querySeederLabel = `
        INSERT INTO "Labels" ("name", "since", "city")
        VALUES ${label}
    `

    await pool.query(querySeederLabel)
    } catch (error) {
        throw error
    }
}

const seedingSongs = async () => {
    try {
        const songsData = JSON.parse(await fs.readFile('./data/songs.json', 'utf-8'))
        const song = songsData.map((el) => {
            const { title, bandName, duration, genre, createdDate, lyric, imageUrl, totalVote, LabelId } = el 
            return `('${title}', '${bandName}', '${duration}', '${genre}', '${createdDate}', '${lyric}', '${imageUrl}', '${totalVote}', '${LabelId}')`
        })

        const querySeederSong = `
            INSERT INTO "Songs" ("title", "bandName", "duration", "genre", "createdDate", "lyric", "imageUrl", "totalVote", "LabelId")
            VALUES ${song}
        `

        await pool.query(querySeederSong)
    } catch (error) {
        throw error
    }
}

const seeding = async () => {
    try {
        await seedingLabel()
        console.log('success seeding labels table')
        await seedingSongs()
        console.log('success seeding songs table')
    } catch (error) {
        throw error
    }
 }

 seeding()