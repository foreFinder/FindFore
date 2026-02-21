class ChangePlayerIdToHostInEvent < ActiveRecord::Migration[5.2]
  def change
    remove_column :events, :player_id
    add_column :events, :host_id, :integer
  end
end
