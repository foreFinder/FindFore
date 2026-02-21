class CreateEvents < ActiveRecord::Migration[5.2]
  def change
    create_table :events do |t|
      t.string :course_id
      t.string :date
      t.string :tee_time
      t.integer :open_spots
      t.string :number_of_holes
      t.string :player_id
      t.boolean :private

      t.timestamps
    end
  end
end
