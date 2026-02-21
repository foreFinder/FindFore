class Friendship < ApplicationRecord
  belongs_to :follower, class_name: "Player"
  belongs_to :followee, class_name: "Player"
end
