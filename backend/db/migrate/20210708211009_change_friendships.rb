class ChangeFriendships < ActiveRecord::Migration[5.2]
  def change
    remove_column :friendships, :follower
    remove_column :friendships, :followee
  end
end
