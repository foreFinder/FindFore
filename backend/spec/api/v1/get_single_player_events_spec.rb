require 'rails_helper'

RSpec.describe "Get Single Player's Events Endpoint" do
  describe "happy path" do
    it 'returns the events for a single player' do
      player_1 = Player.create!(id: 1, name: 'player 1', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(id: 2, name: 'player 2', phone: "999.999.1235" , email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(id: 3, name: 'player 3', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      player_4 = Player.create!(id: 4, name: 'player 4', phone: "999.999.1237", email: "test4@test.com", username: "username4", password: "password")
      player_5 = Player.create!(id: 5, name: 'player 5', phone: "999.999.1238" , email: "test5@test.com", username: "username5", password: "password")
      player_6 = Player.create!(id: 6, name: "player 6", phone: "999.999.1239" , email: "test6@test.com", username: "username6", password: "password")

      course_1 = Course.create!(id: 1, name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      course_2 = Course.create!(id: 2, name: 'City Park Golf Course', street: '3181 E. 23rd Avenue', city: 'Denver', state: 'Colorado', zip_code: '80205', phone: '720.865.3410', cost: 65)
      course_3 = Course.create!(id: 3, name: 'Riverdale Golf Club', street: '13300 Riverdale Road', city: 'Brighton', state: 'Colorado', zip_code: '80602', phone: '303.659.4700', cost: 74)

      event_1 = Event.create!(id: 1, course_id: 1, date: '08/01/2021', tee_time: '13:20', open_spots: '2', number_of_holes: "9", host_id: 1, private: true )
      event_2 = Event.create!(id: 2, course_id: 2, date: '08/05/2021', tee_time: '14:20', open_spots: '2', number_of_holes: "18", host_id: 2, private: true )
      event_3 = Event.create!(id: 3, course_id: 3, date: '08/10/2021', tee_time: '15:20', open_spots: '3', number_of_holes: "9", host_id: 3, private: false )

      # event 1 has 1 spot open
      PlayerEvent.create!(player_id: 2, event_id: 1, invite_status: "pending")
      PlayerEvent.create!(player_id: 3, event_id: 1, invite_status: "accepted")
      PlayerEvent.create!(player_id: 4, event_id: 1, invite_status: "declined")
      # event 2 has 2 spots open
      PlayerEvent.create!(player_id: 1, event_id: 2, invite_status: "accepted")
      PlayerEvent.create!(player_id: 3, event_id: 2, invite_status: "pending")
      PlayerEvent.create!(player_id: 6, event_id: 2, invite_status: "pending")
      #event 3 has 3 spots open
      PlayerEvent.create!(player_id: 4, event_id: 3, invite_status: "accepted")
      PlayerEvent.create!(player_id: 4, event_id: 3, invite_status: "declined")

      get "/api/v1/players/#{player_3.id}/events"

      expect(response).to be_successful


      players_events = JSON.parse(response.body, symbolize_names: true)

      expect(players_events).to be_a(Hash)
      expect(players_events).to have_key(:data)
      expect(players_events[:data].count).to eq(2)

      players_events[:data].each do |player_event|
        expect(player_event).to be_a(Hash)

        expect(player_event).to have_key(:type)
        expect(player_event[:type]).to be_a(String)

        expect(player_event).to have_key(:id)
        expect(player_event[:id]).to be_a(String)

        expect(player_event).to have_key(:attributes)
        expect(player_event[:attributes]).to be_a(Hash)

        expect(player_event[:attributes]).to have_key(:course_name)
        expect(player_event[:attributes][:course_name]).to be_a(String)

        expect(player_event[:attributes]).to have_key(:date)
        expect(player_event[:attributes][:date]).to be_a(String)

        expect(player_event[:attributes]).to have_key(:tee_time)
        expect(player_event[:attributes][:tee_time]).to be_a(String)

        expect(player_event[:attributes]).to have_key(:open_spots)
        expect(player_event[:attributes][:open_spots]).to be_a(Integer)

        expect(player_event[:attributes]).to have_key(:number_of_holes)
        expect(player_event[:attributes][:number_of_holes]).to be_a(String)

        expect(player_event[:attributes]).to have_key(:private)
        expect(player_event[:attributes][:private]).to be_in([true, false])

        expect(player_event[:attributes]).to have_key(:host_name)
        expect(player_event[:attributes][:host_name]).to be_a(String)

        expect(player_event[:attributes]).to have_key(:accepted)
        expect(player_event[:attributes][:accepted]).to be_a(Array)

        expect(player_event[:attributes]).to have_key(:declined)
        expect(player_event[:attributes][:declined]).to be_a(Array)

        expect(player_event[:attributes]).to have_key(:pending)
        expect(player_event[:attributes][:pending]).to be_a(Array)

        expect(player_event[:attributes]).to have_key(:remaining_spots)
        expect(player_event[:attributes][:remaining_spots]).to be_a(Integer)
      end
    end
  end

  describe "sad path" do
    it 'returns an error if player does not exist' do
      player_1 = Player.create!(id: 1, name: 'Eric Rabun', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(id: 2, name: 'Tyson McNutt', phone: "999.999.1235" , email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(id: 3, name: 'Jon Schlandt', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      player_4 = Player.create!(id: 4, name: 'Chris Anderson', phone: "999.999.1237", email: "test4@test.com", username: "username4", password: "password")
      player_5 = Player.create!(id: 5, name: 'Jahara Clark', phone: "999.999.1238" , email: "test5@test.com", username: "username5", password: "password")
      player_6 = Player.create!(id: 6, name: "Keegan O'Shea", phone: "999.999.1239" , email: "test6@test.com", username: "username6", password: "password")

      course_1 = Course.create!(id: 1, name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      course_2 = Course.create!(id: 2, name: 'City Park Golf Course', street: '3181 E. 23rd Avenue', city: 'Denver', state: 'Colorado', zip_code: '80205', phone: '720.865.3410', cost: 65)
      course_3 = Course.create!(id: 3, name: 'Riverdale Golf Club', street: '13300 Riverdale Road', city: 'Brighton', state: 'Colorado', zip_code: '80602', phone: '303.659.4700', cost: 74)

      event_1 = Event.create!(id: 1, course_id: 1, date: '08/01/2021', tee_time: '13:20', open_spots: '2', number_of_holes: "9", host_id: 1, private: true )
      event_2 = Event.create!(id: 2, course_id: 2, date: '08/05/2021', tee_time: '14:20', open_spots: '2', number_of_holes: "18", host_id: 2, private: true )
      event_3 = Event.create!(id: 3, course_id: 3, date: '08/10/2021', tee_time: '15:20', open_spots: '3', number_of_holes: "9", host_id: 3, private: false )


      PlayerEvent.create!(player_id: 2, event_id: 1, invite_status: "pending")
      PlayerEvent.create!(player_id: 3, event_id: 1, invite_status: "accepted")
      PlayerEvent.create!(player_id: 4, event_id: 1, invite_status: "declined")

      PlayerEvent.create!(player_id: 4, event_id: 2, invite_status: "accepted")
      PlayerEvent.create!(player_id: 3, event_id: 2, invite_status: "pending")
      PlayerEvent.create!(player_id: 6, event_id: 2, invite_status: "pending")

      PlayerEvent.create!(player_id: 4, event_id: 3, invite_status: "accepted")
      PlayerEvent.create!(player_id: 4, event_id: 3, invite_status: "declined")

      get "/api/v1/players/99/events"

      expect(response.status).to eq(404)

      event = JSON.parse(response.body, symbolize_names: true)
      expect(event).to have_key(:errors)
      expect(event).to_not have_key(:data)
      expect(event[:errors][0]).to have_key(:message)
      expect(event[:errors][0][:message]).to be_a(String)
      expect(event[:errors][0]).to have_key(:code)
      expect(event[:errors][0][:code]).to be_a(Integer)
    end

    it 'returns empty data array if player has no events' do
      player_1 = Player.create!(id: 1, name: 'Eric Rabun', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(id: 2, name: 'Tyson McNutt', phone: "999.999.1235" , email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(id: 3, name: 'Jon Schlandt', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      player_4 = Player.create!(id: 4, name: 'Chris Anderson', phone: "999.999.1237", email: "test4@test.com", username: "username4", password: "password")
      player_5 = Player.create!(id: 5, name: 'Jahara Clark', phone: "999.999.1238" , email: "test5@test.com", username: "username5", password: "password")
      player_6 = Player.create!(id: 6, name: "Keegan O'Shea", phone: "999.999.1239" , email: "test6@test.com", username: "username6", password: "password")

      course_1 = Course.create!(id: 1, name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      course_2 = Course.create!(id: 2, name: 'City Park Golf Course', street: '3181 E. 23rd Avenue', city: 'Denver', state: 'Colorado', zip_code: '80205', phone: '720.865.3410', cost: 65)
      course_3 = Course.create!(id: 3, name: 'Riverdale Golf Club', street: '13300 Riverdale Road', city: 'Brighton', state: 'Colorado', zip_code: '80602', phone: '303.659.4700', cost: 74)

      event_1 = Event.create!(id: 1, course_id: 1, date: '08/01/2021', tee_time: '13:20', open_spots: '2', number_of_holes: "9", host_id: 1, private: true )
      event_2 = Event.create!(id: 2, course_id: 2, date: '08/05/2021', tee_time: '14:20', open_spots: '2', number_of_holes: "18", host_id: 2, private: true )
      event_3 = Event.create!(id: 3, course_id: 3, date: '08/10/2021', tee_time: '15:20', open_spots: '3', number_of_holes: "9", host_id: 3, private: false )

      PlayerEvent.create!(player_id: 2, event_id: 1, invite_status: "pending")
      PlayerEvent.create!(player_id: 3, event_id: 1, invite_status: "accepted")
      PlayerEvent.create!(player_id: 4, event_id: 1, invite_status: "declined")

      PlayerEvent.create!(player_id: 4, event_id: 2, invite_status: "accepted")
      PlayerEvent.create!(player_id: 3, event_id: 2, invite_status: "pending")
      PlayerEvent.create!(player_id: 6, event_id: 2, invite_status: "pending")

      PlayerEvent.create!(player_id: 4, event_id: 3, invite_status: "accepted")
      PlayerEvent.create!(player_id: 4, event_id: 3, invite_status: "declined")

      get "/api/v1/players/#{player_1.id}/events"

      expect(response).to be_successful

      all_players = JSON.parse(response.body, symbolize_names: true)
      expect(all_players[:data]).to be_an(Array)
      expect(all_players[:data]).to be_empty
    end
  end
end
