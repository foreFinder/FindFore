class CreatePlayerEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :player_events do |t|
      t.references :player, foreign_key: true
      t.references :event, foreign_key: true
      t.boolean :invite_accepted

      t.timestamps
    end
  end
end
