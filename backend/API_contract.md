## API Endpoints
Base URL
`https://fore-finder-be.herokuapp.com`

Request Parameters:

| HTTP Verb | Path | Use Case |
| --- | --- | --- |
| GET | /api/v1/courses | returns all courses available for user to select from |
| GET | /api/v1/events | returns all available events, including ability to limit to events open to community, use to populate host view |
| POST | /api/v1/event | creates a new tee-time (event) |
| DELETE | /api/v1/event | destroys an existing tee-time (event) |
| GET | /api/v1/event/{event_id} | fetch details for a specific tee time (includes details on invites accepted) |
| GET  | /api/v1/players | fetch details for all players |
| POST | /api/v1/players | create new player |
| GET | /api/v1/players/{player_id}/events | fetch all events for a single player |
| PATCH | /api/v1/player-event | accept or decline invitation |
| POST | /api/v1/friendship | add a friendship |
| DELETE | /api/v1/friendship | remove a friendship |
| POST | /api/v1/sessions | user login |



### GET All courses detail
##### Resource URL
```
GET https://fore-finder-be.herokuapp.com/api/v1/courses
```
Example Response:    
```json
{
  "data": [
    {
        "id": "1",
        "type": "course",
        "attributes": {
            "name": "Green Valley Ranch Golf Club",
            "street": "4900 Himalaya Road",
            "city": "Denver",
            "state": "Colorado",
            "zip_code": "80249",
            "phone": "303.371.3131",
            "cost": "80"
          }
    },
    {
        "id": "2",
        "type": "course",
        "attributes": {
            "name": "City Park Golf Course",
            "street": "3181 E. 23rd Avenue",
            "city": "Denver",
            "state": "Colorado",
            "zip_code": "80205",
            "phone": "720.865.3410",
            "cost": "65"
        }
    },
    {
          "id": "3",
          "type": "course",
          "attributes": {
              "name": "Riverdale Golf Club",
              "street": "13300 Riverdale Road",
              "city": "Brighton",
              "state": "Colorado",
              "zip_code": "80602",
              "phone": "303.659.4700",
              "cost": "74"
          }
    },
    {
          "id": "4",
          "type": "course",
          "attributes": {
              "name": "Willis Case Golf Course",
              "street": "4999 Vrain Street",
              "city": "Denver",
              "state": "Colorado",
              "zip_code": "80212",
              "phone": "720.865.0700",
              "cost": "58"
          }
    }
  ]
}
```
### GET All Events
##### Resource URL
```
GET https://fore-finder-be.herokuapp.com/api/v1/events
```
Optional - add query parameter to only show public events
```
GET https://fore-finder-be.herokuapp.com/api/v1/events?private=false
```

Example Response:    
```json
{
    "data": [
        {
            "id": "1",
            "type": "event",
            "attributes": {
                "course_name": "Green Valley Ranch Golf Club",
                "date": "08-01-2021",
                "tee_time": "13:20",
                "open_spots": 3,
                "number_of_holes": "9",
                "private": true,
                "host_name": "Amy",
                "host_id": 1,
                "accepted": [
                    1
                ],
                "declined": [],
                "pending": [
                    2,
                    3
                ],
                "closed": [],
                "remaining_spots": 2
            }
        },
        {
            "id": "2",
            "type": "event",
            "attributes": {
                "course_name": "City Park Golf Course",
                "date": "08-05-2021",
                "tee_time": "14:20",
                "open_spots": 4,
                "number_of_holes": "18",
                "private": true,
                "host_name": "Andrew",
                "host_id": 2,
                "accepted": [
                    2
                ],
                "declined": [],
                "pending": [
                    1,
                    3,
                    6,
                    5
                ],
                "closed": [],
                "remaining_spots": 3
            }
        },
        {
            "id": "3",
            "type": "event",
            "attributes": {
                "course_name": "Riverdale Golf Club",
                "date": "08-10-2021",
                "tee_time": "15:20",
                "open_spots": 2,
                "number_of_holes": "9",
                "private": false,
                "host_name": "Amber",
                "host_id": 3,
                "accepted": [
                    3
                ],
                "declined": [
                    6
                ],
                "pending": [
                    1,
                    2,
                    4,
                    5
                ],
                "closed": [],
                "remaining_spots": 1
            }
        }
    ]
}
```

