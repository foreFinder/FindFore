require 'rails_helper'

RSpec.describe "Delete an Event Endpoint" do
  describe "happy path" do
    it "destroys an event and associated player events when host cancels" do
      player_1 = Player.create!(id: 1, name: 'player 1', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      player_2 = Player.create!(id: 2, name: 'player 2', phone: "999.999.1235", email: "test2@test.com", username: "username2", password: "password")
      player_3 = Player.create!(id: 3, name: 'player 3', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      player_4 = Player.create!(id: 4, name: 'Chris Anderson', phone: "999.999.1237", email: "test4@test.com", username: "username4", password: "password")
      player_5 = Player.create!(id: 5, name: 'Jahara Clark', phone: "999.999.1238" , email: "test5@test.com", username: "username5", password: "password")
      player_6 = Player.create!(id: 6, name: "Keegan O'Shea", phone: "999.999.1239" , email: "test6@test.com", username: "username6", password: "password")

      course_1 = Course.create!(id: 1, name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      course_2 = Course.create!(id: 2, name: 'City Park Golf Course', street: '3181 E. 23rd Avenue', city: 'Denver', state: 'Colorado', zip_code: '80205', phone: '720.865.3410', cost: 65)
      course_3 = Course.create!(id: 3, name: 'Riverdale Golf Club', street: '13300 Riverdale Road', city: 'Brighton', state: 'Colorado', zip_code: '80602', phone: '303.659.4700', cost: 74)

      event_1 = Event.create!(id: 1, course_id: 1, date: '08/01/2021', tee_time: '13:20', open_spots: '1', number_of_holes: "9", host_id: 1, private: true )
      event_2 = Event.create!(id: 2, course_id: 2, date: '08/05/2021', tee_time: '14:20', open_spots: '2', number_of_holes: "18", host_id: 2, private: true )
      event_3 = Event.create!(id: 3, course_id: 3, date: '08/10/2021', tee_time: '15:20', open_spots: '3', number_of_holes: "9", host_id: 3, private: false )

      invitation_1 = PlayerEvent.create!(player_id: 2, event_id: 1, invite_status: "pending")
      invitation_2 = PlayerEvent.create!(player_id: 3, event_id: 1, invite_status: "accepted")
      invitation_3 = PlayerEvent.create!(player_id: 4, event_id: 1, invite_status: "declined")

      invitation_4 = PlayerEvent.create!(player_id: 1, event_id: 2, invite_status: "accepted")
      invitation_5 = PlayerEvent.create!(player_id: 3, event_id: 2, invite_status: "pending")
      invitation_6 = PlayerEvent.create!(player_id: 6, event_id: 2, invite_status: "pending")

      invitation_7 = PlayerEvent.create!(player_id: 4, event_id: 3, invite_status: "accepted")
      invitation_8 = PlayerEvent.create!(player_id: 4, event_id: 3, invite_status: "declined")

      expect { delete "/api/v1/event/#{event_3.id}" }.to change(Event, :count).by(-1)
      expect(response).to be_successful
      expect { PlayerEvent.find(invitation_7.id) }.to raise_error(ActiveRecord::RecordNotFound)
      expect { PlayerEvent.find(invitation_8.id) }.to raise_error(ActiveRecord::RecordNotFound)
    end
  end
end
