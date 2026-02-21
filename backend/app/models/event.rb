class Event < ApplicationRecord
  belongs_to :course
  belongs_to :host, class_name: "Player", foreign_key: :host_id
  has_many :player_events, dependent: :destroy
  has_many :players, through: :player_events

  validates :course_id, presence: true
  validates :date, presence: true
  validates :tee_time, presence: true
  validates :open_spots, presence: true
  validates :number_of_holes, presence: true
  validates :host_id, presence: true
  validates_inclusion_of :private, in: [true, false]

  def players_accepting_invitation
    player_events.where(invite_status: :accepted)
    .pluck(:player_id)
  end

  def players_declining_invitation
    player_events.where(invite_status: :declined)
    .pluck(:player_id)
  end

  def players_pending_invitation
    player_events.where(invite_status: :pending)
    .pluck(:player_id)
  end

  def players_closed_invitation
    player_events.where(invite_status: :closed)
    .pluck(:player_id)
  end

  def calculate_remaining_spots
    open_spots - (players_accepting_invitation.length)
  end

  def host_name
    host.name
  end

  def course_name
    course.name
  end
end
