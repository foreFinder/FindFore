require 'rails_helper'

RSpec.describe "Get All Events Endpoint" do
  describe "happy path" do
    before :each do
      @player_1 = Player.create!(id: 1, name: 'Eric Rabun', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      @player_2 = Player.create!(id: 2, name: 'Tyson McNutt', phone: "999.999.1235" , email: "test2@test.com", username: "username2", password: "password")
      @player_3 = Player.create!(id: 3, name: 'Jon Schlandt', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      @player_4 = Player.create!(id: 4, name: 'Chris Anderson', phone: "999.999.1237", email: "test4@test.com", username: "username4", password: "password")
      @player_5 = Player.create!(id: 5, name: 'Jahara Clark', phone: "999.999.1238" , email: "test5@test.com", username: "username5", password: "password")
      @player_6 = Player.create!(id: 6, name: "Keegan O'Shea", phone: "999.999.1239" , email: "test6@test.com", username: "username6", password: "password")

      @course_1 = Course.create!(id: 1, name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      @course_2 = Course.create!(id: 2, name: 'City Park Golf Course', street: '3181 E. 23rd Avenue', city: 'Denver', state: 'Colorado', zip_code: '80205', phone: '720.865.3410', cost: 65)
      @course_3 = Course.create!(id: 3, name: 'Riverdale Golf Club', street: '13300 Riverdale Road', city: 'Brighton', state: 'Colorado', zip_code: '80602', phone: '303.659.4700', cost: 74)

      @event_1 = Event.create!(id: 1, course_id: 1, date: '08/01/2021', tee_time: '13:20', open_spots: '1', number_of_holes: "9", host_id: 1, private: true )
      @event_2 = Event.create!(id: 2, course_id: 2, date: '08/05/2021', tee_time: '14:20', open_spots: '2', number_of_holes: "18", host_id: 2, private: true )
      @event_3 = Event.create!(id: 3, course_id: 3, date: '08/10/2021', tee_time: '15:20', open_spots: '3', number_of_holes: "9", host_id: 3, private: false )
      @event_4 = Event.create!(id: 4, course_id: 3, date: '08/11/2021', tee_time: '16:20', open_spots: '3', number_of_holes: "9", host_id: 1, private: false )

      PlayerEvent.create!(player_id: @player_2.id, event_id: @event_1.id, invite_status: "pending")
      PlayerEvent.create!(player_id: @player_3.id, event_id: @event_1.id, invite_status: "accepted")
      PlayerEvent.create!(player_id: @player_4.id, event_id: @event_1.id, invite_status: "declined")
      PlayerEvent.create!(player_id: @player_1.id, event_id: @event_2.id, invite_status: "accepted")
      PlayerEvent.create!(player_id: @player_3.id, event_id: @event_2.id, invite_status: "pending")
      PlayerEvent.create!(player_id: @player_6.id, event_id: @event_2.id, invite_status: "pending")
      PlayerEvent.create!(player_id: @player_4.id, event_id: @event_3.id, invite_status: "accepted")
      PlayerEvent.create!(player_id: @player_4.id, event_id: @event_3.id, invite_status: "declined")
      PlayerEvent.create!(player_id: @player_4.id, event_id: @event_4.id, invite_status: "declined")
    end
    it 'returns all events with updated players and spots available' do
      get '/api/v1/events'

      expect(response).to be_successful

      all_events = JSON.parse(response.body, symbolize_names: true)

      expect(all_events).to be_a(Hash)
      expect(all_events).to have_key(:data)
      all_events[:data].each do |event|
        expect(event).to be_a(Hash)

        expect(event).to have_key(:type)
        expect(event[:type]).to be_a(String)

        expect(event).to have_key(:id)
        expect(event[:id]).to be_a(String)

        expect(event).to have_key(:attributes)
        expect(event[:attributes]).to be_a(Hash)

        expect(event[:attributes]).to have_key(:course_name)
        expect(event[:attributes][:course_name]).to be_a(String)

        expect(event[:attributes]).to have_key(:date)
        expect(event[:attributes][:date]).to be_a(String)

        expect(event[:attributes]).to have_key(:tee_time)
        expect(event[:attributes][:tee_time]).to be_a(String)

        expect(event[:attributes]).to have_key(:open_spots)
        expect(event[:attributes][:open_spots]).to be_a(Integer)

        expect(event[:attributes]).to have_key(:number_of_holes)
        expect(event[:attributes][:number_of_holes]).to be_a(String)

        expect(event[:attributes]).to have_key(:private)
        expect(event[:attributes][:private]).to be_in([true, false])

        expect(event[:attributes]).to have_key(:host_name)
        expect(event[:attributes][:host_name]).to be_a(String)

        expect(event[:attributes]).to have_key(:accepted)
        expect(event[:attributes][:accepted]).to be_a(Array)

        expect(event[:attributes]).to have_key(:declined)
        expect(event[:attributes][:declined]).to be_a(Array)

        expect(event[:attributes]).to have_key(:pending)
        expect(event[:attributes][:pending]).to be_a(Array)

        expect(event[:attributes]).to have_key(:remaining_spots)
        expect(event[:attributes][:remaining_spots]).to be_a(Integer)
      end
    end

    it "returns only public events when query parameter private = false" do
      get "/api/v1/events?private=false"

      public_events = JSON.parse(response.body, symbolize_names: true)

      expect(public_events).to be_a(Hash)
      expect(public_events[:data].count).to eq(2)
      expect(public_events[:data].first[:id]).to eq("#{@event_3.id}")
      expect(public_events[:data].second[:id]).to eq("#{@event_4.id}")
    end
  end

  describe "sad path" do
    it 'returns empty data array if there are no events' do
      get '/api/v1/events'

      expect(response).to be_successful

      all_players = JSON.parse(response.body, symbolize_names: true)
      expect(all_players[:data]).to be_an(Array)
      expect(all_players[:data]).to be_empty
    end
  end
end