### GET All Events for Single Player
##### Resource URL
```
GET https://fore-finder-be.herokuapp.com/api/v1/players/{player_id}/events
```
Example Response:    
```json
{
    "data": [
        {
            "id": "2",
            "type": "event",
            "attributes": {
                "course_name": "City Park Golf Course",
                "date": "08-05-2021",
                "tee_time": "14:20",
                "open_spots": 4,
                "number_of_holes": "18",
                "private": true,
                "host_name": "Andrew",
                "host_id": 2,
                "accepted": [
                    2
                ],
                "declined": [],
                "pending": [
                    1,
                    3,
                    6,
                    5
                ],
                "closed": [],
                "remaining_spots": 3
            }
        },
        {
            "id": "3",
            "type": "event",
            "attributes": {
                "course_name": "Riverdale Golf Club",
                "date": "08-10-2021",
                "tee_time": "15:20",
                "open_spots": 2,
                "number_of_holes": "9",
                "private": false,
                "host_name": "Amber",
                "host_id": 3,
                "accepted": [
                    3
                ],
                "declined": [
                    6
                ],
                "pending": [
                    1,
                    2,
                    4,
                    5
                ],
                "closed": [],
                "remaining_spots": 1
            }
        }
    ]
}
```

### POST Host & Add Tee Time
##### Resource URL
```
POST https://fore-finder-be.herokuapp.com/api/v1/event
```
Request Parameters:

| Request Parameter | Description | Required? |
| --- | --- | --- |
| course_id | id of the course that is booked | Yes - must be sent in body of request |
| date | date of tee time | Yes - must be sent in body of request |
| tee_time | tee time | Yes - must be sent in body of request |
| open_spots | max number of spots (including the host) | Yes - must be sent in body of request |
| number_of_holes | number of holes played | Yes - must be sent in body of request |
| private | limited to friends only? | Yes - must be sent in body of request |
| host_id | id of player initiating event | Yes - must be sent in body of request |
| invitees | id of players invited | Yes - must be sent in body of request |

Example Request Body:
```json
{
  "course_id": 4,
  "date": "09-01-2021",
  "tee_time": "10:30",
  "open_spots": 2,
  "number_of_holes": "18",
  "private": true,
  "host_id": 4,
  "invitees": [1]
}
```

Example Response:    
```json
{
    "data": {
        "id": "6",
        "type": "event",
        "attributes": {
            "course_name": "Willis Case Golf Course",
            "date": "09-01-2021",
            "tee_time": "10:30",
            "open_spots": 2,
            "number_of_holes": "18",
            "private": true,
            "host_name": "Betty",
            "host_id": 4,
            "accepted": [
                4
            ],
            "declined": [],
            "pending": [
                1
            ],
            "closed": [],
            "remaining_spots": 1
        }
    }
}
```

### GET Single Event
##### Resource URL
```
GET https://fore-finder-be.herokuapp.com/api/v1/event/{event_id}
```
Example Response:    
```json
{
    "data": {
        "id": "6",
        "type": "event",
        "attributes": {
            "course_name": "Willis Case Golf Course",
            "date": "09-01-2021",
            "tee_time": "10:30",
            "open_spots": 2,
            "number_of_holes": "18",
            "private": true,
            "host_name": "Betty",
            "host_id": 4,
            "accepted": [
                4
            ],
            "declined": [],
            "pending": [
                1
            ],
            "closed": [],
            "remaining_spots": 1
        }
    }
}
```

### DELETE Single Event
##### Resource URL
```
DELETE https://fore-finder-be.herokuapp.com/api/v1/event/{event_id}
```

### PATCH Accept or Decline Tee Time
##### Resource URL
```
PATCH /api/v1/player-event
```
Request Parameters:

| Request Parameter | Description | Required? |
| --- | --- | --- |
| user_id | id of the user accepting tee time | Yes - must be sent in body of request |
| event_id | id of the event accpeted | Yes - must be sent in body of request |
| invite_status | accepted, declined | Yes - must be sent in body of request |

Example Request Body:
```json
  {
    "user_id": 2,
    "event_id": 1,
    "invite_status": "declined"
  }
```

