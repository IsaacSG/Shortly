import connection from "../DB/pg";

export async function urlVerify(url, userId) {
    connection.query(`
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