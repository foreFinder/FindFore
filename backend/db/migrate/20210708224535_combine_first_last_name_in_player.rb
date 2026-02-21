class CombineFirstLastNameInPlayer < ActiveRecord::Migration[5.2]
  def change
    remove_column :players, :last_name
  end
end
