class FriendshipSerializer
  include JSONAPI::Serializer

  attributes :follower, :followee
end
