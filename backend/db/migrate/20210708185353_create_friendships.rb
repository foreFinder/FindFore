class CreateFriendships < ActiveRecord::Migration[5.2]
  def change
    create_table :friendships do |t|
      t.string :follower
      t.string :followee

      t.timestamps
    end
  end
end
