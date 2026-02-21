class Player < ApplicationRecord
  has_many :followed_players, foreign_key: :follower_id, class_name: "Friendship"
  has_many :followees, through: :followed_players
  has_many :following_players, foreign_key: :followee_id, class_name: "Friendship"
  has_many :followers, through: :following_players
  has_many :player_events, dependent: :destroy
  has_many :events, through: :player_events

  validates :name, presence: true
  validates :phone, presence: true
  validates :email, uniqueness: true, presence: true
  validates :username, uniqueness: true
  validates :email, format: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\Z/i
  validates :password, presence: { require: true }
  has_secure_password

  def friends_list
    followees.pluck(:id)
  end

  def events_list
    player_events.where(invite_status: :accepted)
    .pluck(:event_id)
  end
end
