class EventSerializer
  include JSONAPI::Serializer

  attributes :course_name, :date, :tee_time, :open_spots, :number_of_holes, :private, :host_name, :host_id
  attribute :accepted, &:players_accepting_invitation
  attribute :declined, &:players_declining_invitation
  attribute :pending, &:players_pending_invitation
  attribute :closed, &:players_closed_invitation
  attribute :remaining_spots, &:calculate_remaining_spots
end
