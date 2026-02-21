class PlayerEventSerializer
  include JSONAPI::Serializer
  attributes :player_id, :event_id, :invite_status
end
