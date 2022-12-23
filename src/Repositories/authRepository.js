import connection from "../DB/pg.js";

export async function emailVerify(email) {
    connection.query(`
    SELECT * 
    FROM users 
    WHERE email = $1`
    , [email])

}

export async function signUp(name, email, password) {
    connection.query(`INSERT INTO users (name, email, password) 
    VALUES ($1, $2, $3)`
    , [name, email, password])
}

export async function userUrls(id) {
    connection.query(`
    SELECT u.id, u.name, COALESCE(SUM(s."visitCount")::INTEGER, 0) AS "visitCount", 
            COALESCE(
                JSON_AGG(
                    JSON_BUILD_OBJECT(
                        'id', s.id,
                        'shortUrl', s."shortUrl",
                        'url', s.url,
                        'visitCount', s."visitCount"
                    ) ORDER BY s.id
                ) 
                FILTER (WHERE s.id IS NOT NULL), 
            '[]') as "shortenedUrls"
        FROM users u
        LEFT JOIN urls s ON s."userId" = u.id
        WHERE u.id = $1
        GROUP BY u.id
    `, [id])
}