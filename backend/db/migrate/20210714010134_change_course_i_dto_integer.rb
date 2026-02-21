class ChangeCourseIDtoInteger < ActiveRecord::Migration[5.2]
  def change
    change_column :events, :course_id, 'integer USING CAST(course_id AS integer)'
  end
end
