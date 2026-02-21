require 'rails_helper'

RSpec.describe "All courses API endpoint" do
  describe 'happy path' do
    it 'returns all courses' do
      course_1 = Course.create!(id: 1, name: 'Green Valley Ranch Golf Club', street: '4900 Himalaya Road', city: 'Denver', state: 'Colorado', zip_code: '80249', phone: '303.371.3131', cost: 80)
      course_2 = Course.create!(id: 2, name: 'City Park Golf Course', street: '3181 E. 23rd Avenue', city: 'Denver', state: 'Colorado', zip_code: '80205', phone: '720.865.3410', cost: 65)

      get '/api/v1/courses'

      expect(response).to be_successful

      all_courses = JSON.parse(response.body, symbolize_names: true)
      expect(all_courses[:data].count).to eq(2)
      expect(all_courses[:data].last[:attributes][:name]).to eq(course_2.name)

      expect(all_courses).to be_a(Hash)
      all_courses[:data].each do |course|
        expect(course).to have_key(:id)
        expect(course[:id]).to be_an(String)

        expect(course).to have_key(:type)
        expect(course[:type]).to be_an(String)

        expect(course).to have_key(:attributes)
        expect(course[:attributes]).to be_an(Hash)

        expect(course[:attributes]).to have_key(:name)
        expect(course[:attributes][:name]).to be_an(String)
        expect(course[:attributes]).to have_key(:street)
        expect(course[:attributes][:street]).to be_an(String)
        expect(course[:attributes]).to have_key(:city)
        expect(course[:attributes][:city]).to be_an(String)
        expect(course[:attributes]).to have_key(:state)
        expect(course[:attributes][:state]).to be_an(String)
        expect(course[:attributes]).to have_key(:zip_code)
        expect(course[:attributes][:zip_code]).to be_an(String)
        expect(course[:attributes]).to have_key(:phone)
        expect(course[:attributes][:phone]).to be_an(String)
        expect(course[:attributes]).to have_key(:cost)
        expect(course[:attributes][:cost]).to be_an(String)
      end
    end
  end

  describe 'sad path' do
    it 'returns empty data array if there are no courses' do
      get '/api/v1/courses'

      expect(response).to be_successful

      all_courses = JSON.parse(response.body, symbolize_names: true)
      expect(all_courses[:data]).to be_an(Array)
      expect(all_courses[:data]).to be_empty
    end
  end
end
