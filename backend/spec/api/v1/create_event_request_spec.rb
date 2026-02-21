require 'rails_helper'

RSpec.describe 'Create Event API Endpoint' do
  describe 'happy path' do
    it 'can create a new event with specific invitees' do

      player_1 = Player.create!(name: 'player 1', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(name: 'player 2', phone: "999.999.1235", email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(name: 'player 3', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      course_1 = Course.create!(name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      event_1 = Event.create!(course_id: course_1.id, date: '08-01-2021', tee_time: '13:20', open_spots: '1', number_of_holes: "9", host_id: player_2.id, private: true )

      event_params = {
        course_id: course_1.id,
        date: "08/01/2021",
        tee_time: "14:20",
        open_spots: 2,
        number_of_holes: "9",
        private: true,
        host_id: player_1.id,
        invitees: [ player_2.id , player_3.id ]
      }

      headers = { 'CONTENT_TYPE' => 'application/json' }

      post '/api/v1/event', headers: headers, params:JSON.generate(event_params)

      event_data = JSON.parse(response.body, symbolize_names: true)

      created_event = Event.last
      expect(Event.all.count).to eq(2)
      expect(created_event.host_id).to eq(player_1.id)
      expect(created_event.course_id).to eq(course_1.id)

      expect(response).to be_successful
      expect(event_data).to be_a(Hash)
      expect(event_data).to have_key(:data)
      expect(event_data[:data]).to be_a(Hash)

      expect(event_data[:data]).to have_key(:type)
      expect(event_data[:data][:type]).to be_a(String)

      expect(event_data[:data]).to have_key(:id)
      expect(event_data[:data][:id]).to be_a(String)

      expect(event_data[:data]).to have_key(:attributes)
      expect(event_data[:data][:attributes]).to be_a(Hash)

      expect(event_data[:data][:attributes]).to have_key(:course_name)
      expect(event_data[:data][:attributes][:course_name]).to be_a(String)

      expect(event_data[:data][:attributes]).to have_key(:date)
      expect(event_data[:data][:attributes][:date]).to be_a(String)

      expect(event_data[:data][:attributes]).to have_key(:tee_time)
      expect(event_data[:data][:attributes][:tee_time]).to be_a(String)

      expect(event_data[:data][:attributes]).to have_key(:open_spots)
      expect(event_data[:data][:attributes][:open_spots]).to be_a(Integer)

      expect(event_data[:data][:attributes]).to have_key(:number_of_holes)
      expect(event_data[:data][:attributes][:number_of_holes]).to be_a(String)

      expect(event_data[:data][:attributes]).to have_key(:private)
      expect(event_data[:data][:attributes][:private]).to be_in([true, false])

      expect(event_data[:data][:attributes]).to have_key(:host_name)
      expect(event_data[:data][:attributes][:host_name]).to be_a(String)

      expect(event_data[:data][:attributes]).to have_key(:accepted)
      expect(event_data[:data][:attributes][:accepted]).to be_a(Array)

      expect(event_data[:data][:attributes]).to have_key(:declined)
      expect(event_data[:data][:attributes][:declined]).to be_a(Array)

      expect(event_data[:data][:attributes]).to have_key(:pending)
      expect(event_data[:data][:attributes][:pending]).to be_a(Array)

      expect(event_data[:data][:attributes]).to have_key(:remaining_spots)
      expect(event_data[:data][:attributes][:remaining_spots]).to be_a(Integer)
    end

    it 'can create an event that is open to all players' do

      player_1 = Player.create!(name: 'player 1', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(name: 'player 2', phone: "999.999.1235", email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(name: 'player 3', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      course_1 = Course.create!(name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      event_1 = Event.create!(course_id: course_1.id, date: '08-01-2021', tee_time: '13:20', open_spots: '1', number_of_holes: "9", host_id: player_2.id, private: true )

      event_params = {
        course_id: course_1.id,
        date: "08/01/2021",
        tee_time: "14:20",
        open_spots: 2,
        number_of_holes: "9",
        private: false,
        host_id: player_1.id,
        invitees: []
      }

      headers = { 'CONTENT_TYPE' => 'application/json' }

      post '/api/v1/event', headers: headers, params:JSON.generate(event_params)

      event_data = JSON.parse(response.body, symbolize_names: true)

      created_event = Event.last
      expect(Event.all.count).to eq(2)
      expect(created_event.players_pending_invitation.length).to eq(2)
      expect(created_event.players_accepting_invitation.length).to eq(1)
      expect(created_event.host_id).to eq(player_1.id)
      expect(created_event.course_id).to eq(course_1.id)

      expect(response).to be_successful
      expect(event_data).to be_a(Hash)
      expect(event_data).to have_key(:data)
      expect(event_data[:data]).to be_a(Hash)

      expect(event_data[:data]).to have_key(:type)
      expect(event_data[:data][:type]).to be_a(String)

      expect(event_data[:data]).to have_key(:id)
      expect(event_data[:data][:id]).to be_a(String)

      expect(event_data[:data]).to have_key(:attributes)
      expect(event_data[:data][:attributes]).to be_a(Hash)

      expect(event_data[:data][:attributes]).to have_key(:course_name)
      expect(event_data[:data][:attributes][:course_name]).to be_a(String)

      expect(event_data[:data][:attributes]).to have_key(:date)
      expect(event_data[:data][:attributes][:date]).to be_a(String)

      expect(event_data[:data][:attributes]).to have_key(:tee_time)
      expect(event_data[:data][:attributes][:tee_time]).to be_a(String)

      expect(event_data[:data][:attributes]).to have_key(:open_spots)
      expect(event_data[:data][:attributes][:open_spots]).to be_a(Integer)

      expect(event_data[:data][:attributes]).to have_key(:number_of_holes)
      expect(event_data[:data][:attributes][:number_of_holes]).to be_a(String)

      expect(event_data[:data][:attributes]).to have_key(:private)
      expect(event_data[:data][:attributes][:private]).to be_in([true, false])

      expect(event_data[:data][:attributes]).to have_key(:host_name)
      expect(event_data[:data][:attributes][:host_name]).to be_a(String)

      expect(event_data[:data][:attributes]).to have_key(:accepted)
      expect(event_data[:data][:attributes][:accepted]).to be_a(Array)

      expect(event_data[:data][:attributes]).to have_key(:declined)
      expect(event_data[:data][:attributes][:declined]).to be_a(Array)

      expect(event_data[:data][:attributes]).to have_key(:pending)
      expect(event_data[:data][:attributes][:pending]).to be_a(Array)

      expect(event_data[:data][:attributes]).to have_key(:remaining_spots)
      expect(event_data[:data][:attributes][:remaining_spots]).to be_a(Integer)
    end
  end

  describe "sad path" do

    it 'returns an error if missing a parameter' do
      player_1 = Player.create!(name: 'player 1', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(name: 'player 2', phone: "999.999.1235", email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(name: 'player 3', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      course_1 = Course.create!(id: 1, name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)

      event_params = {
        course_id: course_1.id,
        date: "08/01/2021",
        tee_time: "14:20",
        open_spots: "2",
        private: true,
        host_id: player_1.id,
        invitees: [ 2 , 3 ]
      }

      headers = { 'CONTENT_TYPE' => 'application/json' }

      post '/api/v1/event', headers: headers, params:JSON.generate(event_params)

      expect(response.status).to eq(400)
      event = JSON.parse(response.body, symbolize_names: true)
      expect(event).to have_key(:errors)
      expect(event).to_not have_key(:data)
      expect(event[:errors][0]).to have_key(:message)
      expect(event[:errors][0][:message]).to be_a(String)
      expect(event[:errors][0]).to have_key(:code)
      expect(event[:errors][0][:code]).to be_a(Integer)
    end
  end
end
