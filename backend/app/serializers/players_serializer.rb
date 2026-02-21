class PlayersSerializer
  include JSONAPI::Serializer

  attributes :name, :phone, :email, :username
  attribute :friends, &:friends_list
  attribute :events, &:events_list

end
