require 'rails_helper'

RSpec.describe Event, type: :model do
  describe "relationships" do
    it { should belong_to :course}
    it { should belong_to(:host).class_name("Player")}
    it { should have_many :player_events}
    it { should have_many(:players).through(:player_events) }
  end

  describe "validations" do
    it { should validate_presence_of :course_id }
    it { should validate_presence_of :date }
    it { should validate_presence_of :tee_time }
    it { should validate_presence_of :open_spots }
    it { should validate_presence_of :number_of_holes }
    it { should validate_presence_of :host_id }
    it { should validate_inclusion_of(:private).in_array([true, false])}
  end

  describe "instance methods" do
    before :each do
      @player_1 = Player.create!(id: 1, name: 'Eric Rabun', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      @player_2 = Player.create!(id: 2, name: 'Tyson McNutt', phone: "999.999.1235" , email: "test2@test.com", username: "username2", password: "password")
      @player_3 = Player.create!(id: 3, name: 'Jon Schlandt', phone: "999.999.1236", email: "test3@test.com", username: "username3", password: "password")
      @player_4 = Player.create!(id: 4, name: 'Chris Anderson', phone: "999.999.1237", email: "test4@test.com", username: "username4", password: "password")
      @player_5 = Player.create!(id: 5, name: 'Jahara Clark', phone: "999.999.1238" , email: "test5@test.com", username: "username5", password: "password")
      @course_1 = Course.create!(name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      @event_1 = Event.create!(course_id: @course_1.id, date: '08/01/2021', tee_time: '13:20', open_spots: 3, number_of_holes: "9", host_id: @player_1.id, private: true)
      @event_2 = Event.create!(course_id: @course_1.id, date: '09/01/2021', tee_time: '14:20', open_spots: 2, number_of_holes: "18", host_id: @player_2.id, private: true)
      PlayerEvent.create!(player_id: @player_1.id, event_id: @event_1.id , invite_status: "accepted")
      PlayerEvent.create!(player_id: @player_2.id, event_id: @event_1.id , invite_status: "accepted")
      PlayerEvent.create!(player_id: @player_3.id, event_id: @event_1.id , invite_status: "pending")

      PlayerEvent.create!(player_id: @player_2.id, event_id: @event_2.id , invite_status: "accepted")
      PlayerEvent.create!(player_id: @player_1.id, event_id: @event_2.id , invite_status: "pending")
      PlayerEvent.create!(player_id: @player_3.id, event_id: @event_2.id , invite_status: "declined")
      PlayerEvent.create!(player_id: @player_4.id, event_id: @event_2.id , invite_status: "accepted")
      PlayerEvent.create!(player_id: @player_5.id, event_id: @event_2.id , invite_status: "closed")
    end

    describe "#players_accepting_invitation" do
      it "returns an array of players that have accepted the event invitation" do

        expect(@event_1.players_accepting_invitation).to eq([@player_1.id, @player_2.id])
        expect(@event_2.players_accepting_invitation).to eq([@player_2.id, @player_4.id])
      end
    end

    describe "#players_declining_invitation" do
      it "returns an array of players that have accepted the event invitation" do

        expect(@event_1.players_declining_invitation).to eq([])
        expect(@event_2.players_declining_invitation).to eq([@player_3.id])
      end
    end

    describe "#players_pending_invitation" do
      it "returns an array of players that have accepted the event invitation" do

        expect(@event_1.players_pending_invitation).to eq([@player_3.id])
        expect(@event_2.players_pending_invitation).to eq([@player_1.id])
      end
    end

    describe "#players_closed_invitation" do
      it "returns an array of players that have accepted the event invitation" do

        expect(@event_1.players_closed_invitation).to eq([])
        expect(@event_2.players_closed_invitation).to eq([@player_5.id])
      end
    end

    describe "#calculate_remaining_spots" do
      it "returns an array of players that have accepted the event invitation" do

        expect(@event_1.calculate_remaining_spots).to eq(1)
        expect(@event_2.calculate_remaining_spots).to eq(0)
      end
    end


    describe "#host_name" do
      it "returns the name of the player hosting the event" do

        expect(@event_1.host_name).to eq(@player_1.name)
        expect(@event_2.host_name).to eq(@player_2.name)
      end
    end

    describe "#course_name" do
      it "returns the name of the player hosting the event" do

        expect(@event_1.course_name).to eq(@course_1.name)
        expect(@event_2.course_name).to eq(@course_1.name)
      end
    end
  end
end
