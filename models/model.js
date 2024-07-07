const pool = require("../config/setup");
const Factory = require("./class");
class Model {
  //show labels data model
  static async showDataLabels() {
    try {
      const queryShowDataLabels = `
            SELECT * FROM "Labels"
            ORDER BY "name" ASC
            `;
      const { rows } = await pool.query(queryShowDataLabels);
      const result = rows.map((el) => {
        const labelInstance = Factory.createLabel(
          el.id,
          el.name,
          el.since,
          el.city
        );
        return labelInstance;
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  //show data labels detail model
  static async showDataLabelsDetails() {
    try {
      const queryShowDataDetailLabels = `
      SELECT 
    l."id", 
    l."name", 
    l."since", 
    l."city", 
    COALESCE(SUM(s."totalVote"), 0) AS totalVote, 
    COALESCE(CAST(AVG(s."duration") AS FLOAT), 0) AS averageDuration,
    COALESCE(MIN(s."duration"), 0) AS minDuration,
    COALESCE(MAX(s."duration"), 0) AS maxDuration
    FROM "Labels" l 
    LEFT JOIN "Songs" s ON l."id" = s."LabelId"
    GROUP BY l."id", l."name", l."since", l."city"
    ORDER BY "id" ASC
            `;
      const { rows } = await pool.query(queryShowDataDetailLabels);
      const result = rows.map((el) => {
        const labelDetailInstance = Factory.createDetailLabel(
          el.id,
          el.name,
          el.since,
          el.city,
          el.averageduration,
          el.minduration,
          el.maxduration
        );
        return labelDetailInstance;
      });
      return result;
    } catch (error) {
      throw error;
    }
  }

  //show data song model
  static async showDataSong() {
    try {
        const queryShowDataSongs = `
        SELECT * FROM "Songs" 
        ORDER BY "totalVote" ASC
              `;
        const { rows } = await pool.query(queryShowDataSongs);
        const result = rows.map((el) => {
            const songInstance = Factory.createSong(
                el.id,
                el.title,
                el.bandName,
                el.duration,
                el.genre,
                el.totalVote,
            );
          return songInstance;
        });
        return result;
      } catch (error) {
        throw error;
      }
  }

  //show data song detail model
  static async showDataSongsDetails(id) {
    try {
        const queryShowDataSongsDetails = `
        SELECT s.*, l."name" as "LabelName"
        FROM "Songs" s
        JOIN "Labels" l ON l."id" = s."LabelId"
        WHERE s."id" = $1
              `;
        const { rows } = await pool.query(queryShowDataSongsDetails, [id]);
        const result = rows.map((el) => {
            const songDetailInstance = Factory.createDetailSong(
                el.id,
                el.title,
                el.bandName,
                el.duration,
                el.genre,
                el.totalVote,
                el.createdDate,
                el.lyric,
                el.imageUrl,
                el.LabelId,
                el.LabelName
            );
          return songDetailInstance;
        });
        return result;
      } catch (error) {
        throw error;
      }
  }

  //show form data song model
  static async showFormSong() {
    try {
        const queryShowDataSongsDetails = `
        SELECT l.id, l."name" as "LabelName" FROM "Labels" l 
              `;
        const { rows } = await pool.query(queryShowDataSongsDetails);
        return rows;
      } catch (error) {
        throw error;
      }
  }

  //add data song to database model
  static async addDataSong(title, bandName, duration, genre, createdDate, lyric, imageUrl, totalVote, LabelId) {
    try {

        const values = [title, bandName, duration, genre, createdDate, lyric, imageUrl, totalVote = 0, LabelId]
        const queryAddSong = `
        INSERT INTO "Songs" ("title", "bandName", "duration", "genre", "createdDate", "lyric", "imageUrl", "totalVote", "LabelId")
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        `
        await pool.query(queryAddSong, values);
    } catch (error) {
        throw error
    }
  }

  // show form edit song model
  static async showDataSongEditById(id) {
    try {
        const queryShowDataSongsDetails = `
        SELECT s.*, l."name" as "LabelName"
        FROM "Songs" s
        JOIN "Labels" l ON l."id" = s."LabelId"
        WHERE s."id" = $1
              `;
        const { rows } = await pool.query(queryShowDataSongsDetails, [id]);
        const result = rows.map((el) => {
            const songDetailInstance = Factory.createDetailsSongForm(
                el.id,
                el.title,
                el.bandName,
                el.duration,
                el.genre,
                el.totalVote,
                el.createdDate,
                el.lyric,
                el.imageUrl,
                el.LabelId,
                el.LabelName
            );
          return songDetailInstance;
        });
        return result;
      } catch (error) {
        throw error;
      }
  }

  //edit data song to database model
  static async editDataSong(songId, title, bandName, duration, genre, createdDate, lyric, imageUrl, totalVote, LabelId) {
    try {
        const songData = await this.showDataSongEditById(songId);
        if (!songData || songData.length === 0) {
            throw new Error('Song not found');
        }
        const currentTotalVote = songData[0].totalVote;
        const values = [title, bandName, duration, genre, createdDate, lyric, imageUrl, currentTotalVote, LabelId, songId];

        const queryEditSong = `
            UPDATE "Songs"
            SET "title" = $1,
                "bandName" = $2,
                "duration" = $3,
                "genre" = $4,
                "createdDate" = $5,
                "lyric" = $6,
                "imageUrl" = $7,
                "totalVote" = $8,
                "LabelId" = $9
            WHERE id = $10;
        `;

        await pool.query(queryEditSong, values);
    } catch (error) {
        throw error;
    }
}

//delete data song to database model
  static async deleteDataSong(id) {
    try {
        const values = [id]
        const queryDeleteSong = `
        DELETE FROM "Songs" 
        WHERE "id" = $1
        `
        await pool.query(queryDeleteSong, values)
    } catch (error) {
        throw error
    }
  }

  //add data song to database model
  static async addVote(id) {
    try {
      const queryAddVote = `
      UPDATE "Songs"
      SET "totalVote" = "totalVote" + 1
      where "id" = ${id}
      `
      await pool.query(queryAddVote)
    } catch (error) {
      throw error
    }
  }

  //search data song from song database by name
  static async searchSongByName(name) {
    try {
        const values = [`%${name}%`];
        const querySearchByName = `
            SELECT s.*, l."name" as "LabelName"
            FROM "Songs" s
            JOIN "Labels" l ON l."id" = s."LabelId"
            WHERE s."title" ILIKE $1
        `;
        const { rows } = await pool.query(querySearchByName, values);
        const result = rows.map((el) => {
            const songDetailInstance = Factory.createDetailSong(
                el.id,
                el.title,
                el.bandName,
                el.duration,
                el.genre,
                el.totalVote,
                el.createdDate,
                el.lyric,
                el.imageUrl,
                el.LabelId,
                el.LabelName
            );
            return songDetailInstance;
        });
        return result;
    } catch (error) {
        throw error;
    }
}

}



module.exports = Model;


