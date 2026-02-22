-- name: ListAllEvents :many
SELECT e.id, e.course_id, e.date, e.tee_time, e.open_spots, e.number_of_holes,
       e.private, e.host_id, c.name AS course_name, p.name AS host_name
FROM events e
JOIN courses c ON c.id = e.course_id
JOIN players p ON p.id = e.host_id
ORDER BY e.id;

-- name: ListPublicEvents :many
SELECT e.id, e.course_id, e.date, e.tee_time, e.open_spots, e.number_of_holes,
       e.private, e.host_id, c.name AS course_name, p.name AS host_name
FROM events e
JOIN courses c ON c.id = e.course_id
JOIN players p ON p.id = e.host_id
WHERE e.private = false
ORDER BY e.id;

-- name: ListEventsByPlayerID :many
SELECT e.id, e.course_id, e.date, e.tee_time, e.open_spots, e.number_of_holes,
       e.private, e.host_id, c.name AS course_name, p.name AS host_name
FROM events e
JOIN courses c ON c.id = e.course_id
JOIN players p ON p.id = e.host_id
JOIN player_events pe ON pe.event_id = e.id
WHERE pe.player_id = $1
ORDER BY e.id;

-- name: GetEventByID :one
SELECT e.id, e.course_id, e.date, e.tee_time, e.open_spots, e.number_of_holes,
       e.private, e.host_id, c.name AS course_name, p.name AS host_name
FROM events e
JOIN courses c ON c.id = e.course_id
JOIN players p ON p.id = e.host_id
WHERE e.id = $1;

-- name: CreateEvent :one
INSERT INTO events (course_id, date, tee_time, open_spots, number_of_holes, private, host_id, created_at, updated_at)
VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
RETURNING id, course_id, date, tee_time, open_spots, number_of_holes, private, host_id;

-- name: DeleteEvent :exec
DELETE FROM events WHERE id = $1;
