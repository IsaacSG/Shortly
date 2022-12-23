import connection from "../DB/pg.js";

export async function urlVerify(url, userId) {
    return connection.query(`
    SELECT *
    FROM urls
    WHERE url = $1
    AND
    userId = $2`,
    [url, userId])
}

export async function newUrl(url, shortUrl, userId) {
    connection.query(`
    INSERT INTO urls (url, "shortUrl", "userId")
    VALUES($1, $2, $3)
    `, [url, shortUrl, userId])
}

export async function selectShortenUrl(shortenId) {
    return connection.query('SELECT id, "shortUrl", url FROM urls WHERE id = $1', [shortenId])
}

export async function selectUrlToAccess(shortUrl) {
    return connection.query('SELECT url FROM urls WHERE "shortUrl" = $1', [shortUrl])
}

export async function updateVisitCount(shortUrl) {
    connection.query('UPDATE urls SET "visitCount" = "visitCount" + 1 WHERE "shortUrl" = $1', [shortUrl])
}

export async function selectUrlAndVerifyUser(userId, shortenId) {
    return connection.query('SELECT * FROM urls WHERE "userId" = $1 AND id = $2', [userId, shortenId])
}

export async function deleteUserUrl(shortenId) {
    connection.query('DELETE FROM urls WHERE id = $1', [shortenId])
}

export async function selectRanking() {
    return connection.query(`
        SELECT u.id, u.name, 
            COUNT(s."userId")::INTEGER AS "linksCount", 
            COALESCE(SUM(s."visitCount")::INTEGER, 0) AS "visitCount"
        FROM users u
        LEFT JOIN urls s ON u.id = s."userId"
        GROUP BY u.id
        ORDER BY "visitCount" DESC, u.id 
        LIMIT 10
    `)
}