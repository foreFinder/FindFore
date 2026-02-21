require 'rails_helper'

RSpec.describe "Update Player Event Response (Invitation) Endpoint" do
  describe "happy path" do
    it "should add the players response to an invitation" do
      player_1 = Player.create!(name: 'Eric Rabun', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(name: 'Tyson McNutt', phone: "999.999.1235" , email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(name: 'Jon Schlandt', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      course_1 = Course.create!(name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      event_1 = Event.create!(course_id: course_1.id, date: '08-01-2021', tee_time: '13:20', open_spots: '1', number_of_holes: "9", host_id: player_2.id, private: true )
      invitation = PlayerEvent.create!(player_id: player_1.id, event_id: event_1.id, invite_status: "pending")

      player_event_params =
      {
        player_id: player_1.id,
        event_id: event_1.id,
        invite_status: "accepted"
      }

      headers = { 'CONTENT_TYPE' => 'application/json' }

      patch '/api/v1/player-event', headers: headers, params:JSON.generate(player_event_params)

      player_event_data = JSON.parse(response.body, symbolize_names: true)

      expect(PlayerEvent.all.count).to eq(1)
      expect(PlayerEvent.last.player_id).to eq(player_1.id)
      expect(PlayerEvent.last.event_id).to eq(event_1.id)
      expect(PlayerEvent.last.invite_status).to eq(player_event_params[:invite_status])

      expect(response).to be_successful
      expect(player_event_data).to be_a(Hash)
      expect(player_event_data).to have_key(:data)
      expect(player_event_data[:data]).to be_a(Hash)

      expect(player_event_data[:data]).to have_key(:type)
      expect(player_event_data[:data][:type]).to be_a(String)

      expect(player_event_data[:data]).to have_key(:id)
      expect(player_event_data[:data][:id]).to be_a(String)

      expect(player_event_data[:data]).to have_key(:attributes)
      expect(player_event_data[:data][:attributes]).to be_a(Hash)

      expect(player_event_data[:data][:attributes]).to have_key(:player_id)
      expect(player_event_data[:data][:attributes][:player_id]).to be_a(Integer)

      expect(player_event_data[:data][:attributes]).to have_key(:event_id)
      expect(player_event_data[:data][:attributes][:event_id]).to be_a(Integer)
    end

    it "closes pending invitations when spots are full" do
      player_1 = Player.create!(id: 1, name: 'Eric Rabun', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(id: 2, name: 'Tyson McNutt', phone: "999.999.1235" , email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(id: 3, name: 'Jon Schlandt', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      player_4 = Player.create!(id: 4, name: 'Chris Anderson', phone: "999.999.1237", email: "test4@test.com", username: "username4", password: "password")
      player_5 = Player.create!(id: 5, name: 'Jahara Clark', phone: "999.999.1238" , email: "test5@test.com", username: "username5", password: "password")
      Friendship.create!(follower_id: player_1.id, followee_id: player_2.id)
      Friendship.create!(follower_id: player_1.id, followee_id: player_3.id)
      Friendship.create!(follower_id: player_2.id, followee_id: player_1.id)
      course_1 = Course.create!(name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      event_1 = Event.create!(course_id: course_1.id, date: '08/01/2021', tee_time: '13:20', open_spots: '3', number_of_holes: "9", host_id: player_1.id, private: true)
      pe_1 = PlayerEvent.create!(player_id: player_1.id, event_id: event_1.id , invite_status: "accepted")
      pe_2 = PlayerEvent.create!(player_id: player_2.id, event_id: event_1.id , invite_status: "pending")
      pe_3 = PlayerEvent.create!(player_id: player_3.id, event_id: event_1.id , invite_status: "pending")
      pe_4 = PlayerEvent.create!(player_id: player_4.id, event_id: event_1.id , invite_status: "pending")
      pe_5 = PlayerEvent.create!(player_id: player_5.id, event_id: event_1.id , invite_status: "accepted")

      player_event_params =
      {
        player_id: player_3.id,
        event_id: event_1.id,
        invite_status: "accepted"
      }
      headers = { 'CONTENT_TYPE' => 'application/json' }
      patch '/api/v1/player-event', headers: headers, params:JSON.generate(player_event_params)

      expect(PlayerEvent.find_by!(player_id: player_3.id, event_id: event_1.id).invite_status).to eq("accepted")
      expect(PlayerEvent.find_by!(player_id: player_2.id, event_id: event_1.id).invite_status).to eq("closed")
      expect(PlayerEvent.find_by!(player_id: player_4.id, event_id: event_1.id).invite_status).to eq("closed")
      expect(PlayerEvent.find_by!(player_id: player_5.id, event_id: event_1.id).invite_status).to eq("accepted")
    end
  end

  describe "sad path" do
    xit 'returns an error if missing a parameter in the request body' do
      player_1 = Player.create!(name: 'Eric Rabun', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(name: 'Tyson McNutt', phone: "999.999.1235" , email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(name: 'Jon Schlandt', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      course_1 = Course.create!(name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      event_1 = Event.create!(course_id: course_1.id, date: '08-01-2021', tee_time: '13:20', open_spots: '1', number_of_holes: "9", host_id: player_2.id, private: true )
      invitation = PlayerEvent.create!(player_id: player_1.id, event_id: event_1.id, invite_status: "pending")

      player_event_params = {
        player_id: player_1.id,
        event_id: event_1.id,
        invite_status: ""
      }

      headers = { 'CONTENT_TYPE' => 'application/json' }

      patch '/api/v1/player-event', headers: headers, params:JSON.generate(player_event_params)

      player_event_data = JSON.parse(response.body, symbolize_names: true)

      expect(response.status).to eq(400)
      expect(event_data).to have_key(:errors)
      expect(event_data[:errors][0][:message]).to be_a(String)
    end
  end
end