Example Response:    
```json
{
  "data": {
      "id": 1,
      "type": "player-events",
      "attributes": {
       "user_id": 2,
       "event_id": 1,
       "invite_status": "declined"
     }
   }
}
```
### GET All Player Details
##### Resource URL
```
GET https://fore-finder-be.herokuapp.com/api/v1/players
```
Example Response:    
```json
{
  "data": [
      {
          "id": "1",
          "type": "players",
          "attributes": {
            "name": "Eric Rabun",
            "friends": [
                2,
                3,
                4,
                5,
                6
            ],
            "events": [
                2
            ]
          }
      },
      {
          "id": "2",
          "type": "players",
          "attributes": {
            "name": "Tyson McNutt",
            "friends": [
                1,
                3,
                4,
                5,
                6
            ],
            "events": [
                1
            ]
          }
      }
  ]
}
```

### POST Player
##### Resource URL
```
POST https://fore-finder-be.herokuapp.com/api/v1/players
```
Request Parameters:

| Request Parameter | Description | Required? |
| --- | --- | --- |
| name | player's name | Yes - must be sent in body of request |
| phone | player's phone number | Yes - must be sent in the body of the request |
| email | player's email|  Yes - must be sent in the body of the request |
| username | player's username |  Yes - must be sent in the body of the request |
| password | player's password | Yes - must be sent in the body of the request |
| password_confirmation | player's password confirmation | Yes - must be sent in the body of the request |


Example Request Body:
```json
{
  "name": "new user",
  "phone": "999.867.5309",
  "email": "test@example.com",
  "username": "test2user",
  "password": "testpassword",
  "password_confirmation": "testpassword"
}
```

Example Response:    
```json
{
    "data": {
        "id": "8",
        "type": "players",
        "attributes": {
            "name": "new user",
            "phone": "999.867.5309",
            "email": "test@example.com",
            "username": "test2user",
            "friends": [],
            "events": []
        }
    }
}
```

### POST Add Friendship
##### Resource URL
```
POST https://fore-finder-be.herokuapp.com/api/v1/friendship
```
Request Parameters:

| Request Parameter | Description | Required? |
| --- | --- | --- |
| follower_id | id of player adding friend | Yes - must be sent in body of request |
| followee_id | id of player being friended | Yes - must be sent in body of request |


Example Request Body:
```json
  {
    "follower_id": 3,
    "followee_id": 6
  }
```

Example Response:    
```json
{
    "data": {
        "id": "15",
        "type": "friendship",
        "attributes": {
            "follower": {
                "id": 3,
                "name": "Amber",
                "phone": "9999991236",
                "email": "test3@test.com",
                "created_at": "2021-07-18T02:50:05.802Z",
                "updated_at": "2021-07-18T02:50:05.802Z"
            },
            "followee": {
                "id": 6,
                "name": "Cleo",
                "phone": "9999991239",
                "email": "test6@test.com",
                "created_at": "2021-07-18T02:50:05.807Z",
                "updated_at": "2021-07-18T02:50:05.807Z"
            }
        }
    }
}
```

### DELETE Remove Friendship
##### Resource URL
```
DELETE https://fore-finder-be.herokuapp.com/api/v1/friendship
```
Request Parameters:

| Request Parameter | Description | Required? |
| --- | --- | --- |
| follower_id | id of player removing friend | Yes - must be sent in body of request |
| followee_id | id of player being removed | Yes - must be sent in body of request |


Example Request Body:
```json
  {
    "follower_id": 3,
    "followee_id": 6
  }
```

### POST Create Session
##### Resource URL
```
POST https://fore-finder-be.herokuapp.com/api/v1/sessions
```
Request Parameters:

| Request Parameter | Description | Required? |
| --- | --- | --- |
| email | player's email | Yes - must be sent in body of request |
| password | player's password | Yes - must be sent in body of request |

Example Request Body:
```json
  {
    "email": "test@example.com",
    "password": "testpassword"
  }
```

Example Response:    
```json
{
    "data": {
        "id": "8",
        "type": "players",
        "attributes": {
            "name": "new user",
            "phone": "999.867.5309",
            "email": "test@example.com",
            "username": "test2user",
            "friends": [],
            "events": []
        }
    }
}
```
