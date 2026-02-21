FactoryBot.define do
  factory :event do
    course_id { "MyString" }
    date { "MyString" }
    tee_time { "MyString" }
    open_spots { 1 }
    number_of_holes { "MyString" }
    player_id { "MyString" }
    private { false }
  end
end
