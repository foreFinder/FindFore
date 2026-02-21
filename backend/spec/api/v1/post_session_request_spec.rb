require 'rails_helper'

RSpec.describe "user login endpoint" do
  describe "happy path" do
    it "returns user info when they login" do
      registered_user = Player.create!(name: 'player 1', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
      user_login = ({
            "email": "test1@test.com",
            "password": "password"
        })
      headers = {"CONTENT_TYPE" => "application/json"}

      post '/api/v1/sessions', headers: headers, params: JSON.generate(user_login)

      session_data = JSON.parse(response.body, symbolize_names: true)

      expect(response).to be_successful
      expect(response.status).to eq(200)

      expect(session_data).to be_a(Hash)
      expect(session_data).to have_key(:data)
      expect(session_data[:data]).to be_a(Hash)

      expect(session_data[:data]).to have_key(:type)
      expect(session_data[:data][:type]).to be_a(String)

      expect(session_data[:data]).to have_key(:id)
      expect(session_data[:data][:id]).to be_a(String)

      expect(session_data[:data]).to have_key(:attributes)
      expect(session_data[:data][:attributes]).to be_a(Hash)

      expect(session_data[:data][:attributes]).to have_key(:name)
      expect(session_data[:data][:attributes][:name]).to be_a(String)

      expect(session_data[:data][:attributes]).to have_key(:phone)
      expect(session_data[:data][:attributes][:phone]).to be_a(String)

      expect(session_data[:data][:attributes]).to have_key(:email)
      expect(session_data[:data][:attributes][:email]).to be_a(String)

      expect(session_data[:data][:attributes]).to have_key(:username)
      expect(session_data[:data][:attributes][:username]).to be_a(String)

      expect(session_data[:data][:attributes]).to_not have_key(:password)
    end
  end

  it "returns an error is password is not correct" do
    registered_user = Player.create!(name: 'player 1', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
    user_login = ({
          "email": "test1@test.com",
          "password": "wrong password"
      })
    headers = {"CONTENT_TYPE" => "application/json"}

    post '/api/v1/sessions', headers: headers, params: JSON.generate(user_login)

    session_data = JSON.parse(response.body, symbolize_names: true)

    expect(response.status).to eq(401)
    expect(session_data).to have_key(:errors)
    expect(session_data[:errors][0][:message]).to be_a(String)
  end

  it "it returns an error if email not found" do
    registered_user = Player.create!(name: 'player 1', phone: "999.999.1234", email: "test1@test.com", username: "username1", password: "password")
    user_login = ({
          "email": "wrongemail@test.com",
          "password": "password"
      })
    headers = {"CONTENT_TYPE" => "application/json"}

    post '/api/v1/sessions', headers: headers, params: JSON.generate(user_login)

    session_data = JSON.parse(response.body, symbolize_names: true)

    expect(response.status).to eq(404)
    expect(session_data).to have_key(:errors)
    expect(session_data[:errors][0][:message]).to be_a(String)
  end
end
