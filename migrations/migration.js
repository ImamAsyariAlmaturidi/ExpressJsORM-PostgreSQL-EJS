const pool = require('../config/setup')

const dropTable = async () => {
    try {
        const queryDropTable = `
        DROP TABLE IF EXISTS "Songs", "Labels"
        `
        await pool.query(queryDropTable)
    } catch (error) {
        throw error
    }
}

const migrateLabel = async () => {
    try {
        const queryMigrateLabel = `
        create table "Labels" 
        ("id" SERIAL PRIMARY KEY, "name" VARCHAR (120) NOT NULL, "since" DATE NOT NULL, "city" VARCHAR(20) NOT NULL);
        `
        await pool.query(queryMigrateLabel)
    } catch (error) {
        throw error
    }
}

const migrateSongs = async () => {
    try {
        const queryMigrateSongs = `
        create table "Songs" (
            "id" SERIAL PRIMARY KEY, "title" VARCHAR(100), "bandName" VARCHAR(100),
            "duration" INTEGER, "genre" VARCHAR(50), "createdDate" DATE, "lyric" TEXT,
            "imageUrl" VARCHAR(150), "totalVote" INTEGER, "LabelId" INTEGER,
            FOREIGN KEY ("LabelId") REFERENCES "Labels"("id")
        )
        `
        await pool.query(queryMigrateSongs)
    } catch (error) {
        throw error
    }
}


async function Migrating() {
    try {
        await dropTable()
        console.log('succes drop table')
        await migrateLabel()
        console.log('success create table Labels')
        await migrateSongs()
        console.log('success create table Songs')
    } catch (error) {
        throw error
    }
}

Migrating()