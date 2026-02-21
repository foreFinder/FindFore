require 'rails_helper'

RSpec.describe "Create friendship API Endpoint" do
  before :each do
    @player_1 = Player.create!(name: 'player 1', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
    @player_2 = Player.create!(name: 'player 2', phone: "999.999.1235", email: "test2@test.com", username: "username2", password: "password")

    @friendship_params = {
      follower_id: @player_1.id,
      followee_id: @player_2.id
    }

    @headers = { 'CONTENT_TYPE' => 'application/json' }
    post '/api/v1/friendship', headers: @headers, params:JSON.generate(@friendship_params)
  end

  describe "happy path" do
    it "can create a new friendship player 1 will see player 2 in friend list" do

      friendship_data = JSON.parse(response.body, symbolize_names: true)
      friendship = Friendship.last
      expect(friendship.follower_id).to eq(@player_1.id)
      expect(friendship.followee_id).to eq(@player_2.id)

      expect(response).to be_successful
      expect(friendship_data).to be_a(Hash)
      expect(friendship_data).to have_key(:data)
      expect(friendship_data[:data]).to be_a(Hash)

      expect(friendship_data[:data]).to have_key(:type)
      expect(friendship_data[:data][:type]).to be_a(String)

      expect(friendship_data[:data]).to have_key(:id)
      expect(friendship_data[:data][:id]).to be_a(String)

      expect(friendship_data[:data]).to have_key(:attributes)
      expect(friendship_data[:data][:attributes]).to be_a(Hash)

      expect(friendship_data[:data][:attributes]).to have_key(:follower)
      expect(friendship_data[:data][:attributes][:follower]).to be_a(Hash)

      expect(friendship_data[:data][:attributes][:follower]).to be_a(Hash)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:id)
      expect(friendship_data[:data][:attributes][:follower][:id]).to be_a(Integer)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:name)
      expect(friendship_data[:data][:attributes][:follower][:name]).to be_a(String)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:phone)
      expect(friendship_data[:data][:attributes][:follower][:phone]).to be_a(String)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:email)
      expect(friendship_data[:data][:attributes][:follower][:email]).to be_a(String)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:created_at)
      expect(friendship_data[:data][:attributes][:follower][:created_at]).to be_a(String)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:updated_at)
      expect(friendship_data[:data][:attributes][:follower][:updated_at]).to be_a(String)

      expect(friendship_data[:data][:attributes]).to have_key(:followee)
      expect(friendship_data[:data][:attributes][:followee]).to be_a(Hash)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:id)
      expect(friendship_data[:data][:attributes][:followee][:id]).to be_a(Integer)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:name)
      expect(friendship_data[:data][:attributes][:followee][:name]).to be_a(String)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:phone)
      expect(friendship_data[:data][:attributes][:followee][:phone]).to be_a(String)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:email)
      expect(friendship_data[:data][:attributes][:followee][:email]).to be_a(String)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:created_at)
      expect(friendship_data[:data][:attributes][:followee][:created_at]).to be_a(String)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:updated_at)
      expect(friendship_data[:data][:attributes][:followee][:updated_at]).to be_a(String)
    end

    it "only adds friendship to player that is adding friend" do

      expect(@player_1.friends_list).to eq([@player_2.id])
      expect(@player_2.friends_list).to eq([])
    end
  end

  describe "sad path" do
    it "returns existing friendship if friendship already exists" do

      existing_friendship = Friendship.create!(follower_id:@player_1.id, followee_id:@player_2.id)

      friendship_data = JSON.parse(response.body, symbolize_names: true)
      friendship = Friendship.last
      expect(friendship.follower_id).to eq(@player_1.id)
      expect(friendship.followee_id).to eq(@player_2.id)

      expect(response).to be_successful
      expect(friendship_data).to be_a(Hash)
      expect(friendship_data).to have_key(:data)
      expect(friendship_data[:data]).to be_a(Hash)

      expect(friendship_data[:data]).to have_key(:type)
      expect(friendship_data[:data][:type]).to be_a(String)

      expect(friendship_data[:data]).to have_key(:id)
      expect(friendship_data[:data][:id]).to be_a(String)

      expect(friendship_data[:data]).to have_key(:attributes)
      expect(friendship_data[:data][:attributes]).to be_a(Hash)

      expect(friendship_data[:data][:attributes]).to have_key(:follower)
      expect(friendship_data[:data][:attributes][:follower]).to be_a(Hash)

      expect(friendship_data[:data][:attributes][:follower]).to be_a(Hash)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:id)
      expect(friendship_data[:data][:attributes][:follower][:id]).to be_a(Integer)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:name)
      expect(friendship_data[:data][:attributes][:follower][:name]).to be_a(String)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:phone)
      expect(friendship_data[:data][:attributes][:follower][:phone]).to be_a(String)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:email)
      expect(friendship_data[:data][:attributes][:follower][:email]).to be_a(String)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:created_at)
      expect(friendship_data[:data][:attributes][:follower][:created_at]).to be_a(String)
      expect(friendship_data[:data][:attributes][:follower]).to have_key(:updated_at)
      expect(friendship_data[:data][:attributes][:follower][:updated_at]).to be_a(String)

      expect(friendship_data[:data][:attributes]).to have_key(:followee)
      expect(friendship_data[:data][:attributes][:followee]).to be_a(Hash)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:id)
      expect(friendship_data[:data][:attributes][:followee][:id]).to be_a(Integer)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:name)
      expect(friendship_data[:data][:attributes][:followee][:name]).to be_a(String)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:phone)
      expect(friendship_data[:data][:attributes][:followee][:phone]).to be_a(String)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:email)
      expect(friendship_data[:data][:attributes][:followee][:email]).to be_a(String)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:created_at)
      expect(friendship_data[:data][:attributes][:followee][:created_at]).to be_a(String)
      expect(friendship_data[:data][:attributes][:followee]).to have_key(:updated_at)
      expect(friendship_data[:data][:attributes][:followee][:updated_at]).to be_a(String)
    end
  end
end
