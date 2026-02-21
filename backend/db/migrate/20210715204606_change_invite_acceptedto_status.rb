class ChangeInviteAcceptedtoStatus < ActiveRecord::Migration[5.2]
  def change
    change_column :player_events, :invite_accepted, 'integer USING CAST(invite_accepted AS integer)'
    rename_column :player_events, :invite_accepted, :invite_status
    change_column :player_events, :invite_status, :integer, default: 0
  end
end
