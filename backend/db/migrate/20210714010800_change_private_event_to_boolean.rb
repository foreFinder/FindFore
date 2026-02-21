class ChangePrivateEventToBoolean < ActiveRecord::Migration[5.2]
  def change
    change_column :events, :private, :boolean
  end
end
