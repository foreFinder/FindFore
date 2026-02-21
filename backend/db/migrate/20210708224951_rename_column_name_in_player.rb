class RenameColumnNameInPlayer < ActiveRecord::Migration[5.2]
  def change
    rename_column :players, :first_name, :name
  end
end
