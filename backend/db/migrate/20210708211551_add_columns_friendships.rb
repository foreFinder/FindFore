class AddColumnsFriendships < ActiveRecord::Migration[5.2]
  def change
    add_column :friendships, :follower_id, :integer
    add_column :friendships, :followee_id, :integer
  end
end
