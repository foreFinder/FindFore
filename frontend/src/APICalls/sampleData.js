// GOLF COURSE DATA

export const courses = [
  {
    id: 100,
    name: 'Green Valley Ranch Golf Club',
    street: '4900 Himalaya Road',
    city: 'Denver',
    state: 'Colorado',
    zip: '80249',
    phone: '303.371.3131',
    cost: 80,
  },
  {
    id: 101,
    name: 'City Park Golf Course',
    street: '3181 E. 23rd Avenue',
    city: 'Denver',
    state: 'Colorado',
    zip: '80205',
    phone: '720.865.3410',
    cost: 65,
  },
  {
    id: 102,
    name: 'Riverdale Golf Club',
    street: '13300 Riverdale Road',
    city: 'Brighton',
    state: 'Colorado',
    zip: '80602',
    phone: '303.659.4700',
    cost: 74,
  },
  {
    id: 103,
    name: 'Willis Case Golf Course',
    street: '4999 Vrain Street',
    city: 'Denver',
    state: 'Colorado',
    zip: '80212',
    phone: '720.865.0700',
    cost: 58
  }
]


// PLAYER DATA

export const players = [
  {
    id: 1,
    name: 'Eric Rabun',
    friends: [2, 3, 5],
    committedTimes: [/*list of tee time event id's*/],
  },
  {
    id: 2,
    name: 'Tyson McNutt',
    friends: [1, 5, 6],
    committedTimes: [],
  },
  {
    id: 3,
    name: 'Jon Schlandt',
    friends: [1, 5],
    committedTimes: [],
  },
  {
    id: 4,
    name: 'Chris Anderson',
    friends: [1, 2, 5, 6],
    committedTimes: [],
  },
  {
    id: 5,
    name: 'Jahara Clark',
    friends: [2, 4],
    committedTimes: [],
  },
  {
    id: 6,
    name: "Keegan O'Shea",
    friends: [1, 2, 3, 4, 5],
    committedTimes: [],
  }
]


// EVENTS DATA

export const teeTimes = {
  "data": [
    {
      "id": 1,
      "type": "event",
      "attributes": {
        "course_name": 'Green Valley Ranch Golf Club',
        "date": "08-04-2021",
        "tee_time": "09:30",
        "open_spots": 3,
        "number_of_holes": "9",
        "private": true,
        "host_name": "Bob",
        "accepted": [2, 3],
        "declined": [], 
        "pending": [1],
        "remaining_spots": 1
      }
    },
    {
      "id": 2,
      "type": "event",
      "attributes": {
        "course_name": 'Green Valley Ranch Golf Club',
        "date": "08-05-2021",
        "tee_time": "10:30",
        "open_spots": 3,
        "number_of_holes": "9",
        "private": true,
        "host_name": "Amy Jones",
        "accepted": [2, 3],
        "declined": [], 
        "pending": [1],
        "remaining_spots": 1
      }
    },
    {
      "id": 3,
      "type": "event",
      "attributes": {
        "course_name": 'City Park Golf Course',
        "date": "08-06-2021",
        "tee_time": "14:30",
        "open_spots": 2,
        "number_of_holes": "9",
        "private": false,
        "host_name": "Jim Bob",
        "accepted": [2],
        "declined": [], 
        "pending": [],
        "remaining_spots": 1
      }
    }
  ]
}
