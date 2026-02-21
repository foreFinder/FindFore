FactoryBot.define do
  factory :player_event do
    user { nil }
    event { nil }
    invite_accepted { false }
  end
end
