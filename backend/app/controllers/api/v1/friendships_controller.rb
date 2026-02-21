class Api::V1::FriendshipsController < ApplicationController
  def create
    follower = Player.find(params[:follower_id])
    followee = Player.find(params[:followee_id])
    friendship = Friendship.find_or_create_by!(follower_id: follower.id, followee_id: followee.id)
    render json: FriendshipSerializer.new(friendship)
  end

  def destroy
    follower = Player.find(params[:follower_id])
    follower.followed_players.find_by(followee_id: params[:followee_id]).destroy
  end
end
