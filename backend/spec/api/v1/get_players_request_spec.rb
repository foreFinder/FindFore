require 'rails_helper'

RSpec.describe "Get All Players Endpoint" do
  describe "happy path" do
    it 'returns all players with friend and event details' do
      player_1 = Player.create!(name: 'Eric Rabun', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(name: 'Tyson McNutt', phone: "999.999.1235" , email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(name: 'Jon Schlandt', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      Friendship.create!(follower_id: player_1.id, followee_id: player_2.id)
      Friendship.create!(follower_id: player_1.id, followee_id: player_3.id)
      Friendship.create!(follower_id: player_2.id, followee_id: player_1.id)
      course_1 = Course.create!(name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      event_1 = Event.create!(course_id: course_1.id, date: '08/01/2021', tee_time: '13:20', open_spots: '3', number_of_holes: "9", host_id: player_1.id, private: true)
      PlayerEvent.create!(player_id: player_2.id, event_id: event_1.id , invite_status: "accepted")
      PlayerEvent.create!(player_id: player_3.id, event_id: event_1.id , invite_status: "declined")

      get '/api/v1/players'

      expect(response).to be_successful

      all_players = JSON.parse(response.body, symbolize_names: true)
      expect(all_players[:data].first[:attributes][:name]).to eq(player_1.name)
      expect(all_players[:data].first[:attributes][:friends]).to eq([player_2.id, player_3.id])
      expect(all_players[:data].first[:attributes][:events]).to eq([])

      expect(all_players[:data].second[:attributes][:name]).to eq(player_2.name)
      expect(all_players[:data].second[:attributes][:friends]).to eq([player_1.id])
      expect(all_players[:data].second[:attributes][:events]).to eq([event_1.id])

      expect(all_players).to be_a(Hash)
      all_players[:data].each do |player|
        expect(player).to have_key(:id)
        expect(player[:id]).to be_an(String)

        expect(player).to have_key(:type)
        expect(player[:type]).to be_an(String)

        expect(player).to have_key(:attributes)
        expect(player[:attributes]).to be_an(Hash)

        expect(player[:attributes]).to have_key(:name)
        expect(player[:attributes][:name]).to be_an(String)

        expect(player[:attributes]).to have_key(:friends)
        expect(player[:attributes][:friends]).to be_an(Array)

        expect(player[:attributes]).to have_key(:events)
        expect(player[:attributes][:events]).to be_an(Array)
      end
    end
  end

  describe "sad path" do
    it 'returns empty data array if there are no players' do
      get '/api/v1/players'

      expect(response).to be_successful

      all_players = JSON.parse(response.body, symbolize_names: true)
      expect(all_players[:data]).to be_an(Array)
      expect(all_players[:data]).to be_empty
    end
  end
end
