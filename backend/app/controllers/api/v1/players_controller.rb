class Api::V1::PlayersController < ApplicationController
  def index
    players = Player.all
    render json: PlayersSerializer.new(players)
  end

  def create
    player = player_params
    player[:email] = player[:email].downcase
    new_player = Player.create!(player)
    if new_player.save
      render json:PlayersSerializer.new(new_player), status: 201
    end
  end

  private

  def player_params
    params.permit(:name, :phone, :email, :username, :password, :password_confirmation)
  end
end
