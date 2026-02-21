require 'rails_helper'

RSpec.describe Player, type: :model do
  describe "relationships" do
    it { should have_many :followers }
    it { should have_many :followees }
  end

  describe "validations" do
    it { should validate_presence_of :name }
    it { should validate_presence_of :phone }
    it { should validate_presence_of :email }
    it { should validate_uniqueness_of :email }
    it { should validate_uniqueness_of :username }
    it { should validate_presence_of :password }
  end

  describe "instance methods" do
    before :each do
      @player_1 = Player.create!(name: 'Eric Rabun', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      @player_2 = Player.create!(name: 'Tyson McNutt', phone: "999.999.1235" , email: "test2@test.com", username: "username2", password: "password")
      @player_3 = Player.create!(name: 'Jon Schlandt', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      Friendship.create!(follower_id: @player_1.id, followee_id: @player_2.id)
      Friendship.create!(follower_id: @player_1.id, followee_id: @player_3.id)
      Friendship.create!(follower_id: @player_2.id, followee_id: @player_1.id)
      @course_1 = Course.create!(name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      @event_1 = Event.create!(course_id: @course_1.id, date: '08/01/2021', tee_time: '13:20', open_spots: '3', number_of_holes: "9", host_id: @player_1.id, private: true)
      @event_2 = Event.create!(course_id: @course_1.id, date: '09/01/2021', tee_time: '14:20', open_spots: '2', number_of_holes: "18", host_id: @player_2.id, private: true)
      PlayerEvent.create!(player_id: @player_2.id, event_id: @event_1.id , invite_status: "accepted")
      PlayerEvent.create!(player_id: @player_2.id, event_id: @event_2.id , invite_status: "accepted")
      PlayerEvent.create!(player_id: @player_3.id, event_id: @event_1.id , invite_status: "declined")
    end

    describe "#friends_list" do
      it "returns an array of the players friends" do
        expect(@player_1.friends_list).to eq([@player_2.id, @player_3.id])
        expect(@player_2.friends_list).to eq([@player_1.id])
        expect(@player_3.friends_list).to eq([])
      end
    end

    describe "#events_list" do
      it "returns an array of the events the player has accepted" do

        expect(@player_1.events_list).to eq([])
        expect(@player_2.events_list).to eq([@event_1.id, @event_2.id])
        expect(@player_3.events_list).to eq([])
      end
    end
  end
end
