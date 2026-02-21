class Api::V1::SessionsController < ApplicationController
  def create
    user = Player.find_by!(email: params[:email])
    if user && user.authenticate(params[:password])
      render json: PlayersSerializer.new(user), status: 200
    else
      raise InvalidCredentials
    end
  end
end
