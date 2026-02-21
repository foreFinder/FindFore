# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)
Course.destroy_all
Friendship.destroy_all
PlayerEvent.destroy_all
Event.destroy_all
Player.destroy_all

Player.create!(id: 1, name: 'Amy', phone: "2533597214", email: "jaharamclark@gmail.com", username: "username1", password: "password")
Player.create!(id: 2, name: 'Andrew', phone: "3197952720" , email: "keegan.oshea9@gmail.com", username: "username2", password: "password")
Player.create!(id: 3, name: 'Amber', phone: "9999991236", email: "test3@test.com", username: "username3", password: "password")
Player.create!(id: 4, name: 'Betty', phone: "9999991237", email: "test4@test.com", username: "username4", password: "password")
Player.create!(id: 5, name: 'Burt', phone: "9999991238" , email: "test5@test.com", username: "username5", password: "password")
Player.create!(id: 6, name: "Cleo", phone: "9999991239" , email: "test6@test.com", username: "username6", password: "password")

Course.create!(id: 1, name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
Course.create!(id: 2, name: 'City Park Golf Course', street: '3181 E. 23rd Avenue', city: 'Denver', state: 'Colorado', zip_code: '80205', phone: '720.865.3410', cost: 65)
Course.create!(id: 3, name: 'Riverdale Golf Club', street: '13300 Riverdale Road', city: 'Brighton', state: 'Colorado', zip_code: '80602', phone: '303.659.4700', cost: 74)
Course.create!(id: 4, name: 'Willis Case Golf Course', street: '4999 Vrain Street', city: 'Denver', state: 'Colorado', zip_code: '80212', phone: '720.865.0700', cost: 58)
# open_spots include the host in count
Event.create!(id: 1, course_id: 1, date: '08-01-2021', tee_time: '13:20', open_spots: 3, number_of_holes: "9", host_id: 1, private: true)
Event.create!(id: 2, course_id: 2, date: '08-05-2021', tee_time: '14:20', open_spots: 4, number_of_holes: "18", host_id: 2, private: true)
Event.create!(id: 3, course_id: 3, date: '08-10-2021', tee_time: '15:20', open_spots: 2, number_of_holes: "9", host_id: 3, private: false)
Event.create!(id: 4, course_id: 4, date: '09-30-2021', tee_time: '15:20', open_spots: 2, number_of_holes: "9", host_id: 4, private: false)

#A name friendships - only friends with other A's
Friendship.create!(follower_id: 1, followee_id: 2)
Friendship.create!(follower_id: 1, followee_id: 3)
Friendship.create!(follower_id: 2, followee_id: 1)
Friendship.create!(follower_id: 2, followee_id: 3)
Friendship.create!(follower_id: 3, followee_id: 1)
Friendship.create!(follower_id: 3, followee_id: 2)
#B name friendships - only friends with B+ names
Friendship.create!(follower_id: 4, followee_id: 5)
Friendship.create!(follower_id: 4, followee_id: 6)
Friendship.create!(follower_id: 5, followee_id: 4)
Friendship.create!(follower_id: 5, followee_id: 6)

PlayerEvent.create!(player_id: 1, event_id: 1, invite_status: "accepted")
PlayerEvent.create!(player_id: 2, event_id: 1, invite_status: "pending")
PlayerEvent.create!(player_id: 3, event_id: 1, invite_status: "pending")

PlayerEvent.create!(player_id: 1, event_id: 2, invite_status: "pending")
PlayerEvent.create!(player_id: 2, event_id: 2, invite_status: "accepted")
PlayerEvent.create!(player_id: 3, event_id: 2, invite_status: "pending")
PlayerEvent.create!(player_id: 6, event_id: 2, invite_status: "pending")
PlayerEvent.create!(player_id: 5, event_id: 2, invite_status: "pending")

PlayerEvent.create!(player_id: 3, event_id: 3, invite_status: "accepted")
PlayerEvent.create!(player_id: 1, event_id: 3, invite_status: "pending")
PlayerEvent.create!(player_id: 2, event_id: 3, invite_status: "pending")
PlayerEvent.create!(player_id: 4, event_id: 3, invite_status: "pending")
PlayerEvent.create!(player_id: 5, event_id: 3, invite_status: "pending")
PlayerEvent.create!(player_id: 6, event_id: 3, invite_status: "pending")
